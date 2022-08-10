import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'

const SectionWrapper = styled.div`
    margin-top: 1em;
    border-top: 1px solid black;
    @media print {
        border: 0;
    }
`

const BodyWrapper = styled.article`
    break-after: page;
    column-count: 4;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media (max-width: 900px) {
        column-count: 3;
    }
    @media print {
        column-count: 3;
        > * {
            break-inside: auto;
        }
        > * > * {
            break-inside: avoid-column;
        }
    }
    > * {
        break-inside: avoid-column;
    }
`

const SpellListsSection = ({lists, hrefId}) => (
    <SectionWrapper id={hrefId}>
        <h1>Llistes de Conjurs</h1>
        <BodyWrapper>
            {lists.map(e=>(<GenericEntry {...e} titleHeader={2} />))}
        </BodyWrapper>
    </SectionWrapper>
)

export default SpellListsSection