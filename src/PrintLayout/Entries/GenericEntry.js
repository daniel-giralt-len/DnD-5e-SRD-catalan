import styled from 'styled-components'
import Text from '../../EnrichedText'

const GenericEntryWrapper = styled.section`
    margin: 0.6em 0;
`

const IndentedParagraph = styled.p`
    text-indent: 1em;
    margin-top: 0.05em;
`

const ParagraphTitleStyle = styled.span`
    font-style: italic;
`

const SubEntry = styled.span`
    font-size: 0.9em;
    > * {
        text-indent: 0.8em;
    }
`

const TableWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({nColumns})=>nColumns}, 1fr)
`

const Bold = styled.span`font-weight: bold;`

const Table = ({caption, colLabels, rows}) => (
    <div>
        <Bold>{caption}</Bold>
        <TableWrapper nColumns={colLabels.length}>
            {
                colLabels
                    .map(r=>(<ParagraphTitleStyle><Text>{r}</Text></ParagraphTitleStyle>))
            }
            {
                rows
                    .reduce((acc,r)=>([...acc,...r]),[])
                    .map(r=>(<span><Text>{r}</Text></span>))
            }
        </TableWrapper>
    </div>
)

const ParagraphTitle = ({children, inline=false}) => (<ParagraphTitleStyle inline={inline}>{children}. </ParagraphTitleStyle>)

const GenericEntry = e => {
    const [firstEntry, ...entries] = e.entries
    return (<GenericEntryWrapper key={e.name}>
        <ParagraphTitle>{e.name}</ParagraphTitle>
        <Text>{firstEntry.toString()}</Text>
        {entries.map((b,i)=>{
            if(typeof b === 'string'){
                return (
                    <IndentedParagraph key={i}>
                        <Text>{b.toString()}</Text>
                    </IndentedParagraph>
                )
            }

            if(b.type === 'table'){ return (<Table {...b} />)}

            return (<SubEntry><GenericEntry {...b}/></SubEntry>)
       })}
    </GenericEntryWrapper>)
}

export default GenericEntry
export {
    ParagraphTitle,
    GenericEntryWrapper
}