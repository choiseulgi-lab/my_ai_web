import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pokiecppwaaabheuanae.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBva2llY3Bwd2FhYWJoZXVhbmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTc2MTQsImV4cCI6MjA5NjQzMzYxNH0.ISuP53MFCMdSH_tLe4o-yZIVyff7DLVWpr5oKRmeVCA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
