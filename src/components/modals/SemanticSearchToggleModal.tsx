import { t } from "@/i18n";
import { App } from "obsidian";
import { ConfirmModal } from "./ConfirmModal";

export class SemanticSearchToggleModal extends ConfirmModal {
  constructor(app: App, onConfirm: () => void, enabling: boolean) {
    const content = enabling
      ? "Semantic search requires building an embedding index for your vault.\n\nUse 'Refresh Vault Index' or 'Force Reindex Vault' commands to build the index after enabling. Pick your embedding model below."
      : "Disabling semantic search will fall back to index-free lexical search (less resource-intensive, could be less accurate).\n\nYour existing index will be preserved but not used.";

    const title = enabling
      ? t("modals.semanticSearch.enable.title")
      : t("modals.semanticSearch.disable.title");
    const confirmButtonText = enabling
      ? t("modals.semanticSearch.enable.button")
      : t("modals.semanticSearch.disable.button");

    super(app, onConfirm, content, title, confirmButtonText, t("common.buttons.cancel"));
  }
}
