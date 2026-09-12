# CRM data safety

The CRM uses Supabase as the source of truth. The UI must never treat an empty response or a transient API failure as permission to erase an existing in-memory dataset.

Safety rules:
- Preserve loaded rows during transient refresh failures.
- Preserve the last known good client snapshot in localStorage for recovery/debugging.
- Only replace rows after validating a successful array response.
- Status updates are optimistic but roll back on API failure.
- Never delete CRM records as part of a refresh.
