import styled from 'styled-components'
import Race from './Entries/Race'

const SectionWrapper = styled.div`
    @media print {
        page-break-after: always;
    }
`

const RacesSection = ({name, entries}) => (
    <SectionWrapper>
        <h2>{name}</h2>
        {entries.map(Race)}
    </SectionWrapper>
)

export default RacesSection