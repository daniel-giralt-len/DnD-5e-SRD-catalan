import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'
import Object from './Entries/Object'

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

const ObjectsSection = ({
    prefixSection,
    objects,
    hrefId
}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{prefixSection ? prefixSection.name : objects.name}</h1>
        <BodyWrapper>
            {prefixSection && <GenericEntry {...prefixSection} name={null} titleHeader={2} />}
            {objects.entries.map(o=>(<Object key={o.name} {...o} />))}
        </BodyWrapper>
    </SectionWrapper>
)

export default ObjectsSection