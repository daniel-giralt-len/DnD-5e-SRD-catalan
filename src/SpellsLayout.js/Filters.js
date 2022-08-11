import styled from 'styled-components'
import SearchBar from './SearchBar'


const Wrapper = styled.section`
    grid-area: filters;
`

const Filters = ({classes,
    levels,
    handleSearchChange
}) => {
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
            <SearchBar
                onChange={handleSearchChange}
            />
        </div>
    </Wrapper>)
}
export default Filters