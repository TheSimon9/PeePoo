import React from "react";

const BORN_DATE= new Date("2023/10/13")

type WeightProp = {
    weight: number,
    diff: number,
    datetime: Date,
}

function weeksBetween(date1: Date, date2:Date) {
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7; // Number of milliseconds in a week
    // @ts-ignore
    const differenceMs = Math.abs(date2 - date1); // Difference in milliseconds

    const weeks = Math.floor(differenceMs / millisecondsPerWeek); // Number of whole weeks
    const remainderMs = differenceMs % millisecondsPerWeek; // Remaining milliseconds

    // If there's a remainder, consider it as a partial week
    const partialWeek = remainderMs > 0 ? 1 : 0;

    return weeks + partialWeek;
}

export default function WeightRow({weight, diff, datetime}:WeightProp){
    return <tr>
        <td className="px-6 py-4">{weeksBetween(datetime, BORN_DATE)}</td>
        <td className="px-2 py-4">{weight} Gr</td>
        <td className="px-2 py-4">{diff == weight ? 0 : diff} Gr</td>
        <td className="px-3 py-4">{`${datetime?.getDate()}/${datetime?.getMonth()}`}</td>
    </tr>
}