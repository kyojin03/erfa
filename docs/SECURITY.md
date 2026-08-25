# Security

- Google Identity Services performs browser sign-in; eRFA stores no passwords.
- The frontend retains the short-lived ID token only in `sessionStorage`.
- Apps Script verifies token issuer, audience, expiration, and verified email through Google's token endpoint on every private request, with a five-minute digest-keyed cache.
- Optional `ALLOWED_DOMAIN` enforcement happens before the user lookup.
- The backend requires a registered, active `USERS` row and checks each capability.
- RFA reads are limited to the requester, current approver, prior recorded approvers, or administrators.
- Decisions require the exact current assignee and explicitly reject the requester.
- Administrative actions require `IS_ADMIN`; users cannot deactivate themselves.
- Drive file IDs are withheld from ordinary API results, folders/files remain private, and download authorization is re-evaluated.
- Mutations use a script lock, stable IDs, server timestamps, append-only approval/audit records, and explicit action allow-lists.
- No secret or private institutional dataset is committed. OAuth client IDs and deployment URLs are configuration, not secrets; credential material must never be placed in the repository.

Apps Script Web Apps should be restricted to the intended Workspace audience whenever the account edition supports it. Google Cloud OAuth authorized JavaScript origins must include the exact GitHub Pages origin and local development origin used by administrators.

