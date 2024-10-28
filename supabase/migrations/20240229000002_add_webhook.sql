-- Create webhook for contact messages
create trigger "contact_message_webhook"
after insert on "public"."contact_messages"
for each row
execute function "supabase_functions"."http_request"(
  'https://api.example.com/webhooks/contact', -- Replace with your actual webhook URL
  'POST',
  '{"Content-Type":"application/json"}',
  json_build_object(
    'type', 'INSERT',
    'table', 'contact_messages',
    'schema', 'public',
    'record', row_to_json(NEW)
  )::text,
  '1000'
);