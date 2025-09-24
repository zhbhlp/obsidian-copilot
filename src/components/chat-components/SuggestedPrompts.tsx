import { useChainType } from "@/aiParams";
import { ChainType } from "@/chainFactory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VAULT_VECTOR_STORE_STRATEGY } from "@/constants";
import { useTranslation } from "@/i18n";
import { useSettingsValue } from "@/settings/model";
import { PlusCircle, TriangleAlert } from "lucide-react";
import React, { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NotePrompt {
  title: string;
  prompts: string[];
}

// 这个函数需要接收 t 函数作为参数，因为它在组件外部
function getSuggestedPrompts(t: (key: string, params?: any) => string): Record<string, NotePrompt> {
  return {
    activeNote: {
      title: t("suggestedPrompts.activeNote.title"),
      prompts: [
        t("suggestedPrompts.activeNote.prompt1", { activeNote: "{activeNote}" }),
        t("suggestedPrompts.activeNote.prompt2", { activeNote: "{activeNote}" }),
        t("suggestedPrompts.activeNote.prompt3", { activeNote: "{activeNote}" }),
      ],
    },
    quoteNote: {
      title: t("suggestedPrompts.quoteNote.title"),
      prompts: [
        t("suggestedPrompts.quoteNote.prompt1"),
        t("suggestedPrompts.quoteNote.prompt2"),
        t("suggestedPrompts.quoteNote.prompt3"),
        t("suggestedPrompts.quoteNote.prompt4"),
      ],
    },
    fun: {
      title: t("suggestedPrompts.fun.title"),
      prompts: [
        t("suggestedPrompts.fun.prompt1"),
        t("suggestedPrompts.fun.prompt2"),
        t("suggestedPrompts.fun.prompt3"),
      ],
    },
    qaVault: {
      title: t("suggestedPrompts.qaVault.title"),
      prompts: [
        t("suggestedPrompts.qaVault.prompt1"),
        t("suggestedPrompts.qaVault.prompt2"),
        t("suggestedPrompts.qaVault.prompt3"),
        t("suggestedPrompts.qaVault.prompt4"),
      ],
    },
    copilotPlus: {
      title: t("suggestedPrompts.copilotPlus.title"),
      prompts: [
        t("suggestedPrompts.copilotPlus.prompt1"),
        t("suggestedPrompts.copilotPlus.prompt2"),
        t("suggestedPrompts.copilotPlus.prompt3"),
        t("suggestedPrompts.copilotPlus.prompt4"),
        t("suggestedPrompts.copilotPlus.prompt5"),
        t("suggestedPrompts.copilotPlus.prompt6"),
        t("suggestedPrompts.copilotPlus.prompt7"),
      ],
    },
  };
}

const PROMPT_KEYS: Record<ChainType, Array<string>> = {
  [ChainType.LLM_CHAIN]: ["activeNote", "quoteNote", "fun"],
  [ChainType.VAULT_QA_CHAIN]: ["qaVault", "qaVault", "quoteNote"],
  [ChainType.COPILOT_PLUS_CHAIN]: ["copilotPlus", "copilotPlus", "copilotPlus"],
  [ChainType.PROJECT_CHAIN]: ["copilotPlus", "copilotPlus", "copilotPlus"],
};

function getRandomPrompt(
  chainType: ChainType = ChainType.LLM_CHAIN,
  suggestedPrompts: Record<string, NotePrompt>
) {
  const keys = PROMPT_KEYS[chainType] || PROMPT_KEYS[ChainType.LLM_CHAIN];

  // For repeated keys, shuffle once and take multiple items
  const shuffledPrompts: Record<string, string[]> = {};

  return keys.map((key) => {
    if (!shuffledPrompts[key]) {
      shuffledPrompts[key] = [...suggestedPrompts[key].prompts].sort(() => Math.random() - 0.5);
    }
    return {
      title: suggestedPrompts[key].title,
      text: shuffledPrompts[key].pop() || suggestedPrompts[key].prompts[0],
    };
  });
}

interface SuggestedPromptsProps {
  onClick: (text: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [chainType] = useChainType();
  const suggestedPrompts = useMemo(() => getSuggestedPrompts(t), [t]);
  const prompts = useMemo(
    () => getRandomPrompt(chainType, suggestedPrompts),
    [chainType, suggestedPrompts]
  );
  const settings = useSettingsValue();
  const indexVaultToVectorStore = settings.indexVaultToVectorStore as VAULT_VECTOR_STORE_STRATEGY;

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Card className="tw-w-full tw-bg-transparent">
        <CardHeader className="tw-px-2">
          <CardTitle>{t("suggestedPrompts.cardTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="tw-p-2 tw-pt-0">
          <div className="tw-flex tw-flex-col tw-gap-2">
            {prompts.map((prompt, i) => (
              <div
                key={i}
                className="tw-flex tw-justify-between tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-border tw-p-2 tw-text-sm"
              >
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <div className="tw-text-muted">{prompt.title}</div>
                  <div>{prompt.text}</div>
                </div>
                <div className="tw-flex tw-h-full tw-items-start">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost2"
                        size="fit"
                        className="tw-text-muted"
                        onClick={() => onClick(prompt.text)}
                      >
                        <PlusCircle className="tw-size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("suggestedPrompts.addToChat")}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {chainType === ChainType.VAULT_QA_CHAIN && (
        <div className="tw-rounded-md tw-border tw-border-solid tw-border-border tw-p-2 tw-text-sm">
          {t("suggestedPrompts.qaVault.note")}
        </div>
      )}
      {chainType === ChainType.VAULT_QA_CHAIN &&
        indexVaultToVectorStore === VAULT_VECTOR_STORE_STRATEGY.NEVER && (
          <div className="tw-rounded-md tw-border tw-border-solid tw-border-border tw-p-2 tw-text-sm">
            <div>
              <TriangleAlert className="tw-size-4" /> {t("suggestedPrompts.indexWarning.part1")}{" "}
              <b>{t("suggestedPrompts.indexWarning.never")}</b>
              {t("suggestedPrompts.indexWarning.part2")}{" "}
              <span className="tw-text-accent">
                {t("suggestedPrompts.indexWarning.refreshButton")}
              </span>
              {t("suggestedPrompts.indexWarning.part3")}{" "}
              <span className="tw-text-accent">{t("suggestedPrompts.indexWarning.command")}</span>{" "}
              {t("suggestedPrompts.indexWarning.part4")}
            </div>
          </div>
        )}
    </div>
  );
};
