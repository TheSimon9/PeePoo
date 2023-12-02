import {useEffect, useState} from "react";

async function onBreastfeed() {
    return await fetch('/api/trackbreastfed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
        .then(j => new Date(j[0].last_breastfed))
}

export default function Breastfeed(){
    const [lastBreastfed, setLastBreastfed] = useState<Date | undefined>()

    useEffect(() => {
        fetch('/api/getbreastfed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(j => setLastBreastfed(new Date(j[0].last_breastfed)))
    }, [])

    return <div className="w-full max-w-xl py-8">
        <div className="max-w-xl">
            <h2 className="text-lg font-bold tracking-tight text-white">Breastfeed</h2>
            <p className="mt-4 pb-4 text-lg leading-8 text-gray-300">{"Track last breastfed, in order to understand when next"}</p>
            <div className={"flex justify-between"}>
                <button type="submit" onClick={() => onBreastfeed().then(data => setLastBreastfed(data))}
                        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    Reset Breastfeed
                </button>
                <div className={"self-center"}>
            <span
                className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                      clipRule="evenodd"/>
              </svg>
              Previous: {lastBreastfed ? (`${lastBreastfed?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`) : "..."}
            </span>
                </div>
            </div>
        </div>
    </div>
}