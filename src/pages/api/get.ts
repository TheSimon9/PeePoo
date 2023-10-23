import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_KEY ?? '')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 86400000);

    const { data, error } = await supabase
        .from('diapers')
        .select()
        .gte("created_at", new Date(today.getFullYear(), today.getMonth(), today.getDate()).toUTCString())
        .lte("created_at", tomorrow.toUTCString())

    if(error)
        console.error("Something wrong append during get:",error)

    res.status(200).json(data)
}