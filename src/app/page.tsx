'use client';

import Toggle from "@/components/Toggle";
import {useEffect, useState} from "react";
import Diapers, {Diaper} from "@/components/Diapers";
import Breastfeed from "@/components/Breastfeed";

function fetchDiapers(setDiapers: (prev:Diaper[]) => void){
  fetch('/api/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => res.json())
    .then((diapers) => {
    setDiapers(diapers.map((d: Diaper)=>({
      poo: d.poo,
      pee: d.pee,
      created_at: new Date(d.created_at)
    })));
  })
}

export default function Home() {
  const [pee, setPee] = useState(false)
  const [poo, setPoo] = useState(false)
  const [diapers, setDiapers] = useState<Diaper[]>([])

  useEffect(() => {
    fetchDiapers(setDiapers)
  },[])

  const date = new Date()

  async function onSubmit() {
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pee: pee,
        poo: poo
      }),
    }).then(() => {
      fetchDiapers(setDiapers)
      setPoo(false)
      setPee(false)
    })
  }

  return <main className="flex min-h-screen flex-col items-center p-8">
    <div className="mx-auto grid max-w-12xl grid-cols-1 gap-x-8 gap-y-16">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">PeePoo</h1>
        <p className="mt-4 text-lg leading-8 text-gray-300">{"Track what there's in Thomas's diaper"}</p>
        <div className={"my-4"}>
          <Toggle type={"💩"} name={"poo"} setValue={setPoo} value={poo}/>
          <Toggle type={"💦"} name={"pee"} setValue={setPee} value={pee}/>
        </div>
        <button type="submit" onClick={onSubmit}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Track new diaper
        </button>
      </div>
    </div>
    <Breastfeed />
    <div className="w-full">
      <h1 className="text-lg py-4 font-bold tracking-tight text-white">Diapers in {`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</h1>
      <Diapers diapers={diapers ?? []}/>
    </div>
  </main>
}
