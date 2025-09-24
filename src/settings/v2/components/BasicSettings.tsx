import { ChainType } from "@/chainFactory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getModelDisplayWithIcons } from "@/components/ui/model-display";
import { SettingItem } from "@/components/ui/setting-item";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { DEFAULT_OPEN_AREA, PLUS_UTM_MEDIUMS } from "@/constants";
import { cn } from "@/lib/utils";
import { createPlusPageUrl } from "@/plusUtils";
import { getModelKeyFromModel, updateSetting, useSettingsValue } from "@/settings/model";
import { PlusSettings } from "@/settings/v2/components/PlusSettings";
import { checkModelApiKey, formatDateTime } from "@/utils";
import { Key, Loader2 } from "lucide-react";
import { Notice } from "obsidian";
import React, { useState } from "react";
import { ApiKeyDialog } from "./ApiKeyDialog";
import { useTranslation, LOCALE_NAMES, SUPPORTED_LOCALES } from "@/i18n";

export const BasicSettings: React.FC = () => {
  const settings = useSettingsValue();
  const { t, locale, setLocale } = useTranslation();
  const [isChecking, setIsChecking] = useState(false);

  const ChainType2Label: Record<ChainType, string> = {
    [ChainType.LLM_CHAIN]: t("settings.chainType.chat"),
    [ChainType.VAULT_QA_CHAIN]: t("settings.chainType.vaultQA"),
    [ChainType.COPILOT_PLUS_CHAIN]: t("settings.chainType.copilotPlus"),
    [ChainType.PROJECT_CHAIN]: t("settings.chainType.projects"),
  };
  const [conversationNoteName, setConversationNoteName] = useState(
    settings.defaultConversationNoteName || "{$date}_{$time}__{$topic}"
  );

  const applyCustomNoteFormat = () => {
    setIsChecking(true);

    try {
      // Check required variables
      const format = conversationNoteName || "{$date}_{$time}__{$topic}";
      const requiredVars = ["{$date}", "{$time}", "{$topic}"];
      const missingVars = requiredVars.filter((v) => !format.includes(v));

      if (missingVars.length > 0) {
        new Notice(
          t("settings.conversationFilename.errors.missingVariables", {
            variables: missingVars.join(", "),
          }),
          4000
        );
        return;
      }

      // Check illegal characters (excluding variable placeholders)
      const illegalChars = /[\\/:*?"<>|]/;
      const formatWithoutVars = format
        .replace(/\{\$date}/g, "")
        .replace(/\{\$time}/g, "")
        .replace(/\{\$topic}/g, "");

      if (illegalChars.test(formatWithoutVars)) {
        new Notice(t("settings.conversationFilename.errors.illegalCharacters"), 4000);
        return;
      }

      // Generate example filename
      const { fileName: timestampFileName } = formatDateTime(new Date());
      const firstTenWords = "test topic name";

      // Create example filename
      const customFileName = format
        .replace("{$topic}", firstTenWords.slice(0, 100).replace(/\s+/g, "_"))
        .replace("{$date}", timestampFileName.split("_")[0])
        .replace("{$time}", timestampFileName.split("_")[1]);

      // Save settings
      updateSetting("defaultConversationNoteName", format);
      setConversationNoteName(format);
      new Notice(t("settings.conversationFilename.success", { example: customFileName }), 4000);
    } catch (error) {
      new Notice(t("settings.conversationFilename.applyError", { error: error.message }), 4000);
    } finally {
      setIsChecking(false);
    }
  };

  const defaultModelActivated = !!settings.activeModels.find(
    (m) => m.enabled && getModelKeyFromModel(m) === settings.defaultModelKey
  );
  const enableActivatedModels = settings.activeModels
    .filter((m) => m.enabled)
    .map((model) => ({
      label: getModelDisplayWithIcons(model),
      value: getModelKeyFromModel(model),
    }));

  return (
    <div className="tw-space-y-4">
      <PlusSettings />

      {/* General Section */}
      <section>
        <div className="tw-mb-3 tw-text-xl tw-font-bold">{t("settings.sections.general")}</div>
        <div className="tw-space-y-4">
          {/* Language Selection */}
          <SettingItem
            type="select"
            title={t("settings.language.label")}
            description={t("settings.language.description")}
            value={locale}
            onChange={(value) => setLocale(value as any)}
            options={SUPPORTED_LOCALES.map((loc) => ({
              label: LOCALE_NAMES[loc],
              value: loc,
            }))}
          />

          <div className="tw-space-y-4">
            {/* API Key Section */}
            <SettingItem
              type="custom"
              title={t("settings.apiKeys.title")}
              description={
                <div className="tw-flex tw-items-center tw-gap-1.5">
                  <span className="tw-leading-none">{t("settings.apiKeys.description")}</span>
                  <HelpTooltip
                    content={
                      <div className="tw-flex tw-max-w-96 tw-flex-col tw-gap-2 tw-py-4">
                        <div className="tw-text-sm tw-font-medium tw-text-accent">
                          {t("settings.apiKeys.helpTitle")}
                        </div>
                        <div className="tw-text-xs tw-text-muted">
                          {t("settings.apiKeys.helpDescription")}
                        </div>
                      </div>
                    }
                  />
                </div>
              }
            >
              <Button
                onClick={() => {
                  new ApiKeyDialog(app).open();
                }}
                variant="secondary"
                className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 sm:tw-w-auto sm:tw-justify-start"
              >
                {t("settings.apiKeys.setKeys")}
                <Key className="tw-size-4" />
              </Button>
            </SettingItem>
          </div>
          <SettingItem
            type="select"
            title={t("settings.defaultChatModel.title")}
            description={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">
                  {t("settings.defaultChatModel.description")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-flex tw-max-w-96 tw-flex-col tw-gap-2 tw-py-4">
                      <div className="tw-text-sm tw-font-medium tw-text-accent">
                        {t("settings.defaultChatModel.helpTitle")}
                      </div>
                      <div className="tw-text-xs tw-text-muted">
                        {t("settings.defaultChatModel.helpDescription")}
                      </div>
                    </div>
                  }
                />
              </div>
            }
            value={
              defaultModelActivated
                ? settings.defaultModelKey
                : t("settings.defaultChatModel.selectModel")
            }
            onChange={(value) => {
              const selectedModel = settings.activeModels.find(
                (m) => m.enabled && getModelKeyFromModel(m) === value
              );
              if (!selectedModel) return;

              const { hasApiKey, errorNotice } = checkModelApiKey(selectedModel, settings);
              if (!hasApiKey && errorNotice) {
                new Notice(errorNotice);
                return;
              }
              updateSetting("defaultModelKey", value);
            }}
            options={
              defaultModelActivated
                ? enableActivatedModels
                : [
                    {
                      label: t("settings.defaultChatModel.selectModel"),
                      value: t("settings.defaultChatModel.selectModel"),
                    },
                    ...enableActivatedModels,
                  ]
            }
            placeholder={t("settings.placeholders.model")}
          />

          {/* Basic Configuration Group */}
          <SettingItem
            type="select"
            title={t("settings.defaultMode.title")}
            description={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">{t("settings.defaultMode.description")}</span>
                <HelpTooltip
                  content={
                    <div className="tw-flex tw-max-w-96 tw-flex-col tw-gap-2">
                      <ul className="tw-pl-4 tw-text-sm tw-text-muted">
                        <li>
                          <strong>{t("settings.chainType.chat")}:</strong>{" "}
                          {t("settings.defaultMode.help.chat")}
                        </li>
                        <li>
                          <strong>{t("settings.chainType.vaultQA")}:</strong>{" "}
                          {t("settings.defaultMode.help.vaultQA")}
                        </li>
                        <li>
                          <strong>{t("settings.chainType.copilotPlus")}:</strong>{" "}
                          {t("settings.defaultMode.help.copilotPlus")}{" "}
                          <a
                            href={createPlusPageUrl(PLUS_UTM_MEDIUMS.MODE_SELECT_TOOLTIP)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tw-text-accent hover:tw-text-accent-hover"
                          >
                            {t("settings.defaultMode.help.copilotPlusLink")}
                          </a>{" "}
                          {t("settings.defaultMode.help.copilotPlusEnd")}
                        </li>
                      </ul>
                    </div>
                  }
                />
              </div>
            }
            value={settings.defaultChainType}
            onChange={(value) => updateSetting("defaultChainType", value as ChainType)}
            options={Object.entries(ChainType2Label).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
          />

          <SettingItem
            type="select"
            title={t("settings.openPluginIn.title")}
            description={t("settings.openPluginIn.description")}
            value={settings.defaultOpenArea}
            onChange={(value) => updateSetting("defaultOpenArea", value as DEFAULT_OPEN_AREA)}
            options={[
              { label: t("settings.openPluginIn.sidebarView"), value: DEFAULT_OPEN_AREA.VIEW },
              { label: t("settings.openPluginIn.editor"), value: DEFAULT_OPEN_AREA.EDITOR },
            ]}
          />

          <SettingItem
            type="text"
            title={t("settings.conversationFolder.title")}
            description={t("settings.conversationFolder.description")}
            value={settings.defaultSaveFolder}
            onChange={(value) => updateSetting("defaultSaveFolder", value)}
            placeholder={t("settings.placeholders.folderPath")}
          />

          <SettingItem
            type="text"
            title={t("settings.conversationTag.title")}
            description={t("settings.conversationTag.description")}
            value={settings.defaultConversationTag}
            onChange={(value) => updateSetting("defaultConversationTag", value)}
            placeholder={t("settings.placeholders.conversationTag")}
          />

          <SettingItem
            type="custom"
            title={t("settings.conversationFilename.title")}
            description={
              <div className="tw-flex tw-items-start tw-gap-1.5 ">
                <span className="tw-leading-none">
                  {t("settings.conversationFilename.description")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-flex tw-max-w-96 tw-flex-col tw-gap-2 tw-py-4">
                      <div className="tw-text-sm tw-font-medium tw-text-accent">
                        {t("settings.conversationFilename.helpTitle")}
                      </div>
                      <div>
                        <div className="tw-text-sm tw-font-medium tw-text-muted">
                          {t("settings.conversationFilename.helpDescription")}
                        </div>
                        <ul className="tw-pl-4 tw-text-sm tw-text-muted">
                          <li>
                            <strong>{"{$date}"}</strong>:{" "}
                            {t("settings.conversationFilename.variables.date")}
                          </li>
                          <li>
                            <strong>{"{$time}"}</strong>:{" "}
                            {t("settings.conversationFilename.variables.time")}
                          </li>
                          <li>
                            <strong>{"{$topic}"}</strong>:{" "}
                            {t("settings.conversationFilename.variables.topic")}
                          </li>
                        </ul>
                        <i className="tw-mt-2 tw-text-sm tw-text-muted">
                          {t("settings.conversationFilename.example")}
                        </i>
                      </div>
                    </div>
                  }
                />
              </div>
            }
          >
            <div className="tw-flex tw-w-[320px] tw-items-center tw-gap-1.5">
              <Input
                type="text"
                className={cn(
                  "tw-min-w-[80px] tw-grow tw-transition-all tw-duration-200",
                  isChecking ? "tw-w-[80px]" : "tw-w-[120px]"
                )}
                placeholder={t("settings.placeholders.fileNameTemplate")}
                value={conversationNoteName}
                onChange={(e) => setConversationNoteName(e.target.value)}
                disabled={isChecking}
              />

              <Button
                onClick={() => applyCustomNoteFormat()}
                disabled={isChecking}
                variant="secondary"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="tw-mr-2 tw-size-4 tw-animate-spin" />
                    {t("common.buttons.apply")}
                  </>
                ) : (
                  t("common.buttons.apply")
                )}
              </Button>
            </div>
          </SettingItem>

          {/* Feature Toggle Group */}
          <SettingItem
            type="switch"
            title={t("settings.features.autosaveChat.title")}
            description={t("settings.features.autosaveChat.description")}
            checked={settings.autosaveChat}
            onCheckedChange={(checked) => updateSetting("autosaveChat", checked)}
          />

          <SettingItem
            type="switch"
            title={t("settings.features.generateAIChatTitle.title")}
            description={t("settings.features.generateAIChatTitle.description")}
            checked={settings.generateAIChatTitleOnSave}
            onCheckedChange={(checked) => updateSetting("generateAIChatTitleOnSave", checked)}
          />

          <SettingItem
            type="switch"
            title={t("settings.features.includeCurrentNote.title")}
            description={t("settings.features.includeCurrentNote.description")}
            checked={settings.includeActiveNoteAsContext}
            onCheckedChange={(checked) => {
              updateSetting("includeActiveNoteAsContext", checked);
            }}
          />

          <SettingItem
            type="switch"
            title={t("settings.features.imagesInMarkdown.title")}
            description={t("settings.features.imagesInMarkdown.description")}
            checked={settings.passMarkdownImages}
            onCheckedChange={(checked) => {
              updateSetting("passMarkdownImages", checked);
            }}
          />

          <SettingItem
            type="switch"
            title={t("settings.features.suggestedPrompts.title")}
            description={t("settings.features.suggestedPrompts.description")}
            checked={settings.showSuggestedPrompts}
            onCheckedChange={(checked) => updateSetting("showSuggestedPrompts", checked)}
          />

          <SettingItem
            type="switch"
            title={t("settings.features.relevantNotes.title")}
            description={t("settings.features.relevantNotes.description")}
            checked={settings.showRelevantNotes}
            onCheckedChange={(checked) => updateSetting("showRelevantNotes", checked)}
          />
        </div>
      </section>
    </div>
  );
};
