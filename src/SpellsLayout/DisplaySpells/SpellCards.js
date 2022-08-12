import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import Spell from '../../PrintLayout/Entries/Spell'


const Wrapper = styled.main`
    column-count: 3;
    @media (max-width: 700px) {
        column-count: 1;
    }
    @media print{
        column-count: 2;
        font-size: 0.75em;
    }
    padding: 0.3em;
    padding-top: 0;
`

const CardWrapper = styled.div`
    border: 1px solid black;
    border-radius: 6px;
    margin: 1em 0;
    padding: 0.5em;
    break-inside: avoid;
`

const NoPrintButton = styled.button`
    @media print {
        display: none;
    }
    display: block
`

const SpellCards = ({spells}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const names = JSON.parse(searchParams.get('chosenSpellNames')) || []
    const filteredSpells = spells
        .filter(s => names.includes(s.name))

    const handleEditCards = () => {
        searchParams.set('display',false)
        setSearchParams(searchParams.toString())
    }

    return (<Wrapper>
            <NoPrintButton
                onClick={handleEditCards}
            >
                Seleccionar Cartes!
            </NoPrintButton>
            {filteredSpells.map(s => (
                <CardWrapper>
                    <Spell key={s.name} {...s} />
                </CardWrapper>
            ))}
    </Wrapper>)
}
export default SpellCards