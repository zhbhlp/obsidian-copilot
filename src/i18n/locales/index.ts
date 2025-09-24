/**
 * 翻译文件导出
 */
import { en } from "./en";
import { zh } from "./zh";
import { SupportedLocale } from "../constants";

export type TranslationKeys = typeof en;

export const translations: Record<SupportedLocale, any> = {
  en,
  zh,
};

export { en, zh };
