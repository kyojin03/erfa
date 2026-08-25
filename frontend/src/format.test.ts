import { describe, expect, it } from 'vitest';
import { statusLabel, stepLabel } from './format';

describe('display formatting', () => {
  it('uses recognizable institutional status terminology', () => {
    expect(statusLabel('PENDING_REVIEW')).toBe('Reviewed & Noted');
    expect(stepLabel('APPROVED_BY')).toBe('Approved By');
  });
});

