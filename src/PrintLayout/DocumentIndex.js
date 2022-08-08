import styled from 'styled-components'

const SectionWrapper = styled.div`
    @media print {
        break-after: always;
    }
`

const DocumentIndex = ({indexableSections}) => (
    <SectionWrapper>
        <h1>Índex</h1>
        {
            Object
                .entries(indexableSections)
                .map(([name, href]) => (<p key={name}><a href={`#${href}`}>{name}</a></p>))
        }
    </SectionWrapper>
)

export default DocumentIndex