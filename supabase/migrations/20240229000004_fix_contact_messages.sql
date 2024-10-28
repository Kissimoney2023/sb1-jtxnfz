-- Drop existing table if exists
drop table if exists public.contact_messages;

-- Create the contact_messages table with proper structure
create table public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    subject text not null,
    message text not null,
    status text not null default 'new',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Create policy to allow inserts from anyone
create policy "Anyone can create contact messages"
    on public.contact_messages
    for insert
    to public
    with check (true);

-- Create policy to allow select for authenticated users
create policy "Authenticated users can view contact messages"
    on public.contact_messages
    for select
    to authenticated
    using (true);

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant insert on public.contact_messages to anon;
grant select on public.contact_messages to authenticated;