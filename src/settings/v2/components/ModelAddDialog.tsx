import React, { useState } from "react";
import { useTab } from "@/contexts/TabContext";
import { useTranslation } from "@/i18n/useTranslation";
import { getSettings } from "@/settings/model";
import {
  ChatModelProviders,
  EmbeddingModelProviders,
  MODEL_CAPABILITIES,
  ModelCapability,
  Provider,
  ProviderMetadata,
  ProviderSettingsKeyMap,
  SettingKeyProviders,
} from "@/constants";
import { CustomModel } from "@/aiParams";
import { err2String, getProviderInfo, getProviderLabel, omit } from "@/utils";
import { Notice } from "obsidian";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { FormField } from "@/components/ui/form-field";

interface FormErrors {
  name: boolean;
  instanceName: boolean;
  deploymentName: boolean;
  embeddingDeploymentName: boolean;
  apiVersion: boolean;
  displayName: boolean;
}

interface ModelAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (model: CustomModel) => void;
  ping: (model: CustomModel) => Promise<boolean>;
  isEmbeddingModel?: boolean;
}

export const ModelAddDialog: React.FC<ModelAddDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
  ping,
  isEmbeddingModel = false,
}) => {
  const { modalContainer } = useTab();
  const { t } = useTranslation();
  const settings = getSettings();
  const defaultProvider = isEmbeddingModel
    ? EmbeddingModelProviders.OPENAI
    : ChatModelProviders.OPENAI;

  const [dialogElement, setDialogElement] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    instanceName: false,
    deploymentName: false,
    embeddingDeploymentName: false,
    apiVersion: false,
    displayName: false,
  });

  const setError = (field: keyof FormErrors, value: boolean) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };

  const clearErrors = () => {
    setErrors({
      name: false,
      instanceName: false,
      deploymentName: false,
      embeddingDeploymentName: false,
      apiVersion: false,
      displayName: false,
    });
  };

  const validateFields = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate name
    newErrors.name = !model.name;
    if (!model.name) isValid = false;

    // Validate Azure OpenAI specific fields
    if (model.provider === ChatModelProviders.AZURE_OPENAI) {
      newErrors.instanceName = !model.azureOpenAIApiInstanceName;
      newErrors.apiVersion = !model.azureOpenAIApiVersion;

      if (isEmbeddingModel) {
        newErrors.embeddingDeploymentName = !model.azureOpenAIApiEmbeddingDeploymentName;
        if (!model.azureOpenAIApiEmbeddingDeploymentName) isValid = false;
      } else {
        newErrors.deploymentName = !model.azureOpenAIApiDeploymentName;
        if (!model.azureOpenAIApiDeploymentName) isValid = false;
      }

      if (!model.azureOpenAIApiInstanceName || !model.azureOpenAIApiVersion) {
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const getDefaultApiKey = (provider: Provider): string => {
    return (settings[ProviderSettingsKeyMap[provider as SettingKeyProviders]] as string) || "";
  };

  const getInitialModel = (provider = defaultProvider): CustomModel => {
    const baseModel = {
      name: "",
      provider,
      enabled: true,
      isBuiltIn: false,
      baseUrl: "",
      apiKey: getDefaultApiKey(provider),
      isEmbeddingModel,
      capabilities: [],
    };

    if (!isEmbeddingModel) {
      return {
        ...baseModel,
        stream: true,
      };
    }

    return baseModel;
  };

  const [model, setModel] = useState<CustomModel>(getInitialModel());

  // Clean up model data by trimming whitespace
  const getCleanedModel = (modelData: CustomModel): CustomModel => {
    return {
      ...modelData,
      name: modelData.name?.trim(),
      baseUrl: modelData.baseUrl?.trim(),
      apiKey: modelData.apiKey?.trim(),
      openAIOrgId: modelData.openAIOrgId?.trim(),
      azureOpenAIApiInstanceName: modelData.azureOpenAIApiInstanceName?.trim(),
      azureOpenAIApiDeploymentName: modelData.azureOpenAIApiDeploymentName?.trim(),
      azureOpenAIApiEmbeddingDeploymentName:
        modelData.azureOpenAIApiEmbeddingDeploymentName?.trim(),
      azureOpenAIApiVersion: modelData.azureOpenAIApiVersion?.trim(),
    };
  };

  const [providerInfo, setProviderInfo] = useState<ProviderMetadata>(
    getProviderInfo(defaultProvider)
  );

  // Check if the form has required fields filled
  const isFormValid = (): boolean => {
    return Boolean(model.name && model.provider);
  };

  // Check if buttons should be disabled
  const isButtonDisabled = (): boolean => {
    return isVerifying || !isFormValid();
  };

  const handleAdd = () => {
    if (!validateFields()) {
      new Notice(t("notifications.model.requiredFieldsError"));
      return;
    }

    const cleanedModel = getCleanedModel(model);
    onAdd(cleanedModel);
    onOpenChange(false);
    setModel(getInitialModel());
    clearErrors();
  };

  const handleProviderChange = (provider: ChatModelProviders) => {
    setProviderInfo(getProviderInfo(provider));
    setModel({
      ...model,
      provider,
      apiKey: getDefaultApiKey(provider),
      ...(provider === ChatModelProviders.OPENAI ? { openAIOrgId: settings.openAIOrgId } : {}),
      ...(provider === ChatModelProviders.AZURE_OPENAI
        ? {
            azureOpenAIApiInstanceName: settings.azureOpenAIApiInstanceName,
            azureOpenAIApiDeploymentName: settings.azureOpenAIApiDeploymentName,
            azureOpenAIApiVersion: settings.azureOpenAIApiVersion,
            azureOpenAIApiEmbeddingDeploymentName: settings.azureOpenAIApiEmbeddingDeploymentName,
          }
        : {}),
    });
  };
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setModel(getInitialModel());
      clearErrors();
      setIsOpen(false);
    }
    onOpenChange(open);
  };

  const handleVerify = async () => {
    if (!validateFields()) {
      new Notice(t("notifications.model.requiredFieldsError"));
      return;
    }

    setIsVerifying(true);
    try {
      const cleanedModel = getCleanedModel(model);
      await ping(cleanedModel);
      new Notice(t("notifications.model.verificationSuccess"));
    } catch (err) {
      console.error(err);
      const errStr = err2String(err);
      new Notice(t("notifications.model.verificationFailed", { error: errStr }));
    } finally {
      setIsVerifying(false);
    }
  };

  const renderProviderSpecificFields = () => {
    const fields = () => {
      switch (model.provider) {
        case ChatModelProviders.OPENAI:
          return (
            <FormField
              label={t("settings.model.fields.openai.orgId.label")}
              description={t("settings.model.fields.openai.orgId.description")}
            >
              <Input
                type="text"
                placeholder={t("settings.model.fields.openai.orgId.placeholder")}
                value={model.openAIOrgId || ""}
                onChange={(e) => setModel({ ...model, openAIOrgId: e.target.value })}
              />
            </FormField>
          );
        case ChatModelProviders.AZURE_OPENAI:
          return (
            <>
              <FormField
                label={t("settings.model.fields.azure.instanceName.label")}
                required
                error={errors.instanceName}
                errorMessage={t("settings.model.fields.azure.instanceName.required")}
              >
                <Input
                  type="text"
                  placeholder={t("settings.model.fields.azure.instanceName.placeholder")}
                  value={model.azureOpenAIApiInstanceName || ""}
                  onChange={(e) => {
                    setModel({ ...model, azureOpenAIApiInstanceName: e.target.value });
                    setError("instanceName", false);
                  }}
                />
              </FormField>

              {!isEmbeddingModel ? (
                <FormField
                  label={t("settings.model.fields.azure.deploymentName.label")}
                  required
                  error={errors.deploymentName}
                  errorMessage={t("settings.model.fields.azure.deploymentName.required")}
                  description={t("settings.model.fields.azure.deploymentName.description")}
                >
                  <Input
                    type="text"
                    placeholder={t("settings.model.fields.azure.deploymentName.placeholder")}
                    value={model.azureOpenAIApiDeploymentName || ""}
                    onChange={(e) => {
                      setModel({ ...model, azureOpenAIApiDeploymentName: e.target.value });
                      setError("deploymentName", false);
                    }}
                  />
                </FormField>
              ) : (
                <FormField
                  label={t("settings.model.fields.azure.embeddingDeploymentName.label")}
                  required
                  error={errors.embeddingDeploymentName}
                  errorMessage={t("settings.model.fields.azure.embeddingDeploymentName.required")}
                >
                  <Input
                    type="text"
                    placeholder={t(
                      "settings.model.fields.azure.embeddingDeploymentName.placeholder"
                    )}
                    value={model.azureOpenAIApiEmbeddingDeploymentName || ""}
                    onChange={(e) => {
                      setModel({ ...model, azureOpenAIApiEmbeddingDeploymentName: e.target.value });
                      setError("embeddingDeploymentName", false);
                    }}
                  />
                </FormField>
              )}

              <FormField
                label={t("settings.model.fields.azure.apiVersion.label")}
                required
                error={errors.apiVersion}
                errorMessage={t("settings.model.fields.azure.apiVersion.required")}
              >
                <Input
                  type="text"
                  placeholder={t("settings.model.fields.azure.apiVersion.placeholder")}
                  value={model.azureOpenAIApiVersion || ""}
                  onChange={(e) => {
                    setModel({ ...model, azureOpenAIApiVersion: e.target.value });
                    setError("apiVersion", false);
                  }}
                />
              </FormField>
            </>
          );
        default:
          return null;
      }
    };

    const content = fields();
    if (!content) return null;

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="tw-space-y-2 tw-rounded-lg tw-border tw-pt-4"
      >
        <div className="tw-flex tw-items-center tw-justify-between">
          <Label>
            {t("settings.model.additionalSettings", { provider: getProviderLabel(model.provider) })}
          </Label>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="tw-w-9 tw-p-0">
              <ChevronDown className="tw-size-4" />
              <span className="tw-sr-only">{t("common.toggle")}</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="tw-max-h-[200px] tw-space-y-4 tw-overflow-y-auto tw-pb-0.5 tw-pl-0.5 tw-pr-2">
          {content}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const getPlaceholderUrl = () => {
    if (model.provider !== ChatModelProviders.AZURE_OPENAI) {
      return providerInfo.host;
    }

    const instanceName = model.azureOpenAIApiInstanceName || "[instance]";
    const deploymentName = isEmbeddingModel
      ? model.azureOpenAIApiEmbeddingDeploymentName || "[deployment]"
      : model.azureOpenAIApiDeploymentName || "[deployment]";
    const apiVersion = model.azureOpenAIApiVersion || "[api-version]";
    const endpoint = isEmbeddingModel ? "embeddings" : "chat/completions";

    return `https://${instanceName}.openai.azure.com/openai/deployments/${deploymentName}/${endpoint}?api-version=${apiVersion}`;
  };

  const capabilityOptions = Object.entries(MODEL_CAPABILITIES).map(([id, description]) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    description,
  })) as Array<{ id: ModelCapability; label: string; description: string }>;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:tw-max-w-[425px]"
        container={modalContainer}
        ref={(el) => setDialogElement(el)}
      >
        <DialogHeader>
          <DialogTitle>
            {t("settings.model.dialog.title", {
              type: isEmbeddingModel ? t("common.labels.embedding") : t("common.labels.chat"),
            })}
          </DialogTitle>
          <DialogDescription>{t("settings.model.dialog.description")}</DialogDescription>
        </DialogHeader>

        <div className="tw-space-y-3">
          <FormField
            label={t("settings.model.fields.name.label")}
            required
            error={errors.name}
            errorMessage={t("settings.model.fields.name.required")}
          >
            <Input
              type="text"
              placeholder={t("settings.model.fields.name.placeholder", {
                example: isEmbeddingModel ? "text-embedding-3-small" : "gpt-4",
              })}
              value={model.name}
              onChange={(e) => {
                setModel({ ...model, name: e.target.value });
                setError("name", false);
              }}
            />
          </FormField>

          <FormField
            label={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">
                  {t("settings.model.fields.displayName.label")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-flex tw-flex-col tw-gap-0.5 tw-text-sm tw-text-muted">
                      <div className="tw-text-[12px] tw-font-bold">
                        {t("settings.model.fields.displayName.help.suggestedFormat")}
                      </div>
                      <div className="tw-text-accent">
                        {t("settings.model.fields.displayName.help.providerModel", {
                          provider: "[Source]-[Payment]",
                          model: "[Pretty Model Name]",
                        })}
                      </div>
                      <div className="tw-text-[12px]">
                        {t("settings.model.fields.displayName.help.example")}
                        <li>Direct-Paid:Ds-r1</li>
                        <li>OpenRouter-Paid:Ds-r1</li>
                        <li>Perplexity-Paid:lg</li>
                      </div>
                    </div>
                  }
                  contentClassName="tw-max-w-96"
                />
              </div>
            }
          >
            <Input
              type="text"
              placeholder={t("settings.model.fields.displayName.placeholder")}
              value={model.displayName || ""}
              onChange={(e) => {
                setModel({ ...model, displayName: e.target.value });
              }}
            />
          </FormField>

          <FormField label={t("settings.model.fields.provider.label")}>
            <Select value={model.provider} onValueChange={handleProviderChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("settings.model.fields.provider.placeholder")} />
              </SelectTrigger>
              <SelectContent container={dialogElement}>
                {Object.values(
                  isEmbeddingModel
                    ? omit(EmbeddingModelProviders, ["COPILOT_PLUS", "COPILOT_PLUS_JINA"])
                    : omit(ChatModelProviders, ["COPILOT_PLUS"])
                ).map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {getProviderLabel(provider)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label={t("settings.model.fields.baseUrl.label")}
            description={t("settings.model.fields.baseUrl.description")}
          >
            <Input
              type="text"
              placeholder={getPlaceholderUrl() || t("settings.model.fields.baseUrl.placeholder")}
              value={model.baseUrl || ""}
              onChange={(e) => setModel({ ...model, baseUrl: e.target.value })}
            />
          </FormField>

          <FormField label={t("settings.model.fields.apiKey.label")}>
            <PasswordInput
              placeholder={t("settings.model.fields.apiKey.placeholder", {
                provider: providerInfo.label,
              })}
              value={model.apiKey || ""}
              onChange={(value) => setModel({ ...model, apiKey: value })}
            />
            {providerInfo.keyManagementURL && (
              <p className="tw-text-xs tw-text-muted">
                <a href={providerInfo.keyManagementURL} target="_blank" rel="noopener noreferrer">
                  {t("settings.model.fields.apiKey.getKey", { provider: providerInfo.label })}
                </a>
              </p>
            )}
          </FormField>

          <FormField
            label={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">
                  {t("settings.model.fields.capabilities.label")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-text-sm tw-text-muted">
                      {t("settings.model.fields.capabilities.description")}
                    </div>
                  }
                  contentClassName="tw-max-w-96"
                />
              </div>
            }
          >
            <div className="tw-flex tw-items-center tw-gap-4">
              {capabilityOptions.map(({ id, label, description }) => (
                <div key={id} className="tw-flex tw-items-center tw-gap-2">
                  <Checkbox
                    id={id}
                    checked={model.capabilities?.includes(id)}
                    onCheckedChange={(checked) => {
                      const newCapabilities = model.capabilities || [];
                      setModel({
                        ...model,
                        capabilities: checked
                          ? [...newCapabilities, id]
                          : newCapabilities.filter((cap) => cap !== id),
                      });
                    }}
                  />
                  <HelpTooltip content={description}>
                    <Label htmlFor={id} className="tw-text-sm">
                      {label}
                    </Label>
                  </HelpTooltip>
                </div>
              ))}
            </div>
          </FormField>

          {renderProviderSpecificFields()}
        </div>

        <div className="tw-flex tw-items-center  tw-justify-between tw-gap-4">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="enable-cors"
              checked={model.enableCors || false}
              onCheckedChange={(checked: boolean) => setModel({ ...model, enableCors: checked })}
            />
            <Label htmlFor="enable-cors">
              <div className="tw-flex tw-items-center tw-gap-0.5">
                <span className="tw-text-xs md:tw-text-sm">
                  {t("settings.model.fields.cors.label")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-text-sm tw-text-muted">
                      {t("settings.model.fields.cors.description")}
                    </div>
                  }
                  contentClassName="tw-max-w-96"
                />
              </div>
            </Label>
          </div>
          <div className="tw-flex tw-gap-2 tw-text-xs md:tw-text-sm">
            <Button variant="secondary" onClick={handleAdd} disabled={isButtonDisabled()}>
              {t("settings.model.buttons.add")}
            </Button>
            <Button variant="secondary" onClick={handleVerify} disabled={isButtonDisabled()}>
              {isVerifying ? (
                <>
                  <Loader2 className="tw-mr-2 tw-size-2 tw-animate-spin md:tw-size-4 " />
                  {t("settings.model.buttons.verify")}
                </>
              ) : (
                t("settings.model.buttons.verify")
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
