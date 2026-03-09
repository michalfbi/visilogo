import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Environment Variables')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Destructure new automotive fields
    const { 
      name, 
      email, 
      phone,
      business_type,
      location,
      inventory_size,
      budget_range,
      vehicle_focus,
      message 
    } = await req.json()

    // 1. Validation
    if (!name || !email || !phone || !business_type || !inventory_size) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. Insert into Database
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          phone,
          business_type,
          location,
          inventory_size,
          budget_range,
          vehicle_focus,
          message,
          source: 'visilogo_auto_site',
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase Insert Error:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ message: 'Lead submitted successfully', data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge Function Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
