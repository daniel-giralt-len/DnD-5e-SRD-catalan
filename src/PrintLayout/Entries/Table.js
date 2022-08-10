
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

const TableHeader = styled.span`
    font-style: italic;
    font-weight: 700;
    text-align: ${({colStyle}) => (colStyle && colStyle.includes('text-center')) ? 'center' : 'left'};
    
    display: flex;
    align-items: flex-end; 
    word-spacing: 100vw;
`

const Cell = styled.span`
    border-top: 0.001em solid black;
    text-align: ${({colStyle}) => (colStyle && colStyle.includes('text-center')) ? 'center' : 'left'};
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
    }) => (
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
                            .reduce((acc,r)=>([...acc,...r]),[])
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
)

export default Table