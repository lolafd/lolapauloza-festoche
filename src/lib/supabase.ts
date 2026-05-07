import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://swsdacpfnuyhbhkbopmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3c2RhY3BmbnV5aGJoa2JvcG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNTE0ODMsImV4cCI6MjA5MzcyNzQ4M30.KQD735o1cmdJdzgGLu2gV8coRc41IlfEYsMdhGFQrfE'
)
