# Architecture

## Runtime topology

GitHub Pages serves the React single-page application. The browser obtains a Google ID token through Google Identity Services and sends JSON requests to the Apps Script Web App. Apps Script verifies the token and resolves the registered user before every private operation. It then applies authorization and uses Google Sheets, Drive, and MailApp.

The frontend sends `Content-Type: text/plain` deliberately so the cross-origin request remains a simple POST supported by Apps Script Content Service. Responses use `{ "ok": true, "data": ... }` or `{ "ok": false, "error": { "code", "message" } }`.

## Source layout

- `frontend/src/api.ts`: API envelope, session token storage, network errors
- `frontend/src/auth.tsx`: authenticated session lifecycle
- `frontend/src/pages`: requester, approver, detail, form, and administration screens
- `apps-script/src/core.ts`: pure validation, numbering, and routing helpers
- `apps-script/src/store.ts`: guarded schema initialization and sheet record access
- `apps-script/src/auth.ts`: Google token validation and capabilities
- `apps-script/src/workflow.ts`: RFA lifecycle, routing, attachments, and access rules
- `apps-script/src/notifications.ts`: MailApp delivery and notification records
- `apps-script/src/audit.ts`: append-only audit events
- `apps-script/src/admin.ts`: user, department, and matrix configuration
- `apps-script/src/api.ts`: explicit API allow-list and request locking

The Apps Script source is TypeScript for checking and testing. `apps-script/build.mjs` bundles it into one V8-compatible `Code.js`; only explicit `globalThis` entry points become callable Apps Script functions.

## Concurrency

Every mutating API operation acquires `LockService.getScriptLock()`. This serializes numbering, workflow decisions, and row updates. RFA numbers are generated from year and sequence values in `SETTINGS` while the lock is held. Records use UUID-based stable IDs and never use sheet row numbers as identities.

## Scale

The design targets approximately 25 active users and modest institutional RFA volume. Sheet reads are batched by tab rather than performed per cell. If usage grows substantially, pagination and indexed storage should be introduced before changing the public API.

