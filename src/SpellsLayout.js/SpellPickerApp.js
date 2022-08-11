import SpellList from "./SpellList"
import Filters from "./Filters"
import Spell from "../PrintLayout/Entries/Spell"

const SpellPickerApp = ({spells}) => {
    const names = spells.map(s=>s.name)
    const classesRaw = spells
        .map(s=>((s.classes||{}).fromClassList)||[])
        .reduce((acc,arr)=>([...acc,...arr]),[])
        .filter(c=>c.source === 'PHB')
        .map(c=>c.name)

    const classes = [...new Set(classesRaw)].sort()
    const levels = Array(10).fill(0).map((_,i)=>i)
    const selectedSpell = undefined

    return (<div>
        <Filters
            classes={classes}
            levels={levels}
        />
        <SpellList names={names} />
        {selectedSpell && <Spell spell={selectedSpell}/>}
    </div>)
}
export default SpellPickerApp