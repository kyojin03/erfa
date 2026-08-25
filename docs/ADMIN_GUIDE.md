# Administrator Guide

## Initial setup

Run `setupDatabase()` and then the one-time `bootstrapAdmin(realEmail, realName)` function from the Apps Script editor. This deliberate step avoids inventing an administrator. Set the OAuth client ID, frontend URL, and optional Workspace domain in `SETTINGS` before sign-in.

## Configuration order

1. Add active departments with unique names and codes.
2. Add users with their real Google email, department, position, capabilities, and active state.
3. Ensure every intended approver has `CAN_APPROVE_RFA`.
4. Add approval matrix entries per department in step/sequence order.
5. Use a real requester and approver to run the acceptance scenarios in `docs/TESTING.md`.

Requester and approver are capabilities, not exclusive roles. An approver may also create RFAs. eRFA skips that person if the same account submits an RFA that would otherwise route to itself.

Deactivate obsolete users, departments, or matrix routes instead of deleting spreadsheet rows. Historical RFAs continue to show the identities copied at the time of action.

The **System Logs** tab shows recent audit events and notification delivery results. `FAILED` contains the MailApp error; `PENDING` indicates email was disabled in settings. Correct the cause before manually retriggering a workflow event—do not edit a notification record to claim delivery.

