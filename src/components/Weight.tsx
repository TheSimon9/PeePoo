import {useEffect, useState} from "react";
import Weights, {WeightRow} from "@/components/Weights";

async function onTrackWeight(weight: number, date: Date) {
    await fetch('/api/weight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            weight: weight,
            date: date
        })
    }).then(res => res.json())
        .then(a => console.log(a))
}

function fetchWeights(setWeights: (prev: WeightRow[]) => void) {
    fetch('/api/weight', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => res.json())
        .then((weights) => {
            setWeights(weights.map((d: WeightRow) => ({
                weight: d.weight,
                datetime: new Date(d.datetime)
            })));
        })
}

export default function Weight(){
    const [weightDate, setWeightDate] = useState<Date>(new Date())
    const [weight, setWeight] = useState<number>(0)
    const [weights, setWeights] = useState<WeightRow[]>([])

    useEffect(() => {
        fetchWeights(setWeights);
    }, []);

    return <div className="w-full max-w-xl">
        <div className="max-w-xl py-8">
            <h2 className="text-lg font-bold tracking-tight text-white">Weight</h2>
            <p className="mt-4 pb-4 text-lg leading-8 text-gray-300">{"Track weight over weeks"}</p>
            <div className={"flex justify-between flex-wrap"}>
                <input className={"text-black w-1/3"} type={"number"} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
                <input className={"text-black w-1/3"} type={"date"} value={weightDate?.toISOString().split('T')[0]} onChange={e => setWeightDate(new Date(e.target.value))} />

                <div className={"self-center"}>
                    <button type="submit" onClick={() => onTrackWeight(weight, weightDate).then(() => {
                        setWeight(0);
                        setWeightDate(new Date());
                        fetchWeights(setWeights);
                    })}
                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        Track
                    </button>
                </div>
            </div>
        </div>
        <Weights weights={weights} />
    </div>
}