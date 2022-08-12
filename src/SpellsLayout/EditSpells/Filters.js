import styled from 'styled-components'
import SearchBar from '../../PickerComponents/SearchBar'
import FilterButton from '../../PickerComponents/FilterButton'

const Wrapper = styled.section`
    grid-area: filters;
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
                .map(([name,selected])=>(
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
                    .map(([name,selected])=>(
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
                    Només escollits
                </FilterButton>
            </div>
            <SearchBar
                onChange={handleSearchChange}
            />
        </div>
    </Wrapper>)
}
export default Filters