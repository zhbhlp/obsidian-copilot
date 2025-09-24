import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { t } from "@/i18n";
import { App } from "obsidian";

export class ResetSettingsConfirmModal extends ConfirmModal {
  constructor(app: App, onConfirm: () => void) {
    super(
      app,
      onConfirm,
      "Resetting settings will clear all settings and restore the default values. You will lose any custom settings you have made including the API keys. Are you sure you want to continue?",
      t("modals.resetSettings.title")
    );
  }
}
