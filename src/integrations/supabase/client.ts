// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qpobiantyoxxdbkbzelx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb2JpYW50eW94eGRia2J6ZWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MTI2OTUsImV4cCI6MjA2NTM4ODY5NX0.zfK4KxWL3xMHYqiTiVtPlGW7LrNjt_47Sr9iuu1785U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);