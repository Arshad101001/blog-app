import { createClient } from "@supabase/supabase-js";


export const supabase  = createClient(
    "https://dtjhcnalfxwzughezjwr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0amhjbmFsZnh3enVnaGV6andyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjE5NDgsImV4cCI6MjA3MDMzNzk0OH0.DEe5rT3XIytR86fmCy0kRlPbVCGh6onOkQbnoecCBRc"
);