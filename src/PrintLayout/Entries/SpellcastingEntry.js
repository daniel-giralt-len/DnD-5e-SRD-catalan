import GenericEntry from "./GenericEntry"

const getSpellEntries = spells => {
    return Object.entries(spells)
        .map(([level, {spells, slots}]) => {
            const name = level === '0'
                ? 'Truc (a voluntat)'
                : `Nivell ${level} (${slots} ranures)`
            const entries = spells.join(', ')
            return {name, type: 'entries', entries}
        })
}

const getWillEntries = (will) => {
    if(!will){return []}
    return [{name: 'A voluntat', type: 'entries', entries: will.join(', ')}]
}

const getDailyEntries = daily => {
    return Object.entries(daily)
        .sort((a,b)=>parseInt(a[0][0])-parseInt(b[0][0]))
        .map(([f,d])=>({name: `${f[0]}/Dia`, type: 'entries', entries: d.join(', ')}))
}

const SpellcastingEntry = ({entries}) => {
    return entries.map(({
        name,
        entries = [],
        headerEntries,
        spells = [],
        will,
        daily={}
    }) => {
        const es = [
            ...headerEntries,
            ...entries,
            ...getSpellEntries(spells),
            ...getWillEntries(will),
            ...getDailyEntries(daily)
        ]
        return (<GenericEntry key={name} name={name} entries={es} />)
    })
}
export default SpellcastingEntry