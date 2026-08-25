import { insert, newId, nowIso } from './store';
import type { SessionUser } from './types';

export function audit(
  action: string,
  actor: Pick<SessionUser, 'FULL_NAME' | 'EMAIL'> | null,
  rfaId = '',
  previousStatus = '',
  newStatus = '',
  remarks = '',
  metadata: Record<string, unknown> = {}
): void {
  insert('RFA_AUDIT', {
    LOG_ID: newId('log'),
    RFA_ID: rfaId,
    ACTOR_NAME: actor?.FULL_NAME ?? 'SYSTEM',
    ACTOR_EMAIL: actor?.EMAIL ?? '',
    ACTION: action,
    PREVIOUS_STATUS: previousStatus,
    NEW_STATUS: newStatus,
    REMARKS: remarks,
    TIMESTAMP: nowIso(),
    METADATA_JSON: JSON.stringify(metadata).slice(0, 20000)
  });
}

