import styled from 'styled-components'
import { useState } from 'react'

import SpellList from "./SpellList"
import Filters from "./Filters"
import getItemRegex from './getItemRegex'
import Spell from "../PrintLayout/Entries/Spell"

const Wrapper = styled.main`
    display: grid;
    @media (max-width: 600px) {
        grid-template-columns: 100%;
        grid-template-areas:
            "filters"
            "list"
            "spell";
    }
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "filters spell"
        "list    spell";
    column-gap: 1em;
    padding: 0.3em;
`

const SpellSection = styled.section`
    grid-area: spell;
`

const SpellPickerApp = ({spells}) => {

    const [searchedText, setSearchedText] = useState('')
    const searchRegex = getItemRegex(searchedText)
    const handleSearchChange = event => setSearchedText(event.target.value || '')

    const filteredSpells = spells
        .filter(spell => searchRegex.test(spell.name))

    const names = filteredSpells
        .map(s=>typeof s.srd === 'string' ? s.srd : s.name)
    const classesRaw = spells
        .map(s=>((s.classes||{}).fromClassList)||[])
        .reduce((acc,arr)=>([...acc,...arr]),[])
        .filter(c=>c.source === 'PHB')
        .map(c=>c.name)

    const [classes, setClasses] = 
        useState([...new Set(classesRaw)]
            .sort()
            .reduce((acc,className)=>
                ({...acc, [className]:{selected:false}}),
            {}))
    const [levels, setLevels] = 
        useState(Array(10).fill(0).map((_,i)=>i)
            .reduce((acc,lvl)=>
                ({...acc, [lvl]:{selected:false}})
            ,{}))
    const [selectedSpellIndex,setSelectedSpellIndex] = useState(null)
    const [showOnlyChosen, setShowOnlyChosen] = useState(false)

    const handleClassChange = name => {
        const newClasses = {...classes}
        newClasses[name].selected = !newClasses[name].selected
        return setClasses(newClasses)
    }
    const handleLevelChange = name => {
        const newLevels = {...levels}
        newLevels[name].selected = !newLevels[name].selected
        return setLevels(newLevels)
    }
    const handleChosenOnlyChange = () => setShowOnlyChosen(!showOnlyChosen)
    const handleSelectedSpellChange = name => name===selectedSpellIndex ? setSelectedSpellIndex(null) : setSelectedSpellIndex(name)

    return (<Wrapper>
        <Filters
            classes={classes}
            levels={levels}
            showOnlyChosen={showOnlyChosen}
            handleSearchChange={handleSearchChange}
            handleClassChange={handleClassChange}
            handleLevelChange={handleLevelChange}
            handleChosenOnlyChange={handleChosenOnlyChange}
        />
        <SpellList
            names={names}
            selectedSpellIndex={selectedSpellIndex}
            handleSelectedSpellChange={handleSelectedSpellChange}
        />
        {selectedSpellIndex && (
            <SpellSection>
                <Spell {...spells.find(s=> (typeof s.srd === 'string' ? s.srd : s.name) === selectedSpellIndex)}/>
            </SpellSection>
        )}
    </Wrapper>)
}
export default SpellPickerApp