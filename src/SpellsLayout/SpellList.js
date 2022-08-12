import styled from 'styled-components'
import FilterButton from './FilterButton'

const SpellItemWrapper = styled.div`
    display:flex;
    align-items:center;
    :hover { box-shadow: 0 0 3px 0px #340000; }
`

const SpellName = styled.li`
    padding: 0;
    margin: 0;
    list-style-type: none;
    ${({selected}) => selected ? 'font-weight: bold;' : ''}
    ${({chosen}) => chosen ? 'list-style-type: disclosure-closed;' : ''}
`

const Wrapper = styled.section`
    grid-area: list;
    
    overflow-y: scroll;
    padding: 0.5em 0.5em;
    
    display: grid;
    grid-template-columns: auto 2em;
    @media (max-width: 600px) {
        padding: 0.25em 0.5em;
    }
    column-gap: 0.2em;
    row-gap: 0.1em;
`

const SpellList = ({
    names,
    selectedSpellIndex,
    handleSelectedSpellChange,
    handleSpellChoose,
    chosenSpells,
}) => {
    return (<Wrapper>
        {names
            .map((name,i) => {
                const chosen = Object
                    .entries(chosenSpells)
                    .filter(([k,v])=>v)
                    .map(([k,v])=>k)
                    .includes(name)
                return [
                        (<SpellItemWrapper
                            key={`${name}-title`}
                            onClick={()=>handleSelectedSpellChange(name)}    
                        >
                            <SpellName 
                                selected={selectedSpellIndex===i}
                                chosen={chosen}
                            >{name}
                            </SpellName>
                        </SpellItemWrapper>
                        ),
                        (<FilterButton
                            selected={chosen}
                            key={`${name}-button`}
                            onClick={() => handleSpellChoose(name)}
                        >
                            {chosen ? '-' : '+'}
                        </FilterButton>)
                    ]
                }
            ).reduce((acc,arr)=>([...acc,...arr]),[])
        }
    </Wrapper>)
}
export default SpellList