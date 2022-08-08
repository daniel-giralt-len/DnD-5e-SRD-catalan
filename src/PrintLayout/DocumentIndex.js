import styled from 'styled-components'

const SectionWrapper = styled.div`
    @media print {
        page-break-after: always;
    }
`

const indexableSections = {
    'Informació Legal': 'legal info',
    'Races': 'races',
}

const DocumentIndex = () => (
    <SectionWrapper>
        <h1>Índex</h1>
        {
            Object
                .entries(indexableSections)
                .map(([name, href]) => (<p><a href={`#${href}`}>{name}</a></p>))
        }
    </SectionWrapper>
)

export default DocumentIndex