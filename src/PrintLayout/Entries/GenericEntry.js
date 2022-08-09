import styled from 'styled-components'
import Text from '../../EnrichedText'
import Table from './Table'
import DCSave from './DCSave'
import AttackMod from './AttackMod'

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

const ParagraphTitle = ({children, inline=false, divider}) => (
    <ParagraphTitleStyle inline={inline}>{children}{divider} </ParagraphTitleStyle>
)

const GenericEntry = ({name, entries=[], titleDivider='.', children}) => {
    let [firstEntry='', ...otherEntries] = entries
    if(typeof entries === 'string') {
        firstEntry = entries
        otherEntries = []
    }
    return (<GenericEntryWrapper key={name}>
        {name && (<ParagraphTitle divider={titleDivider}>{name}</ParagraphTitle>)}
        {children}
        <Text>{firstEntry}</Text>
        {otherEntries.map((b,i)=>{
            if(typeof b === 'string'){
                return (
                    <IndentedParagraph key={i}>
                        <Text>{b}</Text>
                    </IndentedParagraph>
                )
            }

            if(b.type === 'table'){
                return (<Table key={i} {...b} />)
            }

            if(b.type === 'abilityDc'){
                return (<DCSave key={i} {...b} />)
            }

            if(b.type === 'abilityAttackMod'){
                return (<AttackMod key={i} {...b} />)
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