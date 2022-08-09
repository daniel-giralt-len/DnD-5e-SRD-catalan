import styled from 'styled-components'
import Text from '../../EnrichedText'
import Table from './Table'
import DCSave from './DCSave'
import AttackMod from './AttackMod'
import srd from '../../srd.json'

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

const renderEntry = (b,i)=>{
    if(typeof b === 'string'){
        if(i===-1){
            return (<Text>{b}</Text>)   
        }
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

    if(b.type === 'options'){
        return(<div key={i}>
            {
                b.entries
                    .filter(e=>!e.optionalfeature.includes('|'))
                    .map(e=>(
                        <IndentedParagraph key={e.optionalfeature}>
                            <GenericEntry name={e.optionalfeature} {...e} />
                        </IndentedParagraph>
                    ))
            }
        </div>)
    }

    console.info('no generic entry for',b.type,'with name',b.name)

    return (
        <SubEntry key={i}>
            <GenericEntry {...b}/>
        </SubEntry>
    )
}

const GenericEntry = ({name, type, entries=[], titleDivider='.', children}) => {
    let [firstEntry='', ...otherEntries] = entries
    if(typeof entries === 'string') {
        firstEntry = entries
        otherEntries = []
    }
    if(type === 'refOptionalfeature'){
        [firstEntry='', ...otherEntries] = srd.references
            .optionalFeatures.entries
            .find(of=>of.name === name)
            .entries
    }
    return (<GenericEntryWrapper key={name}>
        {name && (<ParagraphTitle divider={titleDivider}>{name}</ParagraphTitle>)}
        {children}
        {renderEntry(firstEntry,-1)}
        {otherEntries.map(renderEntry)}
    </GenericEntryWrapper>)
}

export default GenericEntry
export {
    ParagraphTitle,
    GenericEntryWrapper
}