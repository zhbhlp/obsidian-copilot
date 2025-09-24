import { Button } from "@/components/ui/button";
import { SettingItem } from "@/components/ui/setting-item";
import { useTranslation } from "@/i18n";
import { logFileManager } from "@/logFileManager";
import { updateSetting, useSettingsValue } from "@/settings/model";
import React from "react";

export const AdvancedSettings: React.FC = () => {
  const { t } = useTranslation();
  const settings = useSettingsValue();

  return (
    <div className="tw-space-y-4">
      {/* Privacy Settings Section */}
      <section>
        <SettingItem
          type="textarea"
          title={t("settings.advanced.userSystemPrompt.title")}
          description={t("settings.advanced.userSystemPrompt.description")}
          value={settings.userSystemPrompt}
          onChange={(value) => updateSetting("userSystemPrompt", value)}
          placeholder={t("settings.placeholders.systemPrompt")}
        />

        <div className="tw-space-y-4">
          <SettingItem
            type="switch"
            title={t("settings.advanced.enableEncryption.title")}
            description={t("settings.advanced.enableEncryption.description")}
            checked={settings.enableEncryption}
            onCheckedChange={(checked) => {
              updateSetting("enableEncryption", checked);
            }}
          />

          <SettingItem
            type="switch"
            title={t("settings.advanced.debugMode.title")}
            description={t("settings.advanced.debugMode.description")}
            checked={settings.debug}
            onCheckedChange={(checked) => {
              updateSetting("debug", checked);
            }}
          />

          <SettingItem
            type="custom"
            title={t("settings.advanced.createLogFile.title")}
            description={t("settings.advanced.createLogFile.description", {
              path: logFileManager.getLogPath(),
            })}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                await logFileManager.flush();
                await logFileManager.openLogFile();
              }}
            >
              {t("settings.advanced.createLogFile.title")}
            </Button>
          </SettingItem>
        </div>
      </section>
    </div>
  );
};
