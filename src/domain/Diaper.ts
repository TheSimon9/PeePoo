type Diaper = {
    pee: boolean,
    poo: boolean,
    when: Date
}


export const saveDiaper = (diaper: Diaper, date: Date) => {
    const newDiapersRecord = JSON.stringify([...getDiaper(date), diaper])
    localStorage.setItem(diapersKey(date), newDiapersRecord);
}

export function getDiaper(date: Date){
    return JSON.parse(localStorage.getItem(diapersKey(date))) ?? []
}

const diapersKey = (date: Date) => date.toLocaleDateString()
