import styled from 'styled-components'

const SpellItemWrapper = styled.li`
    padding: 0;
    margin: 0;
    list-style-type: none;
`

const Wrapper = styled.section`
    max-height: 70%;
    grid-area: list;
    display: grid;
    grid-template-columns: auto 2em;
    padding: 0.5em 1em;
    @media (max-width: 600px) {
        padding: 0.25em 0.5em;
    }
`

const SpellList = ({names}) => {
    return (<Wrapper>
        {names
            .map(name => (
                <>
                    <SpellItemWrapper>{name}</SpellItemWrapper>
                    <button>+</button>
                </>
  
                )
            )
        }
    </Wrapper>)
}
export default SpellList