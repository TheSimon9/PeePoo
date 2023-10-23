import React from "react";
import DiaperRow from "@/components/DiaperRow";

type DiapersProps = {
    diapers: Diaper[]
}

export type Diaper = {
    pee: boolean,
    poo: boolean,
    created_at: Date
}

export default function Diapers({diapers}:DiapersProps){

    return <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Date</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">💩</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">💦</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {diapers.map(d => (<DiaperRow key={d.created_at.toUTCString()} pee={d.pee} poo={d.poo} date={d.created_at}/>))}
            </tbody>
        </table>
}