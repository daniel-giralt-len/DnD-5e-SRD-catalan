import styled from 'styled-components'
import Bestiary from './Entries/Bestiary'

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

const BestiarySection = ({
    name, entries,
    hrefId
}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{name}</h1>
        <BodyWrapper>
            {entries.map(b=>(<Bestiary key={b.name} {...b} />))}
        </BodyWrapper>
    </SectionWrapper>
)

export default BestiarySection