import styled from 'styled-components'

const ItemSearchBarWrapper = styled.textarea`
resize: none;
font-size: 1.5em;
padding: 10px 10px;
border-width: 2px;
border-color: black;
margin: 0.25em 0;
width: -webkit-fill-available;
`

const SearchBar = ({onChange}) => (
    <ItemSearchBarWrapper
        rows={1}
        cols={50}
        onChange={onChange}
        placeholder='Cerca pel nom...'
    />
)

export default SearchBar