import { CustomModel } from "@/aiParams";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useTranslation } from "@/i18n/useTranslation";

import { HelpTooltip } from "@/components/ui/help-tooltip";
import {
  DEFAULT_MODEL_SETTING,
  MODEL_CAPABILITIES,
  ModelCapability,
  Provider,
  ProviderMetadata,
  ProviderSettingsKeyMap,
  SettingKeyProviders,
} from "@/constants";
import { getSettings } from "@/settings/model";
import { debounce, getProviderInfo, getProviderLabel } from "@/utils";
import { App, Modal, Platform } from "obsidian";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import { ParameterControl } from "@/components/ui/parameter-controls";

interface ModelEditModalContentProps {
  model: CustomModel;
  isEmbeddingModel: boolean;
  onUpdate: (
    isEmbeddingModel: boolean,
    originalModel: CustomModel,
    updatedModel: CustomModel
  ) => void;
  onCancel: () => void;
}

export const ModelEditModalContent: React.FC<ModelEditModalContentProps> = ({
  model,
  onUpdate,
  onCancel,
  isEmbeddingModel,
}) => {
  const { t } = useTranslation();
  const [localModel, setLocalModel] = useState<CustomModel>(model);
  const [originalModel, setOriginalModel] = useState<CustomModel>(model);
  const [providerInfo, setProviderInfo] = useState<ProviderMetadata>({} as ProviderMetadata);
  const settings = getSettings();

  const getDefaultApiKey = (provider: Provider): string => {
    return (settings[ProviderSettingsKeyMap[provider as SettingKeyProviders]] as string) || "";
  };

  useEffect(() => {
    setLocalModel(model);
    setOriginalModel(model);
    if (model.provider) {
      setProviderInfo(getProviderInfo(model.provider));
    }
  }, [model]);

  // Debounce the onUpdate callback
  const debouncedOnUpdate = useMemo(
    () =>
      debounce((currentOriginalModel: CustomModel, updatedModel: CustomModel) => {
        onUpdate(isEmbeddingModel, currentOriginalModel, updatedModel);
      }, 500),
    [isEmbeddingModel, onUpdate]
  );

  // Function to update local state immediately
  const handleLocalUpdate = useCallback(
    (field: keyof CustomModel, value: any) => {
      setLocalModel((prevModel) => {
        const updatedModel = {
          ...prevModel,
          [field]: value,
        };
        // Call the debounced update function, passing the stable originalModel and the new updatedModel
        debouncedOnUpdate(originalModel, updatedModel);
        return updatedModel; // Return the updated model for immediate state update
      });
    },
    [originalModel, debouncedOnUpdate]
  );

  const handleLocalReset = useCallback(
    (field: keyof CustomModel) => {
      setLocalModel((prevModel) => {
        const updatedModel = { ...prevModel };
        delete updatedModel[field];
        // Call the debounced update function, passing the stable originalModel and the new updatedModel
        debouncedOnUpdate(originalModel, updatedModel);
        return updatedModel; // Return the updated model for immediate state update
      });
    },
    [debouncedOnUpdate, originalModel]
  );

  if (!localModel) return null;

  const getPlaceholderUrl = () => {
    if (!localModel || !localModel.provider || localModel.provider !== "azure-openai") {
      return providerInfo.host || "https://api.example.com/v1";
    }

    const instanceName = localModel.azureOpenAIApiInstanceName || "[instance]";
    const deploymentName = localModel.isEmbeddingModel
      ? localModel.azureOpenAIApiEmbeddingDeploymentName || "[deployment]"
      : localModel.azureOpenAIApiDeploymentName || "[deployment]";
    const apiVersion = localModel.azureOpenAIApiVersion || "[api-version]";
    const endpoint = localModel.isEmbeddingModel ? "embeddings" : "chat/completions";

    return `https://${instanceName}.openai.azure.com/openai/deployments/${deploymentName}/${endpoint}?api-version=${apiVersion}`;
  };

  const capabilityOptions = Object.entries(MODEL_CAPABILITIES).map(([id, description]) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    description,
  })) as Array<{ id: ModelCapability; label: string; description: string }>;

  const displayApiKey = localModel.apiKey || getDefaultApiKey(localModel.provider as Provider);
  const showOtherParameters = !isEmbeddingModel && localModel.provider !== "copilot-plus-jina";

  return (
    <div className="tw-space-y-3 tw-p-4">
      <div className="tw-mb-4">
        <h2 className="tw-text-xl tw-font-bold">
          {t("settings.modelEdit.title", { modelName: localModel.name })}
        </h2>
        <p className="tw-text-sm tw-text-muted">{t("settings.modelEdit.description")}</p>
      </div>

      <div className="tw-space-y-3">
        <FormField label={t("settings.modelEdit.fields.modelName.label")} required>
          <Input
            type="text"
            disabled={localModel.core}
            value={localModel.name}
            onChange={(e) => handleLocalUpdate("name", e.target.value)}
            placeholder={t("settings.modelEdit.fields.modelName.placeholder")}
          />
        </FormField>

        <FormField
          label={
            <div className="tw-flex tw-items-center tw-gap-1.5">
              <span className="tw-leading-none">
                {t("settings.modelEdit.fields.displayName.label")}
              </span>
              <HelpTooltip
                content={
                  <div className="tw-flex tw-flex-col tw-gap-0.5 tw-text-sm tw-text-muted">
                    <div className="tw-text-[12px] tw-font-bold">
                      {t("settings.modelEdit.fields.displayName.help.suggestedFormat")}
                    </div>
                    <div className="tw-text-accent">
                      {t("settings.modelEdit.fields.displayName.help.formatExample")}
                    </div>
                    <div className="tw-text-[12px]">
                      {t("settings.modelEdit.fields.displayName.help.examples")}
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
            placeholder={t("settings.modelEdit.fields.displayName.placeholder")}
            value={localModel.displayName || ""}
            onChange={(e) => handleLocalUpdate("displayName", e.target.value)}
          />
        </FormField>

        <FormField label={t("settings.modelEdit.fields.provider.label")}>
          <Input type="text" value={getProviderLabel(localModel.provider)} disabled />
        </FormField>

        <FormField
          label={t("settings.modelEdit.fields.baseUrl.label")}
          description={t("settings.modelEdit.fields.baseUrl.description")}
        >
          <Input
            type="text"
            placeholder={getPlaceholderUrl()}
            value={localModel.baseUrl || ""}
            onChange={(e) => handleLocalUpdate("baseUrl", e.target.value)}
          />
        </FormField>

        <FormField label={t("settings.modelEdit.fields.apiKey.label")}>
          <PasswordInput
            placeholder={t("settings.modelEdit.fields.apiKey.placeholder", {
              provider: providerInfo.label || "Provider",
            })}
            value={displayApiKey}
            onChange={(value) => handleLocalUpdate("apiKey", value)}
          />
          {providerInfo.keyManagementURL && (
            <p className="tw-text-xs tw-text-muted">
              <a href={providerInfo.keyManagementURL} target="_blank" rel="noopener noreferrer">
                {t("settings.modelEdit.fields.apiKey.getKey", { provider: providerInfo.label })}
              </a>
            </p>
          )}
        </FormField>

        {showOtherParameters && (
          <>
            <FormField
              label={
                <div className="tw-flex tw-items-center tw-gap-1.5">
                  <span className="tw-leading-none">
                    {t("settings.modelEdit.fields.capabilities.label")}
                  </span>
                  <HelpTooltip
                    content={
                      <div className="tw-text-sm tw-text-muted">
                        {t("settings.modelEdit.fields.capabilities.help")}
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
                      checked={localModel.capabilities?.includes(id)}
                      onCheckedChange={(checked) => {
                        const newCapabilities = localModel.capabilities || [];
                        const value = checked
                          ? [...newCapabilities, id]
                          : newCapabilities.filter((cap) => cap !== id);
                        handleLocalUpdate("capabilities", value);
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

            <FormField>
              <ParameterControl
                type={"slider"}
                optional={false}
                label={t("settings.modelEdit.fields.tokenLimit.label")}
                value={localModel.maxTokens ?? settings.maxTokens}
                onChange={(value) => handleLocalUpdate("maxTokens", value)}
                max={65000}
                min={0}
                step={100}
                defaultValue={DEFAULT_MODEL_SETTING.MAX_TOKENS}
                helpText={t("settings.modelEdit.fields.tokenLimit.help")}
              />
            </FormField>

            <FormField>
              <ParameterControl
                type={"slider"}
                optional={false}
                label={t("settings.modelEdit.fields.temperature.label")}
                value={localModel.temperature ?? settings.temperature}
                onChange={(value) => handleLocalUpdate("temperature", value)}
                max={2}
                min={0}
                step={0.05}
                defaultValue={DEFAULT_MODEL_SETTING.TEMPERATURE}
                helpText={t("settings.modelEdit.fields.temperature.help")}
              />
            </FormField>

            <FormField>
              <ParameterControl
                type={"slider"}
                label={t("settings.modelEdit.fields.topP.label")}
                value={localModel.topP}
                onChange={(value) => handleLocalUpdate("topP", value)}
                disableFn={() => handleLocalReset("topP")}
                max={1}
                min={0}
                step={0.05}
                defaultValue={0.9}
                helpText={t("settings.modelEdit.fields.topP.help")}
              />
            </FormField>

            <FormField>
              <ParameterControl
                type={"slider"}
                label={t("settings.modelEdit.fields.frequencyPenalty.label")}
                value={localModel.frequencyPenalty}
                onChange={(value) => handleLocalUpdate("frequencyPenalty", value)}
                disableFn={() => handleLocalReset("frequencyPenalty")}
                max={2}
                min={0}
                step={0.05}
                defaultValue={0}
                helpText={t("settings.modelEdit.fields.frequencyPenalty.help")}
              />
            </FormField>

            {/* Reasoning Effort and Verbosity for GPT-5 and O-series models */}
            {localModel.provider === "openai" &&
              (localModel.name.startsWith("gpt-5") ||
                localModel.name.startsWith("o1") ||
                localModel.name.startsWith("o3") ||
                localModel.name.startsWith("o4")) && (
                <>
                  <FormField>
                    <ParameterControl
                      type="select"
                      label={t("settings.modelEdit.fields.reasoningEffort.label")}
                      value={localModel.reasoningEffort}
                      onChange={(value) => handleLocalUpdate("reasoningEffort", value)}
                      disableFn={() => handleLocalReset("reasoningEffort")}
                      defaultValue={
                        settings.reasoningEffort ?? DEFAULT_MODEL_SETTING.REASONING_EFFORT
                      }
                      options={[
                        ...(localModel.name.startsWith("gpt-5")
                          ? [
                              {
                                value: "minimal",
                                label: t("settings.modelEdit.options.reasoningEffort.minimal"),
                              },
                            ]
                          : []),
                        { value: "low", label: t("settings.modelEdit.options.general.low") },
                        { value: "medium", label: t("settings.modelEdit.options.general.medium") },
                        { value: "high", label: t("settings.modelEdit.options.general.high") },
                      ]}
                      helpText={t("settings.modelEdit.fields.reasoningEffort.help")}
                    />
                  </FormField>

                  {/* Verbosity only for GPT-5 models */}
                  {localModel.name.startsWith("gpt-5") && (
                    <FormField>
                      <ParameterControl
                        type="select"
                        label={t("settings.modelEdit.fields.verbosity.label")}
                        value={localModel.verbosity}
                        onChange={(value) => handleLocalUpdate("verbosity", value)}
                        disableFn={() => handleLocalReset("verbosity")}
                        defaultValue={settings.verbosity ?? DEFAULT_MODEL_SETTING.VERBOSITY}
                        options={[
                          { value: "low", label: t("settings.modelEdit.options.general.low") },
                          {
                            value: "medium",
                            label: t("settings.modelEdit.options.general.medium"),
                          },
                          { value: "high", label: t("settings.modelEdit.options.general.high") },
                        ]}
                        helpText={t("settings.modelEdit.fields.verbosity.help")}
                      />
                    </FormField>
                  )}
                </>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export class ModelEditModal extends Modal {
  private root: Root;

  constructor(
    app: App,
    private model: CustomModel,
    private isEmbeddingModel: boolean,
    private onUpdate: (
      isEmbeddingModel: boolean,
      originalModel: CustomModel,
      updatedModel: CustomModel
    ) => void
  ) {
    super(app);
  }

  onOpen() {
    const { contentEl, modalEl } = this;
    // It occupies only 80% of the height, leaving a clickable blank area to prevent the close icon from malfunctioning.
    if (Platform.isMobile) {
      modalEl.style.height = "80%";
    }
    this.root = createRoot(contentEl);

    const handleUpdate = (
      isEmbeddingModel: boolean,
      originalModel: CustomModel,
      updatedModel: CustomModel
    ) => {
      this.onUpdate(isEmbeddingModel, originalModel, updatedModel);
    };

    const handleCancel = () => {
      this.close();
    };

    this.root.render(
      <ModelEditModalContent
        model={this.model}
        isEmbeddingModel={this.isEmbeddingModel}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />
    );
  }

  onClose() {
    this.root.unmount();
  }
}
