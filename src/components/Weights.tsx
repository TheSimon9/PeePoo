import React from "react";
import WeightRow from "./WeightRow";

type WeightsProps = {
    weights: WeightRow[]
}

export type WeightRow = {
    weight: number,
    datetime: Date,
}

type WeightWithDiff = WeightRow & {
    diff: number
}

export default function Weights({weights}:WeightsProps){
    let lastWeight = 0;
    const weightsWithDiff = weights
        .sort((a,b)=> a.datetime < b.datetime ? -1 : 1)
        .map((d):WeightWithDiff => {
            const diff = d.weight-lastWeight;
            lastWeight = d.weight;

            return {
                weight: d.weight,
                datetime: d.datetime,
                diff: diff
            }
        })
        .sort((a,b)=> a.datetime < b.datetime ? 1 : -1)

    return <table className="w-full max-w-xl border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Week</th>
            <th scope="col" className="px-2 py-4 font-medium text-gray-900">Weight</th>
            <th scope="col" className="px-2 py-4 font-medium text-gray-900">Diff.</th>
            <th scope="col" className="px-3 py-4 font-medium text-gray-900">Date</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {weightsWithDiff.map(d => {
            return (<WeightRow key={d?.datetime?.toISOString()} diff={d.diff} datetime={d.datetime} weight={d.weight}/>);
        })}
        </tbody>
    </table>
}