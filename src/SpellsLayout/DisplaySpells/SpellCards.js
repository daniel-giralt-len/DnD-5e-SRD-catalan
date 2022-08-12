import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import Spell from '../../PrintLayout/Entries/Spell'


const Wrapper = styled.main`
    column-count: 3;
    @media print{
        font-size: 0.5em;
    }
    padding: 0.3em;
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
            {filteredSpells.map(s => (<Spell key={s.name} {...s} />))}
    </Wrapper>)
}
export default SpellCards