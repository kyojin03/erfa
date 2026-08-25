# Testing

## Automated checks

`pnpm check` performs TypeScript checking, ESLint, Vitest, the production frontend build, and the Apps Script bundle. Pure tests cover numbering format, form validation, route ordering, invalid approver skipping, and self-approval prevention.

## Workspace acceptance

Google authorization and delivery require a configured Workspace environment, so complete these tests after deployment using real administrator-provided test accounts:

1. **Primary flow:** requester signs in, creates and saves a draft, uploads a private attachment, submits, and confirms the first approver receives email. Each approver opens the secure link and approves. Confirm next-approver emails, final requester email, `APPROVED` status, approval rows, audit rows, and `SENT` notification rows.
2. **Self-approval:** configure an approver who can create. That user submits in their department. Confirm the conflicting route is `SKIPPED`, the user never sees their own RFA under **For My Action**, and the next valid approver receives it.
3. **Return:** approver returns with remarks. Confirm requester email, editable `RETURNED` state, preserved history, resubmission, and reassignment to the returning matrix route.
4. **Disapproval:** confirm remarks are mandatory, the status is terminal, and prior history remains.
5. **Authorization:** try an unregistered account, inactive account, non-admin admin action, unrelated RFA ID, and non-assignee decision. Confirm each is denied and audited where applicable.
6. **Attachments:** test every allowed type, an invalid type, an oversized file, requester access, prior approver access, and unrelated-user denial.
7. **Concurrency:** submit two newly created RFAs from separate sessions at nearly the same time; confirm unique numbers and no lost workflow assignment.
8. **Closeout:** move a final-approved request to implementation and closed; confirm requester notification and printable approval wording.

Compilation cannot validate Workspace authorization, OAuth origin configuration, Sheets/Drive ownership rules, or actual mail delivery. Those acceptance checks are required before production launch.
