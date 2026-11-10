/** Strings that must never appear in published portfolio source or rendered copy. */
export const FORBIDDEN_PRODUCT_NAMES = [
  "let's join",
  'lets join',
  'togethina',
  'partyro',
] as const;

export const FORBIDDEN_CREDENTIAL_PATTERNS = [
  /tel:/i,
  /\+49\s*\d/,
  /\bmsc\b/i,
  /\bm\.sc\b/i,
  /master of science/i,
] as const;

export function findForbiddenProductName(text: string): string | undefined {
  const lower = text.toLowerCase();
  return FORBIDDEN_PRODUCT_NAMES.find((name) => lower.includes(name));
}

export function findForbiddenCredentialPattern(
  text: string,
): RegExp | undefined {
  return FORBIDDEN_CREDENTIAL_PATTERNS.find((pattern) => pattern.test(text));
}

export function assertPublicSafeCopy(text: string, context: string): void {
  const product = findForbiddenProductName(text);
  if (product) {
    throw new Error(`Forbidden product name "${product}" in ${context}`);
  }
  const credential = findForbiddenCredentialPattern(text);
  if (credential) {
    throw new Error(`Forbidden credential pattern ${credential} in ${context}`);
  }
}
