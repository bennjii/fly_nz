import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vegktdnhhoifomefcsyg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTc0MTQyMSwiZXhwIjoxOTM3MzE3NDIxfQ.zd1eQPPsUcefm6stV9_btvDrO8ZBXIHZHHShC8Q7TKY"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase