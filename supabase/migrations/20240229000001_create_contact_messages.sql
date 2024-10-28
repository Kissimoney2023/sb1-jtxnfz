create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  user_id uuid references auth.users(id),
  status text not null default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Allow anyone to insert messages
create policy "Allow anyone to insert messages"
  on public.contact_messages
  for insert
  to public
  with check (true);

-- Allow users to view their own messages
create policy "Allow users to view own messages"
  on public.contact_messages
  for select
  to authenticated
  using (user_id = auth.uid());

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.contact_messages to anon, authenticated;