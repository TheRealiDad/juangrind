// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://eljiahkgjhajsuwzhhhe.supabase.co'; // Example format
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsamlhaGtnamhhanN1d3poaGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMTcwMDcsImV4cCI6MjA0Mzg5MzAwN30.I5XZEamIwv1xB6Te-xhAZXQp9h1QTDzQPC0outnZNlo'; // Your actual anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
