create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text not null default 'America/Chicago',
  service_area text not null default '',
  business_hours text not null default '',
  emergency_policy text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, phone)
);

create table if not exists calls (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  provider_call_id text,
  status text not null default 'in_progress',
  duration_seconds integer,
  transcript text,
  summary text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  service_type text not null,
  issue_summary text not null,
  urgency text not null default 'normal',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  calendar_event_id text,
  service_type text not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'booked',
  created_at timestamptz not null default now()
);

create table if not exists agent_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  call_id uuid references calls(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists calls_org_started_idx on calls(organization_id, started_at desc);
create index if not exists leads_org_created_idx on leads(organization_id, created_at desc);
create index if not exists appointments_org_start_idx on appointments(organization_id, start_time);
create index if not exists events_call_created_idx on agent_events(call_id, created_at);
