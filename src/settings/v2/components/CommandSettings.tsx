import React, { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useCustomCommands } from "@/commands/state";
import { MobileCard, MobileCardDropdownAction } from "@/components/ui/mobile-card";
import { Copy, GripVertical, Lightbulb, PenLine, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/lib/utils";
import { updateSetting, useSettingsValue } from "@/settings/model";
import { PromptSortStrategy } from "@/types";
import { HelpTooltip } from "@/components/ui/help-tooltip";
import { EMPTY_COMMAND } from "@/commands/constants";
import { CustomCommandManager } from "@/commands/customCommandManager";
import { CustomCommandSettingsModal } from "@/commands/CustomCommandSettingsModal";
import {
  generateCopyCommandName,
  loadAllCustomCommands,
  sortCommandsByOrder,
} from "@/commands/customCommandUtils";
import { generateDefaultCommands } from "@/commands/migrator";
import { CustomCommand } from "@/commands/type";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { SettingItem } from "@/components/ui/setting-item";
import { Notice } from "obsidian";

const MobileCommandCard: React.FC<{
  command: CustomCommand;
  commands: CustomCommand[];
  onUpdate: (newCommand: CustomCommand, prevCommandTitle: string) => void;
  onRemove: (command: CustomCommand) => void;
  onCopy: (command: CustomCommand) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}> = ({ command, commands, onUpdate, onRemove, onCopy, containerRef }) => {
  const { t } = useTranslation();
  const handleEdit = (cmd: CustomCommand) => {
    const modal = new CustomCommandSettingsModal(app, commands, cmd, async (updatedCommand) => {
      await onUpdate(updatedCommand, cmd.title);
    });
    modal.open();
  };

  const dropdownActions: MobileCardDropdownAction<CustomCommand>[] = [
    {
      icon: <PenLine className="tw-size-4" />,
      label: t("common.buttons.edit"),
      onClick: handleEdit,
    },
    {
      icon: <Copy className="tw-size-4" />,
      label: t("common.buttons.copy"),
      onClick: onCopy,
    },
    {
      icon: <Trash2 className="tw-size-4" />,
      label: t("common.buttons.delete"),
      onClick: (cmd) => {
        new ConfirmModal(
          app,
          () => onRemove(cmd),
          t("commands.settings.messages.commandDeleteConfirm", { title: cmd.title }),
          t("commands.settings.messages.commandDeleteTitle"),
          t("common.buttons.delete"),
          t("common.buttons.cancel")
        ).open();
      },
      variant: "destructive",
    },
  ];

  const expandedContent = (
    <div className="tw-flex tw-flex-wrap tw-justify-around">
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
        <div className="tw-flex tw-items-center tw-gap-1">
          <span className="tw-text-sm tw-font-medium">{t("commands.settings.labels.inMenu")}</span>
          <HelpTooltip
            content={
              <div className="tw-max-w-xs tw-text-xs">
                {t("commands.settings.tooltips.inMenuHelp")}
              </div>
            }
          />
        </div>
        <Checkbox
          checked={command.showInContextMenu}
          onCheckedChange={(checked) => {
            onUpdate(
              {
                ...command,
                showInContextMenu: checked === true,
              },
              command.title
            );
          }}
        />
      </div>
      <div className="tw-flex tw-items-center tw-justify-between  tw-gap-2">
        <div className="tw-flex tw-items-center tw-gap-1">
          <span className="tw-text-sm tw-font-medium">{t("commands.settings.labels.inSlash")}</span>
          <HelpTooltip
            content={
              <div className="tw-max-w-xs tw-text-xs">
                {t("commands.settings.tooltips.inSlashHelp")}
              </div>
            }
          />
        </div>
        <Checkbox
          checked={command.showInSlashMenu}
          onCheckedChange={(checked) =>
            onUpdate(
              {
                ...command,
                showInSlashMenu: checked === true,
              },
              command.title
            )
          }
        />
      </div>
    </div>
  );

  return (
    <MobileCard
      id={command.title}
      item={command}
      title={command.title}
      isDraggable
      isExpandable
      expandedContent={expandedContent}
      primaryAction={{
        icon: <PenLine className="tw-size-4" />,
        onClick: handleEdit,
        tooltip: t("commands.settings.tooltips.editCommand"),
      }}
      dropdownActions={dropdownActions}
      containerRef={containerRef}
    />
  );
};

const SortableTableRow: React.FC<{
  command: CustomCommand;
  commands: CustomCommand[];
  onUpdate: (newCommand: CustomCommand, prevCommandTitle: string) => void;
  onRemove: (command: CustomCommand) => void;
  onCopy: (command: CustomCommand) => void;
}> = ({ command, commands, onUpdate, onRemove, onCopy }) => {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: command.title,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    onRemove(command);
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(
        "tw-transition-colors",
        isDragging &&
          "tw-relative tw-z-[100] tw-cursor-grabbing tw-shadow-lg tw-backdrop-blur-sm tw-border-accent/50"
      )}
    >
      <TableCell className="tw-w-10">
        <div
          {...attributes}
          {...listeners}
          className="tw-flex tw-cursor-grab tw-items-center tw-justify-center"
        >
          <GripVertical className="tw-size-4" />
        </div>
      </TableCell>
      <TableCell>{command.title}</TableCell>
      <TableCell className="tw-text-center">
        <Checkbox
          checked={command.showInContextMenu}
          onCheckedChange={(checked) => {
            onUpdate(
              {
                ...command,
                showInContextMenu: checked === true,
              },
              command.title
            );
          }}
          className="tw-mx-auto"
        />
      </TableCell>
      <TableCell className="tw-text-center">
        <Checkbox
          checked={command.showInSlashMenu}
          onCheckedChange={(checked) =>
            onUpdate(
              {
                ...command,
                showInSlashMenu: checked === true,
              },
              command.title
            )
          }
          className="tw-mx-auto"
        />
      </TableCell>
      <TableCell className="tw-text-center">
        <div className="tw-flex tw-justify-center tw-space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const modal = new CustomCommandSettingsModal(
                app,
                commands,
                command,
                async (updatedCommand) => {
                  await onUpdate(updatedCommand, command.title);
                }
              );
              modal.open();
            }}
          >
            <PenLine className="tw-size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCopy(command)}
            title={t("commands.settings.tooltips.copyCommand")}
          >
            <Copy className="tw-size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              new ConfirmModal(
                app,
                handleDelete,
                t("commands.settings.messages.commandDeleteConfirm", { title: command.title }),
                t("commands.settings.messages.commandDeleteTitle"),
                t("common.buttons.delete"),
                t("common.buttons.cancel")
              ).open();
            }}
          >
            <Trash2 className="tw-size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const CommandSettings: React.FC = () => {
  const { t } = useTranslation();
  const rawCommands = useCustomCommands();
  const commands = useMemo(() => {
    return sortCommandsByOrder([...rawCommands]);
  }, [rawCommands]);

  const settings = useSettingsValue();
  const containerRef = useRef<HTMLDivElement>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleUpdate = async (newCommand: CustomCommand, prevCommandTitle: string) => {
    await CustomCommandManager.getInstance().updateCommand(newCommand, prevCommandTitle);
  };

  const handleCreate = async (newCommand: CustomCommand) => {
    await CustomCommandManager.getInstance().createCommand(newCommand);
  };

  const handleRemove = async (command: CustomCommand) => {
    try {
      await CustomCommandManager.getInstance().deleteCommand(command);

      new Notice(t("commands.settings.messages.commandDeleteSuccess", { title: command.title }));
    } catch (error) {
      console.error("Failed to delete command:", error);
      new Notice(t("commands.settings.messages.commandDeleteFailed"));
      throw error;
    }
  };

  const handleCopy = async (command: CustomCommand) => {
    try {
      const copyName = generateCopyCommandName(command.title, commands);
      const copiedCommand: CustomCommand = {
        ...command,
        title: copyName,
      };
      await CustomCommandManager.getInstance().createCommand(copiedCommand, {
        // Explicitly make the new command the same order as the original command
        // so it appears next to the original command in the menu. The extra
        // suffix will ensure it is below the original command in the menu.
        autoOrder: false,
      });
    } catch (error) {
      console.error("Failed to copy command:", error);
      new Notice(t("commands.settings.messages.commandCopyFailed"));
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeIndex = commands.findIndex((command) => command.title === active.id);
    const overIndex = commands.findIndex((command) => command.title === over.id);

    if (activeIndex === -1 || overIndex === -1) {
      return;
    }

    // Create new order
    const newCommands = [...commands];
    const [movedCommand] = newCommands.splice(activeIndex, 1);
    newCommands.splice(overIndex, 0, movedCommand);

    await CustomCommandManager.getInstance().reorderCommands(newCommands);
  };

  // Mobile view rendering
  const renderMobileView = () => (
    <div className="tw-relative md:tw-hidden">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={commands.map((command) => command.title)}
          strategy={verticalListSortingStrategy}
        >
          <div className="tw-space-y-2">
            {commands.length === 0 ? (
              <div className="tw-rounded-lg tw-border tw-border-border tw-bg-primary tw-p-8 tw-text-center tw-text-muted">
                {t("commands.settings.messages.noCustomPromptFiles")}
              </div>
            ) : (
              commands.map((command) => (
                <MobileCommandCard
                  key={command.title}
                  command={command}
                  commands={commands}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                  onCopy={handleCopy}
                  containerRef={containerRef}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );

  return (
    <div className="tw-space-y-4" ref={containerRef}>
      <section>
        <div className="tw-mb-4 tw-flex tw-flex-col tw-gap-2">
          <div className="tw-text-xl tw-font-bold">{t("commands.settings.title")}</div>
          <div className="tw-text-sm tw-text-muted">{t("commands.settings.description")}</div>
        </div>

        <SettingItem
          type="text"
          title={t("commands.settings.customPromptsFolder.title")}
          description={t("commands.settings.customPromptsFolder.description")}
          value={settings.customPromptsFolder}
          onChange={(value) => {
            updateSetting("customPromptsFolder", value);
            loadAllCustomCommands();
          }}
          placeholder="copilot/copilot-custom-prompts"
        />
        <SettingItem
          type="switch"
          title={t("commands.settings.customPromptTemplating.title")}
          description={t("commands.settings.customPromptTemplating.description")}
          checked={settings.enableCustomPromptTemplating}
          onCheckedChange={(checked) => {
            updateSetting("enableCustomPromptTemplating", checked);
          }}
        />
        <SettingItem
          type="select"
          title={t("commands.settings.sortStrategy.title")}
          description={t("commands.settings.sortStrategy.description")}
          value={settings.promptSortStrategy}
          onChange={(value) => updateSetting("promptSortStrategy", value)}
          options={[
            {
              label: t("commands.settings.sortOptions.recency"),
              value: PromptSortStrategy.TIMESTAMP,
            },
            {
              label: t("commands.settings.sortOptions.alphabetical"),
              value: PromptSortStrategy.ALPHABETICAL,
            },
            { label: t("commands.settings.sortOptions.manual"), value: PromptSortStrategy.MANUAL },
          ]}
        />

        <div className="tw-mb-4 tw-flex tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-border tw-p-4 tw-text-muted">
          <Lightbulb className="tw-size-5" />{" "}
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: t("commands.settings.infoMessage", {
                  folder: `<strong>${settings.customPromptsFolder}</strong>`,
                }),
              }}
            />
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-w-full tw-justify-between tw-gap-2 md:tw-justify-end">
            <div>
              <Button
                variant="secondary"
                onClick={() =>
                  new ConfirmModal(
                    app,
                    generateDefaultCommands,
                    t("commands.settings.messages.generateDefaultConfirm"),
                    t("commands.settings.messages.generateDefaultTitle")
                  ).open()
                }
              >
                {t("commands.settings.buttons.generateDefault")}
              </Button>
            </div>
            <Button
              variant="default"
              className="tw-gap-2"
              onClick={() => {
                const newCommand: CustomCommand = {
                  ...EMPTY_COMMAND,
                };
                const modal = new CustomCommandSettingsModal(
                  app,
                  commands,
                  newCommand,
                  async (updatedCommand) => {
                    await handleCreate(updatedCommand);
                  }
                );
                modal.open();
              }}
            >
              <Plus className="tw-size-2 md:tw-size-4" />
              {t("commands.settings.buttons.addCmd")}
            </Button>
          </div>

          {/* Desktop view */}
          <div className="tw-hidden md:tw-block">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="tw-w-10"></TableHead>
                    <TableHead>{t("commands.settings.labels.name")}</TableHead>
                    <TableHead className="tw-w-24 tw-text-center">
                      <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                        {t("commands.settings.labels.inMenu")}
                        <HelpTooltip
                          content={
                            <div className="tw-max-w-xs tw-text-xs">
                              {t("commands.settings.tooltips.inMenuHelp")}
                            </div>
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="tw-w-28 tw-text-center">
                      <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                        {t("commands.settings.labels.slashCmd")}
                        <HelpTooltip
                          content={
                            <div className="tw-max-w-xs tw-text-xs">
                              {t("commands.settings.tooltips.inSlashHelp")}
                            </div>
                          }
                        />
                      </div>
                    </TableHead>
                    <TableHead className="tw-w-32 tw-text-center">
                      {t("commands.settings.labels.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <SortableContext
                  items={commands.map((command) => command.title)}
                  strategy={verticalListSortingStrategy}
                >
                  <TableBody>
                    {commands.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="tw-py-8 tw-text-center tw-text-muted">
                          {t("commands.settings.messages.noCustomPromptFiles")}
                        </TableCell>
                      </TableRow>
                    ) : (
                      commands.map((command) => (
                        <SortableTableRow
                          key={command.title}
                          command={command}
                          commands={commands}
                          onUpdate={handleUpdate}
                          onRemove={handleRemove}
                          onCopy={handleCopy}
                        />
                      ))
                    )}
                  </TableBody>
                </SortableContext>
              </Table>
            </DndContext>
          </div>

          {/* Mobile view */}
          {renderMobileView()}
        </div>
      </section>
    </div>
  );
};
