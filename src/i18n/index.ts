/**
 * 国际化系统主入口
 */
import { getDefaultStore } from "jotai";
import { getTranslation } from "./useTranslation";
import { localeAtom } from "./store";

// 导出常量和类型
export * from "./constants";

// 导出状态管理
export * from "./store";

// 导出翻译内容
export * from "./locales";

// 导出Hook
export * from "./useTranslation";

/**
 * 翻译函数（非Hook，可在组件外使用）
 * 用于在非React组件中使用翻译
 */
export function t(key: string, params?: Record<string, string | number>): string {
  const store = getDefaultStore();
  const locale = store.get(localeAtom);
  return getTranslation(locale, key, params);
}
