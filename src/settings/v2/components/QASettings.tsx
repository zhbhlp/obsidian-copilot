import { PatternMatchingModal } from "@/components/modals/PatternMatchingModal";
import { RebuildIndexConfirmModal } from "@/components/modals/RebuildIndexConfirmModal";
import { SemanticSearchToggleModal } from "@/components/modals/SemanticSearchToggleModal";
import { Button } from "@/components/ui/button";
import { getModelDisplayWithIcons } from "@/components/ui/model-display";
import { SettingItem } from "@/components/ui/setting-item";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { VAULT_VECTOR_STORE_STRATEGIES } from "@/constants";
import { useTranslation } from "@/i18n";
import { getModelKeyFromModel, updateSetting, useSettingsValue } from "@/settings/model";
import { Notice } from "obsidian";
import React from "react";

export const QASettings: React.FC = () => {
  const { t } = useTranslation();
  const settings = useSettingsValue();

  const handleSetDefaultEmbeddingModel = async (modelKey: string) => {
    if (modelKey === settings.embeddingModelKey) return;

    if (settings.enableSemanticSearchV3) {
      // Persist only after user confirms rebuild
      new RebuildIndexConfirmModal(app, async () => {
        updateSetting("embeddingModelKey", modelKey);
        const VectorStoreManager = (await import("@/search/vectorStoreManager")).default;
        await VectorStoreManager.getInstance().indexVaultToVectorStore(false);
      }).open();
      return;
    }

    // Persist without rebuild when semantic search is disabled
    updateSetting("embeddingModelKey", modelKey);
    new Notice(t("settings.qa.notices.embeddingModelSaved"));
  };

  // Partitions are automatically managed in v3 (150MB per JSONL partition).
  // Remove UI control; keep handler stub to avoid accidental usage.
  // const handlePartitionsChange = (_value: string) => {};

  return (
    <div className="tw-space-y-4">
      <section>
        <div className="tw-space-y-4">
          {/* Enable Inline Citations */}
          <SettingItem
            type="switch"
            title={t("settings.qa.inlineCitations.title")}
            description={t("settings.qa.inlineCitations.description")}
            checked={settings.enableInlineCitations}
            onCheckedChange={(checked) => updateSetting("enableInlineCitations", checked)}
          />

          {/* Enable Semantic Search (v3) */}
          <SettingItem
            type="switch"
            title={t("settings.qa.enableSemanticSearch.title")}
            description={t("settings.qa.enableSemanticSearch.description")}
            checked={settings.enableSemanticSearchV3}
            onCheckedChange={(checked) => {
              // Show confirmation modal with appropriate message
              new SemanticSearchToggleModal(
                app,
                async () => {
                  updateSetting("enableSemanticSearchV3", checked);
                  if (checked) {
                    const VectorStoreManager = (await import("@/search/vectorStoreManager"))
                      .default;
                    await VectorStoreManager.getInstance().indexVaultToVectorStore(false);
                  }
                },
                checked // true = enabling, false = disabling
              ).open();
            }}
          />

          {/* Embedding Model - Always shown to reduce ambiguity */}
          <SettingItem
            type="select"
            title={t("settings.qa.embeddingModel.title")}
            description={
              <div className="tw-space-y-2">
                <div className="tw-flex tw-items-center tw-gap-1.5">
                  <span className="tw-font-medium tw-leading-none tw-text-accent">
                    {t("settings.qa.embeddingModel.description")}
                  </span>
                  <HelpTooltip
                    content={
                      <div className="tw-flex tw-max-w-96 tw-flex-col tw-gap-2">
                        <div className="tw-pt-2 tw-text-sm tw-text-muted">
                          {t("settings.qa.embeddingModel.helpTooltip.intro")}
                        </div>
                        <ul className="tw-pl-4 tw-text-sm tw-text-muted">
                          <li>{t("settings.qa.embeddingModel.helpTooltip.requirement1")}</li>
                          <li>{t("settings.qa.embeddingModel.helpTooltip.requirement2")}</li>
                          <li>{t("settings.qa.embeddingModel.helpTooltip.requirement3")}</li>
                        </ul>
                      </div>
                    }
                  />
                </div>
              </div>
            }
            value={settings.embeddingModelKey}
            onChange={handleSetDefaultEmbeddingModel}
            options={settings.activeEmbeddingModels.map((model) => ({
              label: getModelDisplayWithIcons(model),
              value: getModelKeyFromModel(model),
            }))}
            placeholder={t("settings.placeholders.model")}
          />

          {/* Auto-Index Strategy */}
          <SettingItem
            type="select"
            title={t("settings.qa.autoIndexStrategy.title")}
            description={
              <div className="tw-flex tw-items-center tw-gap-1.5">
                <span className="tw-leading-none">
                  {t("settings.qa.autoIndexStrategy.description")}
                </span>
                <HelpTooltip
                  content={
                    <div className="tw-space-y-2 tw-py-2">
                      <div className="tw-space-y-1">
                        <div className="tw-text-sm tw-text-muted">
                          {t("settings.qa.autoIndexStrategy.helpTooltip.intro")}
                        </div>
                        <ul className="tw-list-disc tw-space-y-1 tw-pl-2 tw-text-sm">
                          <li>
                            <div className="tw-flex tw-items-center tw-gap-1">
                              <strong className="tw-inline-block tw-whitespace-nowrap">
                                {t("settings.qa.autoIndexStrategy.helpTooltip.never.label")}
                              </strong>
                              <span>
                                {t("settings.qa.autoIndexStrategy.helpTooltip.never.description")}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="tw-flex tw-items-center tw-gap-1">
                              <strong className="tw-inline-block tw-whitespace-nowrap">
                                {t("settings.qa.autoIndexStrategy.helpTooltip.onStartup.label")}
                              </strong>
                              <span>
                                {t(
                                  "settings.qa.autoIndexStrategy.helpTooltip.onStartup.description"
                                )}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="tw-flex tw-items-center tw-gap-1">
                              <strong className="tw-inline-block tw-whitespace-nowrap">
                                {t("settings.qa.autoIndexStrategy.helpTooltip.onModeSwitch.label")}
                              </strong>
                              <span>
                                {t(
                                  "settings.qa.autoIndexStrategy.helpTooltip.onModeSwitch.description"
                                )}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <p className="tw-text-sm tw-text-callout-warning">
                        {t("settings.qa.autoIndexStrategy.helpTooltip.warning")}
                      </p>
                    </div>
                  }
                />
              </div>
            }
            value={settings.indexVaultToVectorStore}
            onChange={(value) => {
              updateSetting("indexVaultToVectorStore", value);
            }}
            options={VAULT_VECTOR_STORE_STRATEGIES.map((strategy) => ({
              label: strategy,
              value: strategy,
            }))}
            placeholder={t("forms.strategy.placeholder")}
          />

          {/* Max Sources */}
          <SettingItem
            type="slider"
            title={t("settings.qa.maxSources.title")}
            description={t("settings.qa.maxSources.description")}
            min={1}
            max={128}
            step={1}
            value={settings.maxSourceChunks}
            onChange={(value) => updateSetting("maxSourceChunks", value)}
          />

          {/* Embedding-related settings - Only shown when semantic search is enabled */}
          {settings.enableSemanticSearchV3 && (
            <>
              {/* Requests per Minute */}
              <SettingItem
                type="slider"
                title={t("settings.qa.requestsPerMinute.title")}
                description={t("settings.qa.requestsPerMinute.description")}
                min={10}
                max={60}
                step={10}
                value={Math.min(settings.embeddingRequestsPerMin, 60)}
                onChange={(value) => updateSetting("embeddingRequestsPerMin", value)}
              />

              {/* Embedding batch size */}
              <SettingItem
                type="slider"
                title={t("settings.qa.embeddingBatchSize.title")}
                description={t("settings.qa.embeddingBatchSize.description")}
                min={1}
                max={128}
                step={1}
                value={settings.embeddingBatchSize}
                onChange={(value) => updateSetting("embeddingBatchSize", value)}
              />

              {/* Number of Partitions */}
              <SettingItem
                type="select"
                title={t("settings.qa.partitions.title")}
                description={t("settings.qa.partitions.description")}
                value={String(settings.numPartitions || 1)}
                onChange={(value) => updateSetting("numPartitions", Number(value))}
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "4", value: "4" },
                  { label: "8", value: "8" },
                  { label: "16", value: "16" },
                  { label: "32", value: "32" },
                  { label: "40", value: "40" },
                ]}
                placeholder={t("forms.partitions.selectPartitions")}
              />
            </>
          )}

          {/* Lexical Search RAM Limit */}
          <SettingItem
            type="slider"
            title={t("settings.qa.lexicalSearchRamLimit.title")}
            description={t("settings.qa.lexicalSearchRamLimit.description")}
            min={20}
            max={1000}
            step={20}
            value={settings.lexicalSearchRamLimit || 100}
            onChange={(value) => updateSetting("lexicalSearchRamLimit", value)}
            suffix={t("common.units.mb")}
          />

          {/* Enable Folder and Graph Boosts */}
          <SettingItem
            type="switch"
            title={t("settings.qa.lexicalBoosts.title")}
            description={t("settings.qa.lexicalBoosts.description")}
            checked={settings.enableLexicalBoosts}
            onCheckedChange={(checked) => updateSetting("enableLexicalBoosts", checked)}
          />

          {/* Exclusions */}
          <SettingItem
            type="custom"
            title={t("settings.qa.exclusions.title")}
            description={
              <>
                <p>{t("settings.qa.exclusions.description")}</p>
              </>
            }
          >
            <Button
              variant="secondary"
              onClick={() =>
                new PatternMatchingModal(
                  app,
                  (value) => updateSetting("qaExclusions", value),
                  settings.qaExclusions,
                  t("settings.qa.exclusions.modalTitle")
                ).open()
              }
            >
              {t("common.buttons.manage")}
            </Button>
          </SettingItem>

          {/* Inclusions */}
          <SettingItem
            type="custom"
            title={t("settings.qa.inclusions.title")}
            description={<p>{t("settings.qa.inclusions.description")}</p>}
          >
            <Button
              variant="secondary"
              onClick={() =>
                new PatternMatchingModal(
                  app,
                  (value) => updateSetting("qaInclusions", value),
                  settings.qaInclusions,
                  t("settings.qa.inclusions.modalTitle")
                ).open()
              }
            >
              {t("common.buttons.manage")}
            </Button>
          </SettingItem>

          {/* Enable Obsidian Sync */}
          <SettingItem
            type="switch"
            title={t("settings.qa.obsidianSync.title")}
            description={t("settings.qa.obsidianSync.description")}
            checked={settings.enableIndexSync}
            onCheckedChange={(checked) => updateSetting("enableIndexSync", checked)}
          />

          {/* Disable index loading on mobile */}
          <SettingItem
            type="switch"
            title={t("settings.qa.disableIndexOnMobile.title")}
            description={t("settings.qa.disableIndexOnMobile.description")}
            checked={settings.disableIndexOnMobile}
            onCheckedChange={(checked) => updateSetting("disableIndexOnMobile", checked)}
          />
        </div>
      </section>
    </div>
  );
};
