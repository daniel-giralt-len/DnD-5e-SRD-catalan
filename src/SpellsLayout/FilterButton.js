import styled from 'styled-components'
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
export default FilterButton;