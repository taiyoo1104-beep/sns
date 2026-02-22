import { createClient } from '@supabase/supabase-js'

// Supabaseの管理画面（Project Settings > API）からコピーしてください
const supabaseUrl = 'https://rdtalibeklmrfhmijohj.supabase.co' 
const supabaseAnonKey = 'sb_publishable_1B20mc1ScamucN-krZspaA_79wfP8NV'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)