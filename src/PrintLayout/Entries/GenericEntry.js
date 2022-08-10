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
    ${({isSubSection}) => isSubSection ? '': `
        font-size: 0.9em;
        > * {
            text-indent: 0.8em;
        }
    `}
`

const InsetEntry = styled(SubEntry)`
    border: 1px dotted black;
    padding: 0.5em;
`

const allowedHeaderLevels = 4

const EntryTitle = ({level, children, titleDivider}) => {
    if(!children) return
    if(level === 1){ return <h1>{children}</h1> }
    if(level === 2){ return <h2>{children}</h2> }
    if(level === 3){ return <h3>{children}</h3> }
    if(level === 4){ return <h4>{children}</h4> }
    return (<ParagraphTitle divider={titleDivider}>{children}</ParagraphTitle>)
}

const ParagraphTitle = ({children, inline=false, divider}) => (
    <ParagraphTitleStyle inline={inline}>{children}{divider} </ParagraphTitleStyle>
)

const renderEntry = (b,i,titleHeader,indent=true)=>{
    if(typeof b === 'string'){
        return indent
            ? (
                <IndentedParagraph key={i}>
                    <Text>{b}</Text>
                </IndentedParagraph>
            )
            : (<Text key={i}>{b}</Text>)   
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
                            <GenericEntry
                                name={e.optionalfeature}
                                {...e}
                            />
                        </IndentedParagraph>
                    ))
            }
        </div>)
    }

    if(b.type === 'list'){
        return (
            <div key={i}>
                {b.name && (<EntryTitle
                    level={titleHeader+1}
                >
                    {b.name}
                </EntryTitle>)}
                <ul>
                    {b.items.map((e,i) => (
                        <li key={i}>
                            {renderEntry(e,i,null,false)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    if(b.type==='inset'){
        return (
            <InsetEntry
                key={i}
            >
                <GenericEntry
                    {...b}
                    titleHeader={titleHeader+1}
                />
            </InsetEntry>
        )
    }

    const Entry = b.type === 'item' 
        ? (
            <GenericEntry
                {...b}
                entries={b.entries || [b.entry]}
            />
        )
        : (
            <GenericEntry
                {...b}
                titleHeader={titleHeader+1}
            />
        )

    return (
        <SubEntry
            key={i}
            isSubSection={titleHeader <= allowedHeaderLevels}
        >
            {Entry}
        </SubEntry>
    )
}

const GenericEntry = ({
    name,
    type,
    entries=[],
    titleDivider='.',
    children,
    titleHeader,
    ...rest
}) => {
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

    const Title = (
        <EntryTitle
            level={titleHeader}
            titleDivider={titleDivider}
        >
            {name}
        </EntryTitle>
    )
    
    return (<GenericEntryWrapper key={name}>
        {Title}
        {children}
        {renderEntry(firstEntry,-1, titleHeader, false)}
        {otherEntries.map((e,i) => renderEntry(e,i,titleHeader))}
    </GenericEntryWrapper>)
}

export default GenericEntry
export {
    ParagraphTitle,
    GenericEntryWrapper
}