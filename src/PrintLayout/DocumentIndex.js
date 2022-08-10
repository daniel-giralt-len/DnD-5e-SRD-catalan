import styled from 'styled-components'

const IndexElement = styled.li`
    margin: 0.5em 0;
`
    
const IndexList = styled.ol`
    column-count: 3;
`

const SectionWrapper = styled.article`
    @media print {
        a {
            color: black;
            text-decoration: none;
        }
    }
`

const DocumentIndex = ({indexableSections}) => (
    <SectionWrapper>
        <h1>Índex</h1>
        <IndexList>
            {
                Object
                    .entries(indexableSections)
                    .map(([name, href]) => (<IndexElement key={name}><a href={`#${href}`}>{name}</a></IndexElement>))
            }
        </IndexList>
    </SectionWrapper>
)

export default DocumentIndex