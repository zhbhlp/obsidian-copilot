import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { USER_SENDER } from "@/constants";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/message";
import {
  Check,
  Copy,
  LibraryBig,
  PenSquare,
  RotateCw,
  TextCursorInput,
  Trash2,
} from "lucide-react";
import { Platform } from "obsidian";
import React from "react";
import { useTranslation } from "@/i18n";

interface ChatButtonsProps {
  message: ChatMessage;
  onCopy: () => void;
  isCopied: boolean;
  onInsertIntoEditor?: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
  onDelete: () => void;
  onShowSources?: () => void;
  hasSources: boolean;
}

export const ChatButtons: React.FC<ChatButtonsProps> = ({
  message,
  onCopy,
  isCopied,
  onInsertIntoEditor,
  onRegenerate,
  onEdit,
  onDelete,
  onShowSources,
  hasSources,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn("tw-flex tw-gap-1", {
        "group-hover:opacity-100 opacity-0": !Platform.isMobile,
      })}
    >
      {message.sender === USER_SENDER ? (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost2" size="fit" onClick={onCopy} title={t("chat.buttons.copy")}>
                {isCopied ? <Check className="tw-size-4" /> : <Copy className="tw-size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.copy")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onEdit} variant="ghost2" size="fit" title={t("chat.buttons.edit")}>
                <PenSquare className="tw-size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.edit")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onDelete}
                variant="ghost2"
                size="fit"
                title={t("chat.buttons.delete")}
              >
                <Trash2 className="tw-size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.delete")}</TooltipContent>
          </Tooltip>
        </>
      ) : (
        <>
          {hasSources && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onShowSources}
                  variant="ghost2"
                  size="fit"
                  title={t("chat.buttons.showSources")}
                >
                  <LibraryBig className="tw-size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("chat.buttons.showSources")}</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onInsertIntoEditor}
                variant="ghost2"
                size="fit"
                title={t("chat.buttons.insertAtCursor")}
              >
                <TextCursorInput className="tw-size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.insertAtCursor")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost2" size="fit" onClick={onCopy} title={t("chat.buttons.copy")}>
                {isCopied ? <Check className="tw-size-4" /> : <Copy className="tw-size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.copy")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onRegenerate}
                variant="ghost2"
                size="fit"
                title={t("chat.buttons.regenerate")}
              >
                <RotateCw className="tw-size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.regenerate")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onDelete}
                variant="ghost2"
                size="fit"
                title={t("chat.buttons.delete")}
              >
                <Trash2 className="tw-size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("chat.buttons.delete")}</TooltipContent>
          </Tooltip>
        </>
      )}
    </div>
  );
};
