import styled from 'styled-components'
import SearchBar from './SearchBar'


const Wrapper = styled.section`
    grid-area: filters;
`

const Filters = ({
    classes,
    levels,
    handleSearchChange,
    handleClassChange,
    handleLevelChange,
    handleSelectedOnlyChange
}) => {
    return (<Wrapper>
        <div>
            <div>
                {Object.entries(classes)
                .map(([name,{selected}])=>(
                    <button
                        selected={selected}
                        key={name}
                        onClick={handleClassChange}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <div>
                {Object.entries(levels)
                    .map(([name,{selected}])=>(
                        <button
                            selected={selected}
                            key={name}
                            onClick={handleLevelChange}
                        >
                            {name}
                        </button>
                    ))}
            </div>
            <div>
                <button
                    onClick={handleSelectedOnlyChange}
                >
                    Escollits
                </button>
            </div>
            <SearchBar
                onChange={handleSearchChange}
            />
        </div>
    </Wrapper>)
}
export default Filters