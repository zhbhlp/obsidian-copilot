import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { t, useTranslation } from "@/i18n";
import { App, Modal } from "obsidian";
import React, { useState } from "react";
import { createRoot, Root } from "react-dom/client";

function ExtensionInputModalContent({
  onConfirm,
  onCancel,
}: {
  onConfirm: (extension: string) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const [extension, setExtension] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateAndConfirm = (value: string) => {
    if (value.includes(" ")) {
      setError(t("modals.extension.noSpacesError"));
      return;
    }
    setError(null);
    onConfirm(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      validateAndConfirm(extension);
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Input
          placeholder={t("modals.extensionInput.enterPattern")}
          value={extension}
          onChange={(e) => {
            setExtension(e.target.value);
            setError(null);
          }}
          onKeyDown={handleKeyDown}
        />
        {error && <p className="tw-text-sm tw-text-error">{error}</p>}
      </div>
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button variant="secondary" onClick={onCancel}>
          {t("common.buttons.cancel")}
        </Button>
        <Button variant="default" onClick={() => validateAndConfirm(extension)}>
          {t("modals.confirm.continue")}
        </Button>
      </div>
    </div>
  );
}

export class ExtensionInputModal extends Modal {
  private root: Root;

  constructor(
    app: App,
    private onConfirm: (extension: string) => void
  ) {
    super(app);
    // https://docs.obsidian.md/Reference/TypeScript+API/Modal/setTitle
    // @ts-ignore
    this.setTitle(t("modals.extension.title"));
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
      <ExtensionInputModalContent onConfirm={handleConfirm} onCancel={handleCancel} />
    );
  }

  onClose() {
    this.root.unmount();
  }
}
