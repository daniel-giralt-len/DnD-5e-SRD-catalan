import styled from 'styled-components'
import Text from '../../EnrichedText'

const GenericEntryWrapper = styled.div`
    margin: 0.6em 0;
`

const IndentedParagraph = styled.div`
    text-indent: 1em;
    margin-top: 0.05em;
`

const ParagraphTitleStyle = styled.span`
    font-style: italic;
    font-weight: 700;
`

const SubEntry = styled.span`
    font-size: 0.9em;
    > * {
        text-indent: 0.8em;
    }
`

const TableWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({nColumns})=>nColumns}, auto)
`

const TableEntryWrapper = styled(GenericEntryWrapper)`
    break-inside: avoid-column;
`

const Bold = styled.span`font-weight: bold;`

const Table = ({caption, colLabels, rows}) => (
    <TableEntryWrapper>
        <Bold>{caption}</Bold>
        <TableWrapper nColumns={colLabels.length}>
            {
                colLabels
                    .map((r,i)=>(<ParagraphTitleStyle key={`h-${i}`}><Text>{r}</Text></ParagraphTitleStyle>))
            }
            {
                rows
                    .reduce((acc,r)=>([...acc,...r]),[])
                    .map((r,i)=>(<span key={`b-${i}`}><Text>{r}</Text></span>))
            }
        </TableWrapper>
    </TableEntryWrapper>
)

const ParagraphTitle = ({children, inline=false, divider}) => (<ParagraphTitleStyle inline={inline}>{children}{divider} </ParagraphTitleStyle>)

const GenericEntry = ({name, entries=[], titleDivider='.', children}) => {
    let [firstEntry='', ...otherEntries] = entries
    if(typeof entries === 'string') {
        firstEntry = entries
    }
    return (<GenericEntryWrapper key={name}>
        <ParagraphTitle divider={titleDivider}>{name}</ParagraphTitle>
        {children}
        <Text>{firstEntry.toString()}</Text>
        {otherEntries.map((b,i)=>{
            if(typeof b === 'string'){
                return (
                    <IndentedParagraph key={i}>
                        <Text>{(b).toString()}</Text>
                    </IndentedParagraph>
                )
            }

            if(b.type === 'table'){
                return (<Table key={i} {...b} />)
            }

            return (
                <SubEntry key={i}>
                    <GenericEntry {...b}/>
                </SubEntry>
            )
       })}
    </GenericEntryWrapper>)
}

export default GenericEntry
export {
    ParagraphTitle,
    GenericEntryWrapper
}