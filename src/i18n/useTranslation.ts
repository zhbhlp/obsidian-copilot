/**
 * useTranslation Hook
 * 提供翻译功能和语言切换
 */
import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { localeAtom, setLocaleAtom } from "./store";
import { translations } from "./locales";
import { SupportedLocale } from "./constants";

/**
 * 深度获取嵌套对象的值
 * @param obj 对象
 * @param path 路径，如 'chat.buttons.copy'
 * @returns 翻译文本或原始路径
 */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      // 如果路径不存在，返回原始路径作为后备
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

/**
 * 翻译函数类型
 */
export type TranslationFunction = (key: string, params?: Record<string, string | number>) => string;

/**
 * useTranslation Hook
 * @returns 翻译相关的函数和状态
 */
export function useTranslation() {
  const locale = useAtomValue(localeAtom);
  const setLocale = useSetAtom(setLocaleAtom);

  const currentTranslations = useMemo(() => {
    return translations[locale];
  }, [locale]);

  /**
   * 翻译函数
   * @param key 翻译键，支持嵌套路径如 'chat.buttons.copy'
   * @param params 参数替换对象，用于字符串插值
   * @returns 翻译后的文本
   */
  const t: TranslationFunction = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      let text = getNestedValue(currentTranslations, key);

      // 参数替换
      if (params && typeof text === "string") {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
        });
      }

      return text;
    };
  }, [currentTranslations]);

  return {
    /** 当前语言 */
    locale,
    /** 切换语言 */
    setLocale,
    /** 翻译函数 */
    t,
    /** 当前翻译对象（用于类型安全访问） */
    translations: currentTranslations,
  };
}

/**
 * 获取翻译文本的工具函数（非Hook，可在组件外使用）
 * @param locale 语言
 * @param key 翻译键
 * @param params 参数对象
 * @returns 翻译文本
 */
export function getTranslation(
  locale: SupportedLocale,
  key: string,
  params?: Record<string, string | number>
): string {
  const translation = translations[locale];
  let text = getNestedValue(translation, key);

  // 参数替换
  if (params && typeof text === "string") {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
    });
  }

  return text;
}
