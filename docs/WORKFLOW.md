# Workflow

## Primary path

1. An authenticated user with `CAN_CREATE_RFA` saves a draft. eRFA assigns a locked, unique number such as `RFA-2026-0001`.
2. Submission validates all institutional form fields and records `PREPARED_BY` electronically.
3. The router reads the active department matrix in institutional step and sequence order.
4. The assigned approver receives real email and sees the RFA under **For My Action**.
5. Approval is appended to history; the next route is assigned and emailed.
6. After the final configured route approves, status becomes `APPROVED` and the requester is notified.
7. The requester or an administrator can move the RFA to `IMPLEMENTATION`, then `CLOSED` for audit filing.

## Self-approval and invalid routes

The router compares the requester email with each candidate's registered email. A self-conflicting, missing, inactive, or unauthorized candidate is recorded as `SKIPPED`. The next valid matrix entry is selected without silently approving the skipped step. When configured rows remain but none is valid, the RFA becomes `EXCEPTION`, the problem is audited, and active administrators receive a notification attempt.

## Return and resubmission

Return requires remarks, records the returning step and matrix ID, clears the active assignment, and emails the requester. The requester may edit institutional request fields and attachments. Resubmission resumes at the returning route if it remains valid, then continues normally.

## Disapproval

Disapproval requires remarks, records the final decision, clears the current assignment, and emails the requester. It does not erase prior approval or audit history.

