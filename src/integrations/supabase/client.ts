// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yzpdsmpwdzvyxlxuawib.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cGRzbXB3ZHp2eXhseHVhd2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDgzMTEsImV4cCI6MjA1OTg4NDMxMX0.ktNeruhySQ8L2d0vOkK0SMNWm9baFQioN2kt4v-dcaA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);