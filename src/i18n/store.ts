/**
 * 国际化状态管理
 */
import { atom } from "jotai";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, SupportedLocale } from "./constants";

/**
 * 从本地存储获取保存的语言设置
 */
function getStoredLocale(): SupportedLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "zh") {
      return stored;
    }
  } catch {
    // 忽略存储错误，使用默认语言
  }
  return DEFAULT_LOCALE;
}

/**
 * 保存语言设置到本地存储
 */
function saveLocale(locale: SupportedLocale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // 忽略存储错误
  }
}

/** 当前语言原子状态 */
export const localeAtom = atom<SupportedLocale>(getStoredLocale());

/** 语言切换操作原子 */
export const setLocaleAtom = atom(null, (get, set, newLocale: SupportedLocale) => {
  set(localeAtom, newLocale);
  saveLocale(newLocale);
});
