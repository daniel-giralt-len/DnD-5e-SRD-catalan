import styled from 'styled-components'

import SpellList from "./SpellList"
import Filters from "./Filters"
import Spell from "../PrintLayout/Entries/Spell"

const Wrapper = styled.main`
    display: grid;
    @media (max-width: 600px) {
        grid-template-columns: auto;
        grid-template-areas:
            "filters"
            "list"
            "spell";
    }
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "filters spell"
        "list    spell";
    padding: 0.3em;
`

const SpellSection = styled.section`
    grid-area: spell;
`

const SpellPickerApp = ({spells}) => {
    const names = spells.map(s=>typeof s.srd === 'string' ? s.srd : s.name)
    const classesRaw = spells
        .map(s=>((s.classes||{}).fromClassList)||[])
        .reduce((acc,arr)=>([...acc,...arr]),[])
        .filter(c=>c.source === 'PHB')
        .map(c=>c.name)

    const classes = [...new Set(classesRaw)].sort()
    const levels = Array(10).fill(0).map((_,i)=>i)
    const selectedSpell = spells[0]

    return (<Wrapper>
        <Filters
            classes={classes}
            levels={levels}
        />
        <SpellList names={names} />
        {selectedSpell && (
            <SpellSection>
                <Spell {...selectedSpell}/>
            </SpellSection>
        )}
    </Wrapper>)
}
export default SpellPickerApp