/**
 * A tiny ICU-MessageFormat subset: plain {var} interpolation and
 * {var, plural, =N {...} one {...} other {...}} pluralization.
 * Covers exactly what this app's message catalogs use, without pulling in
 * a full ICU library for two supported locales.
 */

type Values = Record<string, string | number>;

const PLURAL_BLOCK = /\{(\w+),\s*plural,\s*((?:=\d+\s*\{[^{}]*\}\s*|\w+\s*\{[^{}]*\}\s*)+)\}/g;
const PLURAL_OPTION = /(=\d+|\w+)\s*\{([^{}]*)\}/g;
const SIMPLE_VAR = /\{(\w+)\}/g;

export function formatMessage(template: string, locale: string, values: Values = {}): string {
  const pluralRules = new Intl.PluralRules(locale);

  let result = template.replace(PLURAL_BLOCK, (_match, varName: string, body: string) => {
    const raw = values[varName];
    const n = typeof raw === "number" ? raw : Number(raw ?? 0);

    const options = new Map<string, string>();
    let optMatch: RegExpExecArray | null;
    PLURAL_OPTION.lastIndex = 0;
    while ((optMatch = PLURAL_OPTION.exec(body)) !== null) {
      options.set(optMatch[1]!, optMatch[2]!);
    }

    const exact = options.get(`=${n}`);
    if (exact !== undefined) return exact.replace("#", String(n));

    const category = pluralRules.select(n);
    const byCategory = options.get(category) ?? options.get("other") ?? "";
    return byCategory.replace("#", String(n));
  });

  result = result.replace(SIMPLE_VAR, (_match, varName: string) => {
    const v = values[varName];
    return v === undefined ? "" : String(v);
  });

  return result;
}
