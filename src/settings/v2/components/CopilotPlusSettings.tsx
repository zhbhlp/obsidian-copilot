import { AcceptKeyOption } from "@/autocomplete/codemirrorIntegration";
import { WordCompletionManager } from "@/autocomplete/wordCompletion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingItem } from "@/components/ui/setting-item";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { AUTOCOMPLETE_CONFIG } from "@/constants";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { updateSetting, useSettingsValue } from "@/settings/model";
import { RefreshCw } from "lucide-react";
import { Notice } from "obsidian";
import React, { useState } from "react";
import { ToolSettingsSection } from "./ToolSettingsSection";

export const CopilotPlusSettings: React.FC = () => {
  const { t } = useTranslation();
  const settings = useSettingsValue();
  const currentShortcut = settings.autocompleteAcceptKey || AUTOCOMPLETE_CONFIG.KEYBIND;
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Available key options
  const keyOptions: { value: AcceptKeyOption; label: string }[] = [
    { value: "Tab", label: t("settings.plus.autocomplete.keys.tab") },
    { value: "Space", label: t("settings.plus.autocomplete.keys.space") },
    { value: "ArrowRight", label: t("settings.plus.autocomplete.keys.rightArrow") },
  ];

  // Handle key option change
  const handleKeyChange = (value: AcceptKeyOption) => {
    updateSetting("autocompleteAcceptKey", value);
    const keyLabel = keyOptions.find((option) => option.value === value)?.label || value;
    new Notice(t("settings.plus.notices.acceptKeyUpdated", { key: keyLabel }));
  };

  // Reset to default
  const resetToDefault = () => {
    updateSetting("autocompleteAcceptKey", AUTOCOMPLETE_CONFIG.KEYBIND as AcceptKeyOption);
    new Notice(t("settings.plus.notices.acceptKeyReset"));
  };

  // Handle refresh word index
  const handleRefreshWordIndex = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    new Notice(t("settings.plus.notices.wordIndexRebuilding"));

    try {
      const wordManager = WordCompletionManager.getInstance(app.vault);
      const result = await wordManager.rescan((progress) => {
        if (progress.processedFiles === progress.totalFiles) {
          new Notice(
            t("settings.plus.notices.wordIndexComplete", {
              foundWords: progress.foundWords,
              processedFiles: progress.processedFiles,
            })
          );
        }
      });

      new Notice(t("settings.plus.notices.wordIndexRebuilt", { count: result.wordCount }));
    } catch (error) {
      console.error("Failed to refresh word index:", error);
      new Notice(t("settings.plus.notices.wordIndexFailed"));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <section className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-flex tw-items-center tw-py-4">
          <Badge variant="secondary" className="tw-text-accent">
            {t("settings.plus.badge.required")}
          </Badge>
        </div>
        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-pt-4 tw-text-xl tw-font-semibold">
            {t("settings.plus.sections.autonomousAgent")}
          </div>

          <SettingItem
            type="switch"
            title={t("settings.plus.autonomousAgent.title")}
            description={t("settings.plus.autonomousAgent.description")}
            checked={settings.enableAutonomousAgent}
            onCheckedChange={(checked) => {
              updateSetting("enableAutonomousAgent", checked);
            }}
          />

          {settings.enableAutonomousAgent && (
            <>
              <ToolSettingsSection />
            </>
          )}

          <div className="tw-pt-4 tw-text-xl tw-font-semibold">
            {t("settings.plus.sections.autocomplete")}
          </div>

          <SettingItem
            type="switch"
            title={t("settings.plus.autocomplete.sentence.title")}
            description={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">
                  {t("settings.plus.autocomplete.sentence.description")}
                </span>
              </div>
            }
            checked={settings.enableAutocomplete}
            onCheckedChange={(checked) => updateSetting("enableAutocomplete", checked)}
          />

          <SettingItem
            type="switch"
            title={t("settings.plus.autocomplete.word.title")}
            description={t("settings.plus.autocomplete.word.description")}
            checked={settings.enableWordCompletion}
            onCheckedChange={(checked) => {
              updateSetting("enableWordCompletion", checked);
            }}
          />

          <SettingItem
            type="custom"
            title={t("settings.plus.wordIndex.title")}
            description={t("settings.plus.wordIndex.description")}
          >
            <Button
              onClick={handleRefreshWordIndex}
              disabled={isRefreshing}
              className="tw-flex tw-items-center tw-gap-2"
            >
              <RefreshCw className={cn("tw-size-4", isRefreshing && "tw-animate-spin")} />
              {isRefreshing
                ? t("settings.plus.wordIndex.buttonRefreshing")
                : t("settings.plus.wordIndex.buttonRefresh")}
            </Button>
          </SettingItem>

          <SettingItem
            type="custom"
            title={t("settings.plus.autocomplete.acceptKey.title")}
            description={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">
                  {t("settings.plus.autocomplete.acceptKey.description")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-flex tw-max-w-96 tw-flex-col tw-gap-2">
                      <div className="tw-text-sm tw-text-muted">
                        {t("settings.plus.autocomplete.acceptKey.helpDescription")}
                      </div>
                    </div>
                  }
                />
              </div>
            }
          >
            <div className="tw-flex tw-items-center tw-gap-2">
              <Select value={currentShortcut} onValueChange={handleKeyChange}>
                <SelectTrigger className="tw-w-[180px]">
                  <SelectValue
                    placeholder={t("settings.plus.autocomplete.acceptKey.placeholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  {keyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {currentShortcut && currentShortcut !== AUTOCOMPLETE_CONFIG.KEYBIND && (
                <Button variant="ghost" onClick={resetToDefault} className="tw-h-8 tw-text-xs">
                  {t("settings.plus.autocomplete.acceptKey.resetButton")}
                </Button>
              )}
            </div>
          </SettingItem>

          <SettingItem
            type="switch"
            title={t("settings.plus.context.title")}
            description={t("settings.plus.context.description")}
            checked={settings.allowAdditionalContext}
            onCheckedChange={(checked) => {
              updateSetting("allowAdditionalContext", checked);
            }}
          />
        </div>
      </section>
    </div>
  );
};
