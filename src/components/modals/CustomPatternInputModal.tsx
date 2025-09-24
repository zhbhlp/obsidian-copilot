import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { t, useTranslation } from "@/i18n";
import { App, Modal } from "obsidian";
import React, { useState } from "react";
import { createRoot, Root } from "react-dom/client";

function CustomPatternInputModalContent({
  onConfirm,
  onCancel,
}: {
  onConfirm: (pattern: string) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  // TODO: Add validation
  const [pattern, setPattern] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onConfirm(pattern);
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div>{t("modals.customPattern.description")}</div>
        <Input
          placeholder={t("modals.customPattern.placeholder")}
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button variant="secondary" onClick={onCancel}>
          {t("common.buttons.cancel")}
        </Button>
        <Button variant="default" onClick={() => onConfirm(pattern)}>
          {t("modals.confirm.continue")}
        </Button>
      </div>
    </div>
  );
}

export class CustomPatternInputModal extends Modal {
  private root: Root;

  constructor(
    app: App,
    private onConfirm: (pattern: string) => void
  ) {
    super(app);
    // https://docs.obsidian.md/Reference/TypeScript+API/Modal/setTitle
    // @ts-ignore
    this.setTitle(t("modals.customPattern.title"));
  }

  onOpen() {
    const { contentEl } = this;
    this.root = createRoot(contentEl);

    const handleConfirm = (extension: string) => {
      this.onConfirm(extension);
      this.close();
    };

    const handleCancel = () => {
      this.close();
    };

    this.root.render(
      <CustomPatternInputModalContent onConfirm={handleConfirm} onCancel={handleCancel} />
    );
  }

  onClose() {
    this.root.unmount();
  }
}
