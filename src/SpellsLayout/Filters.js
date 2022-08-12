import styled from 'styled-components'
import SearchBar from './SearchBar'


const Wrapper = styled.section`
    grid-area: filters;
`

const FilterButton = styled.button`
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    background: none;
    box-shadow: 0px 0px 1px 0px #340000;
    margin: 2px;
    transition: box-shadow .3s;
    ${({selected}) => selected ? `
        background: #340000;
        color: white;
    ` : ''}
    :hover { box-shadow: 0 0 3px 0px #340000; }
`

const Filters = ({
    classes,
    levels,
    showOnlyChosen,
    handleSearchChange,
    handleClassChange,
    handleLevelChange,
    handleChosenOnlyChange
}) => {
    return (<Wrapper>
        <div>
            <div>
                {Object.entries(classes)
                .map(([name,{selected}])=>(
                    <FilterButton
                        selected={selected}
                        key={name}
                        onClick={()=>handleClassChange(name)}
                    >
                        {name}
                    </FilterButton>
                ))}
            </div>
            <div>
                {Object.entries(levels)
                    .map(([name,{selected}])=>(
                        <FilterButton
                            selected={selected}
                            key={name}
                            onClick={()=>handleLevelChange(name)}
                        >
                            {name}
                        </FilterButton>
                    ))}
            </div>
            <div>
                <FilterButton
                    selected={showOnlyChosen}
                    onClick={handleChosenOnlyChange}
                >
                    Escollits
                </FilterButton>
            </div>
            <SearchBar
                onChange={handleSearchChange}
            />
        </div>
    </Wrapper>)
}
export default Filters