
import styled from 'styled-components'
import Text from '../../EnrichedText'

const TableAligner = styled.div`
    display:flex;
    justify-content:  ${({align}) => align || 'left'};
`

const TableWrapper = styled.div`
    display: grid;
    width:fit-content;
    @media (max-width: 600px) {
        width: min-content;
    }
    @media print {
        width:fit-content;
    }
    grid-template-columns: repeat(${({nColumns})=>nColumns}, auto);
    column-gap: 0.4em;
`

const TableEntryWrapper = styled.div`
    break-inside: avoid-column;
    margin: 0.6em 0;
`

const getCellAlignment = (colStyle = '') => {
    if(colStyle.includes('text-center')) { return 'center' }
    if(colStyle.includes('text-left'))   { return 'left'   }
    if(colStyle.includes('text-right'))  { return 'right'  }
    return 'left'
}

const TableHeader = styled.span`
    font-style: italic;
    font-weight: 700;
    text-align: ${({colStyle}) => getCellAlignment(colStyle)};
    
    display: flex;
    align-items: flex-end; 
    word-spacing: 100vw;
`

const Cell = styled.span`
    border-top: 0.001em solid black;
    text-align: ${({colStyle}) => getCellAlignment(colStyle)};
`

const TableCaption = styled.span`
    font-weight: bold;
`

const Table = ({
    caption,
    colLabels = [],
    colStyles = [],
    rows = [],
    tableAlign
    }) => {
        return(
        <TableEntryWrapper>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableAligner align={tableAlign}>
                <TableWrapper
                    nColumns={colLabels.length}
                >
                    {
                        colLabels
                            .map((r,i)=>(
                                <TableHeader
                                    key={`h-${i}`}
                                    colStyle={colStyles[i]}
                                >
                                    <Text>{r}</Text>
                                </TableHeader>))
                    }
                    {
                        rows
                            .reduce((acc,r)=>{
                                if(r.type && r.type === 'row'){
                                    return [...acc, ...r.row]
                                }
                                return [...acc,...r]
                            },[])
                            .map((r,i)=>(
                                <Cell
                                    colStyle={colStyles[i%colLabels.length]}
                                    border={Math.floor(i/colLabels.length)%2===0}
                                    key={`b-${i}`}>
                                    <Text>{r}</Text>
                                </Cell>
                            ))
                    }
                </TableWrapper>
            </TableAligner>
        </TableEntryWrapper>
)}

export default Table