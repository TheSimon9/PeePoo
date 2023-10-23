'use client';

import Toggle from "@/components/Toggle";
import {useState} from "react";
import {saveDiaper} from "@/domain/Diaper";

export default function Home() {
  const [pee, setPee] = useState(false)
  const [poop, setPoop] = useState(false)

  async function onSubmit() {
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pee: pee,
        poop: poop
      }),
    }).then(data => data.json())
      .then((diaper) => saveDiaper(diaper, new Date()))
  }


  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="mx-auto grid max-w-12xl grid-cols-1 gap-x-8 gap-y-16">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">PeePoo</h2>
        <p className="mt-4 text-lg leading-8 text-gray-300">{"Track what there's in Thomas's diaper"}</p>
        <div className={"my-4"}>
          <Toggle type={"💩"} name={"poop"} setValue={setPoop} value={poop}/>
          <Toggle type={"💦"} name={"pee"} setValue={setPee} value={pee}/>
        </div>
        <button type="submit" onClick={onSubmit}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Track new diaper
        </button>
      </div>
    </div>
  </main>
}
