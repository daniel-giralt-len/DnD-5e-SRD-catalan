import styled from 'styled-components'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import SpellList from "./SpellList"
import Filters from "./Filters"
import getItemRegex from './getItemRegex'
import Spell from "../PrintLayout/Entries/Spell"

const Wrapper = styled.main`
    display: flex;
    @media (max-width: 600px) {
        flex-direction: column-reverse;
    }
    padding: 0.3em;
`

const LeftColumn = styled.div`
    max-width: 400px;
`

const AlignRight = styled.div`
    text-align: right;
`

const SpellSection = styled.section`
    margin-left: 1em;
    @media (max-width: 600px) {
        margin: 0;
    }
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
                ({...acc, [className]:true}),
            {}))
    const [selectedLevels, setLevels] = 
        useState(Array(10).fill(0).map((_,i)=>i)
            .reduce((acc,lvl)=>
                ({...acc, [lvl]:true})
            ,{}))
    const [selectedSpellIndex,setSelectedSpellIndex] = useState(null)
    const [showOnlyChosen, setShowOnlyChosen] = useState(false)
    const [chosenSpells, setChosenSpells] = useState({})

    const handleClassChange = name => {
        const newClasses = {...selectedClasses}
        newClasses[name] = !newClasses[name]
        return setClasses(newClasses)
    }
    const handleLevelChange = name => {
        const newLevels = {...selectedLevels}
        newLevels[name] = !newLevels[name]
        return setLevels(newLevels)
    }
    const handleChosenOnlyChange = () => setShowOnlyChosen(!showOnlyChosen)
    const handleSelectedSpellChange = name => name===selectedSpellIndex ? setSelectedSpellIndex(null) : setSelectedSpellIndex(name)
    const handleSpellChoose = name => {
        const newChosenSpells = {...chosenSpells}
        newChosenSpells[name] = !newChosenSpells[name]
        setChosenSpells(newChosenSpells)
        const chosenSpellNames = Object.entries(newChosenSpells).filter(([k,v])=>v).map(([k])=>k)
        setSearchParams({
            ...searchParams,
            chosenSpellNames: JSON.stringify(chosenSpellNames)
        })
    }
    
    const filteredSpells = spells
        .filter(spell => searchRegex.test(spell.name))
        .filter(spell => selectedLevels[spell.level])
        .filter(spell => spell.allowedClasses.some(c => selectedClasses[c]))
        .filter(spell => !showOnlyChosen || chosenSpells[getSpellName(spell)])


    const names = filteredSpells.map(getSpellName)
    const [searchParams, setSearchParams] = useSearchParams();
    const handleGenerateCards = () => setSearchParams({...searchParams, display: true})

    return (<Wrapper>
        <div>
            <LeftColumn>
                <button
                    onClick={handleGenerateCards}
                >
                    Generar Cartes!
                </button>
                <Filters
                    classes={selectedClasses}
                    levels={selectedLevels}
                    showOnlyChosen={showOnlyChosen}
                    handleSearchChange={handleSearchChange}
                    handleClassChange={handleClassChange}
                    handleLevelChange={handleLevelChange}
                    handleChosenOnlyChange={handleChosenOnlyChange}
                />
            </LeftColumn>
            <SpellList
                names={names}
                selectedSpellIndex={selectedSpellIndex}
                handleSelectedSpellChange={handleSelectedSpellChange}
                handleSpellChoose={handleSpellChoose}
                chosenSpells={chosenSpells}
            />
        </div>
        {selectedSpellIndex && (
            <SpellSection>
                <AlignRight style={{textAlign:'right'}}>
                    <button onClick={()=>setSelectedSpellIndex(null)}>X</button>
                </AlignRight>
                <Spell {...spells.find(s=> getSpellName(s) === selectedSpellIndex)}/>
            </SpellSection>
        )}
    </Wrapper>)
}
export default SpellPickerApp