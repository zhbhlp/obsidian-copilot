/**
 * 国际化常量定义
 */

/** 支持的语言类型 */
export type SupportedLocale = "en" | "zh";

/** 支持的语言列表 */
export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "zh"];

/** 默认语言 */
export const DEFAULT_LOCALE: SupportedLocale = "en";

/** 语言显示名称 */
export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: "English",
  zh: "中文",
};

/** 语言存储键名 */
export const LOCALE_STORAGE_KEY = "copilot-locale";
