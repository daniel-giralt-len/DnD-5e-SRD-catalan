import styled from 'styled-components'

const SectionWrapper = styled.div`
    break-after: page;
    @media print {
        a {
            color: black;
            text-decoration: none;
        }
    }
`

const ClassSection = ({hrefId, name, ...rest}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{name}</h1>
        
    </SectionWrapper>
)

export default ClassSection