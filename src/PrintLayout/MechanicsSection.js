import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'

const SectionWrapper = styled.article`
    break-after: page;
    column-count: 2;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 2;
    }
`

const MechanicsSection = ({
    sections,
    indices
}) => (
    <SectionWrapper>
        {sections.map((s, i)=>(
            <section key={i} id={indices[s.name]}>
                <GenericEntry {...s} titleHeader={i === 0 ? 1 : 2}/>
            </section>
        ))}
    </SectionWrapper>
)

export default MechanicsSection