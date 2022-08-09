
import styled from 'styled-components'
import Text from '../../EnrichedText'

const TableWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({nColumns})=>nColumns}, auto)
`

const TableEntryWrapper = styled.div`
    break-inside: avoid-column;
    margin: 0.6em 0;
`

const TableHeader = styled.span`
    font-style: italic;
    font-weight: 700;
`

const Bold = styled.span`font-weight: bold;`

const Table = ({caption, colLabels, rows}) => (
    <TableEntryWrapper>
        <Bold>{caption}</Bold>
        <TableWrapper nColumns={colLabels.length}>
            {
                colLabels
                    .map((r,i)=>(<TableHeader key={`h-${i}`}><Text>{r}</Text></TableHeader>))
            }
            {
                rows
                    .reduce((acc,r)=>([...acc,...r]),[])
                    .map((r,i)=>(<span key={`b-${i}`}><Text>{r}</Text></span>))
            }
        </TableWrapper>
    </TableEntryWrapper>
)

export default Table