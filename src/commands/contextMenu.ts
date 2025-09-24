import { getCommandId, sortCommandsByOrder } from "@/commands/customCommandUtils";
import { getCachedCustomCommands } from "@/commands/state";
import { COMMAND_IDS } from "@/constants";
import { getTranslation } from "@/i18n/useTranslation";
import { localeAtom } from "@/i18n/store";
import { getDefaultStore } from "jotai";
import { Menu } from "obsidian";
import { CustomCommand } from "./type";

export function registerContextMenu(menu: Menu) {
  const store = getDefaultStore();
  const locale = store.get(localeAtom);
  const t = (key: string) => getTranslation(locale, key);

  // Create the main "Copilot" submenu
  menu.addItem((item) => {
    item.setTitle(t("contextMenu.copilot.title"));
    (item as any).setSubmenu();

    const submenu = (item as any).submenu;
    if (!submenu) return;

    // Add the main selection command
    submenu.addItem((subItem: any) => {
      subItem.setTitle(t("contextMenu.addSelection.title")).onClick(() => {
        (app as any).commands.executeCommandById(
          `copilot:${COMMAND_IDS.ADD_SELECTION_TO_CHAT_CONTEXT}`
        );
      });
    });

    submenu.addItem((subItem: any) => {
      subItem.setTitle(t("contextMenu.quickCommand.title")).onClick(() => {
        (app as any).commands.executeCommandById(`copilot:${COMMAND_IDS.TRIGGER_QUICK_COMMAND}`);
      });
    });

    // Get custom commands
    const commands = getCachedCustomCommands();
    const visibleCustomCommands = commands.filter(
      (command: CustomCommand) => command.showInContextMenu
    );

    // Add separator if there are custom commands
    if (visibleCustomCommands.length > 0) {
      submenu.addSeparator();
    }

    // Add custom commands to submenu
    sortCommandsByOrder(visibleCustomCommands).forEach((command: CustomCommand) => {
      submenu.addItem((subItem: any) => {
        subItem.setTitle(command.title).onClick(() => {
          (app as any).commands.executeCommandById(`copilot:${getCommandId(command.title)}`);
        });
      });
    });
  });
}
