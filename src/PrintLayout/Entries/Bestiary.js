import styled from 'styled-components'

const Wrapper = styled.div`
    break-inside: avoid-column;
`

const Bestiary = ({
    name
}) => (
    <Wrapper>
        <h2>{name}</h2>
        
    </Wrapper>
    )

export default Bestiary
