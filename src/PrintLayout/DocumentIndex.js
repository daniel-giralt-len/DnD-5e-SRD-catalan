import styled from 'styled-components'

const SectionWrapper = styled.div`
    @media print {
        page-break-after: always;
    }
`

const DocumentIndex = ({indexableSections}) => (
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