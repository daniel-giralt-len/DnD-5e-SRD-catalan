import styled from 'styled-components'

const IndexElement = styled.p`
    margin: 0.5em 0;
`

const SectionWrapper = styled.div`
    @media print {
        break-after: always;
        color:white;
        a {
            color: black;
            text-decoration: none;
        }
    }
`

const DocumentIndex = ({indexableSections}) => (
    <SectionWrapper>
        <h1>Índex</h1>
        {
            Object
                .entries(indexableSections)
                .map(([name, href]) => (<IndexElement key={name}><a href={`#${href}`}>{name}</a></IndexElement>))
        }
    </SectionWrapper>
)

export default DocumentIndex