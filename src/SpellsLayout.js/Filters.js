import styled from 'styled-components'

const Wrapper = styled.section`
    grid-area: filters;
`

const Filters = ({classes, levels}) => {
    return (<Wrapper>
        <div>
            <div>
                {classes.map(c=>(
                    <button key={c}>
                        {c}
                    </button>
                ))}
            </div>
            <div>
                {levels.map(l=>(
                    <button key={l}>
                        {l}
                    </button>
                ))}
            </div>
            <div>
                <button>Escollits</button>
            </div>
            <textarea placeholder="Cerca..."></textarea>
        </div>
    </Wrapper>)
}
export default Filters