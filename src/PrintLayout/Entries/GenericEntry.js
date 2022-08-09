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

const SubEntry = styled.div`
    font-size: 0.9em;
    > * {
        text-indent: 0.8em;
    }
`

const InsetEntry = styled(SubEntry)`
    border: 1px dotted black;
    padding: 0.5em;
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
                    .map((e,i)=>(
                        <IndentedParagraph key={i}>
                            <GenericEntry name={e.optionalfeature} {...e} />
                        </IndentedParagraph>
                    ))
            }
        </div>)
    }

    if(b.type==='inset'){
        return (
            <InsetEntry
                key={i}
            >
                <GenericEntry {...b}/>
            </InsetEntry>
        )
    }


    return (
        <SubEntry
            key={i}
        >
            <GenericEntry {...b}/>
        </SubEntry>
    )
}

const GenericEntry = ({name, type, entries=[], titleDivider='.', children, ...rest}) => {
    let [firstEntry='', ...otherEntries] = entries
    if(typeof entries === 'string') {
        firstEntry = entries
        otherEntries = []
    }
    if(type === 'refOptionalfeature'){
        if(rest.optionalfeature.includes('|')) { return; }//if optional feature is from a variant source
        [firstEntry='', ...otherEntries] = srd.references
            .optionalFeatures.entries
            .find(of=>of.name === rest.optionalfeature)
            .entries
    }

    if(type === 'refSubclassFeature'){
        return
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