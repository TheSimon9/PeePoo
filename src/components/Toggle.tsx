'use client';

type ToggleProps = {
    type: '💩' | '💦'
    name: string,
    value: boolean,
    setValue: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
export default function Toggle({type, name, setValue, value}: ToggleProps){
    return <div className="space-x-3 flex py-2">
        <span>{type}</span>
        <label htmlFor={name} className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" id={name} name={name} className="peer sr-only" onChange={(e) => setValue(!value)} checked={value} />
            <div
                className="h-6 w-11 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"></div>
        </label>
    </div>
}