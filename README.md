# SwiftLabor Front Desk

AI Front Desk & Booking Employee for HVAC businesses.

## Product goal

Turn inbound customer conversations into correctly qualified and scheduled jobs.

## MVP flow

Phone/SMS → AI conversation → qualification → availability check → appointment booking → CRM record → confirmation.

## Architecture principles

- Core agent logic lives in SwiftLabor code, not an automation platform.
- External workflow automation (n8n) is an integration layer, not the real-time voice brain.
- Never claim an appointment is booked until the booking tool confirms success.
- All business actions are tenant-scoped and auditable.
- Secrets stay server-side.

## Planned stack

- TypeScript
- Next.js dashboard
- OpenAI Realtime for voice
- Twilio Voice / Media Streams
- Supabase/Postgres
- Google Calendar
- n8n for non-real-time integrations

## Development phases

1. Agent/tool contract
2. Database schema
3. Calendar tools
4. Text agent test harness
5. Voice integration
6. Dashboard
7. SMS and missed-call recovery
8. Reliability/security testing
9. Sales demo
