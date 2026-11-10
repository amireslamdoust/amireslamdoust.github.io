import { describe, expect, it } from 'vitest';
import {
  assertPublicSafeCopy,
  findForbiddenProductName,
} from '@domain/policies/forbidden-content';

describe('forbidden content policy', () => {
  it('detects private product names', () => {
    expect(findForbiddenProductName('built Togethina once')).toBe('togethina');
  });

  it('allows verified public copy', () => {
    expect(() =>
      assertPublicSafeCopy(
        'Built a SaaS product with Stripe payments',
        'test',
      ),
    ).not.toThrow();
  });

  it('rejects phone numbers', () => {
    expect(() => assertPublicSafeCopy('Call +49 172 0000000', 'test')).toThrow(
      /credential/i,
    );
  });
});
