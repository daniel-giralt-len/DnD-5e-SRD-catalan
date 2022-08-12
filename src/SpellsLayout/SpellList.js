import styled from 'styled-components'

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
`

const Wrapper = styled.section`
    max-height: 70%;
    grid-area: list;
    display: grid;
    grid-template-columns: auto 2em;
    padding: 0.5em 0.5em;
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
}) => {
    return (<Wrapper>
        {names
            .map((name,i) => ([
                    (<SpellItemWrapper
                        onClick={()=>handleSelectedSpellChange(name)}    
                    >
                        <SpellName 
                            key={`${name}-title`}
                            selected={selectedSpellIndex===i}
                        >{name}
                        </SpellName>
                    </SpellItemWrapper>
                    ),
                    (<button key={`${name}-button`}>+</button>)
                ])
            ).reduce((acc,arr)=>([...acc,...arr]),[])
        }
    </Wrapper>)
}
export default SpellList