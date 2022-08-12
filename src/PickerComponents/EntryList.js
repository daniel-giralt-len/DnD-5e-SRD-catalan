import styled from 'styled-components'
import FilterButton from './FilterButton'

const EntryItemWrapper = styled.div`
    display:flex;
    align-items:center;
    :hover { box-shadow: 0 0 3px 0px #340000; }
`

const EntryName = styled.li`
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

const EntryList = ({
    names,
    selectedIndex,
    handleSelectedChange,
    allowChoosing = true,
    handleChoose,
    chosen,
}) => {
    return (<Wrapper>
        {names
            .map((name,i) => {
                const isChosen = Object
                    .entries(chosen)
                    .filter(([k,v])=>v)
                    .map(([k,v])=>k)
                    .includes(name)
                return [
                        (<EntryItemWrapper
                            key={`${name}-title`}
                            onClick={()=>handleSelectedChange(name)}    
                        >
                            <EntryName 
                                selected={selectedIndex===i}
                                chosen={isChosen}
                            >{name}
                            </EntryName>
                        </EntryItemWrapper>
                        ),
                        allowChoosing ? (<FilterButton
                            selected={isChosen}
                            key={`${name}-button`}
                            onClick={() => handleChoose(name)}
                        >
                            {isChosen ? '-' : '+'}
                        </FilterButton>) : undefined
                    ]
                }
            ).reduce((acc,arr)=>([...acc,...arr]),[]).filter(v=>v)
        }
    </Wrapper>)
}
export default EntryList