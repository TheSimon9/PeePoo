import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_KEY ?? '')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { data, error } = await supabase
        .from('breastfed')
        .select("last_breastfed")
        .eq('id', 1)

    if(error)
        console.error("Something wrong append during breastfed save:",error)

    res.status(200).json(data)
}