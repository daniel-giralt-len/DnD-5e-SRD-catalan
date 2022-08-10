import styled from 'styled-components'
import Spell from './Entries/Spell'

const SectionWrapper = styled.div`
    margin-top: 1em;
    border-top: 1px solid black;
    @media print {
        border: 0;
    }
`

const BodyWrapper = styled.article`
    break-after: page;
    column-count: 2;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 2;
    }
`

const SpellsSection = ({
    spells,
    hrefId
}) => (
    <SectionWrapper>
        <h1 id={hrefId}>Descripcions dels Conjurs</h1>
        <BodyWrapper>
            {spells.map(s=>(<Spell key={s.name} {...s} />))}
        </BodyWrapper>
    </SectionWrapper>
)

export default SpellsSection