import styled from 'styled-components'
import UnusedKeysWarning from './UnusedKeysWarning'

const SectionWrapper = styled.div`
    break-after: page;
    @media print {
        a {
            color: black;
            text-decoration: none;
        }
    }
`

const keysToIgnore=['source','page','srd']

const ClassSection = ({hrefId, name, ...rest}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{name}</h1>
        <UnusedKeysWarning rest={rest} keysToIgnore={keysToIgnore} />
    </SectionWrapper>
)

export default ClassSection