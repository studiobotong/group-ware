// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcxqakcpkbfqqoxpwlsf.supabase.co';  // Supabase 프로젝트 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjeHFha2Nwa2JmcXFveHB3bHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDkxMzUsImV4cCI6MjA1OTc4NTEzNX0.rw5y9kVGWNArWkiObLGdwKPeog62rk1NzHak0as0wv0';  // Supabase 공개 키 (정확히 복사)

export const supabase = createClient(supabaseUrl, supabaseKey);