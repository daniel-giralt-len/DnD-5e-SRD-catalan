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

const getSpellName = s => typeof s.srd === 'string' ? s.srd : s.name

const SpellPickerApp = ({spells: rawSpells}) => {
    const spells = rawSpells
        .map(s=>({
                ...s,
                allowedClasses: s
                    .classes
                    .fromClassList
                    .filter(c=>c.source === 'PHB')
                    .map(c => c.name)
            })
        )

    const [searchedText, setSearchedText] = useState('')
    const searchRegex = getItemRegex(searchedText)
    const handleSearchChange = event => setSearchedText(event.target.value || '')

    const classesRaw = spells
        .map(s=>s.allowedClasses)
        .reduce((acc,arr)=>([...acc,...arr]),[])

    const [selectedClasses, setClasses] = 
        useState([...new Set(classesRaw)]
            .sort()
            .reduce((acc,className)=>
                ({...acc, [className]:{selected:true}}),
            {}))
    const [selectedLevels, setLevels] = 
        useState(Array(10).fill(0).map((_,i)=>i)
            .reduce((acc,lvl)=>
                ({...acc, [lvl]:{selected:true}})
            ,{}))
    const [selectedSpellIndex,setSelectedSpellIndex] = useState(null)
    const [showOnlyChosen, setShowOnlyChosen] = useState(false)
    const [chosenSpells, setChosenSpells] = useState({})

    const handleClassChange = name => {
        const newClasses = {...selectedClasses}
        newClasses[name].selected = !newClasses[name].selected
        return setClasses(newClasses)
    }
    const handleLevelChange = name => {
        const newLevels = {...selectedLevels}
        newLevels[name].selected = !newLevels[name].selected
        return setLevels(newLevels)
    }
    const handleChosenOnlyChange = () => setShowOnlyChosen(!showOnlyChosen)
    const handleSelectedSpellChange = name => name===selectedSpellIndex ? setSelectedSpellIndex(null) : setSelectedSpellIndex(name)
    const handleSpellChoose = name => {
        const newChosenSpells = {...chosenSpells}
        newChosenSpells[name] = !newChosenSpells[name]
        return setChosenSpells(newChosenSpells)
    }
    
    const filteredSpells = spells
        .filter(spell => searchRegex.test(spell.name))
        .filter(spell => selectedLevels[spell.level].selected)
        .filter(spell => spell.allowedClasses.some(c => selectedClasses[c].selected))
        .filter(spell => !showOnlyChosen || chosenSpells[getSpellName(spell)])


    const names = filteredSpells.map(getSpellName)

    return (<Wrapper>
        <Filters
            classes={selectedClasses}
            levels={selectedLevels}
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
            handleSpellChoose={handleSpellChoose}
            chosenSpells={chosenSpells}
        />
        {selectedSpellIndex && (
            <SpellSection>
                <Spell {...spells.find(s=> getSpellName(s) === selectedSpellIndex)}/>
            </SpellSection>
        )}
    </Wrapper>)
}
export default SpellPickerApp