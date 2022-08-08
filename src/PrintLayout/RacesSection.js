import styled from 'styled-components'
import Race from './Entries/Race'

const SectionWrapper = styled.div`
    break-after:page;
    @media print {
        column-count: 2;
    }
`

const RacesSection = ({name, entries, hrefId}) => (
    <SectionWrapper>
        <h2 id={hrefId}>{name}</h2>
        {entries.map(Race)}
    </SectionWrapper>
)

export default RacesSection