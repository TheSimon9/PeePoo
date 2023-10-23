type DiaperProp = {
    pee: boolean,
    poo: boolean,
    date: Date,
}

export default function DiaperRow({pee, poo, date}:DiaperProp){
    return <tr>
            <td className="px-6 py-4">{`${date?.getHours() ?? 0}:${date?.getMinutes() ?? 0}`}</td>
            <td className="px-6 py-4">{poo ? "Yup" : "Nope"}</td>
            <td className="px-6 py-4">{pee ? "Yup" : "Nope"}</td>
        </tr>
}