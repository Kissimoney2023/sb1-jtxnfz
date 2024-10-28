-- Drop existing table if it exists
drop table if exists public.contact_messages;

-- Create the contact_messages table with proper constraints
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null check (char_length(name) >= 1),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  subject text not null check (char_length(subject) >= 1),
  message text not null check (char_length(message) >= 1),
  status text not null default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_contact_messages_updated_at
  before update on public.contact_messages
  for each row
  execute function update_updated_at_column();

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Create policies
create policy "Enable insert access for all users"
  on public.contact_messages for insert
  to public
  with check (true);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.contact_messages to anon, authenticated;