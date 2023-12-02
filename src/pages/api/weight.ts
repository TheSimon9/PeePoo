import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_KEY ?? '')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { data, error } = await supabase
            .from('weight')
            .insert({ weight: req.body.weight, datetime: req.body.date })
            .select()

        if(error)
            console.error("Something wrong append during breastfed save:",error)

        return res.status(200).json(data)
    }

    if(req.method === 'GET'){
        const { data, error } = await supabase
            .from('weight')
            .select()
            .order("datetime", { ascending: false })

        if(error)
            console.error("Something wrong append during get:",error)

        res.status(200).json(data)
    }

    return res.status(501)
}