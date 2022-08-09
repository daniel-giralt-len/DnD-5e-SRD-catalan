import styled from 'styled-components'
import GenericEntry, { ParagraphTitle, GenericEntryWrapper } from './GenericEntry'
import UnusedKeysWarning from '../UnusedKeysWarning'
import {
    abilityScoreLabel,
    creatureSizeLabel,
    skillLabel
} from '../../translationLists'
import { capitalizeFirstLetter, toSignedStr } from '../../textModifiers'

const ArticleWrapper = styled.article`
    ${({isSubrace})=> isSubrace ? '' : 'border-bottom: 1px solid black;'}
    ${({isSubrace})=> isSubrace ? '' : 'column-count: 2;'}
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 1;
    }
    break-inside: avoid;
    margin-bottom: 0.8em;
    padding-bottom: 0.4em;
`

const Bold = styled.span`font-weight: bold;`

const ScoreWrapper = styled.span`
    margin-left: 0.1em;
    font-weight: bold;
    white-space: nowrap;
`

const GenericScoreEntry = ({scores, title, choiceTextBuilder, buildText, keyMap}) => (
    <GenericEntryWrapper>
        <ParagraphTitle>{title}</ParagraphTitle>
        {Object.entries(scores).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>
                    {choiceTextBuilder(v.count || 1, v.from.map(k=>keyMap[k]).join(', '))}
                </span>)
            }
            return (<ScoreWrapper key={k}>{buildText(k,v,keyMap[k])}</ScoreWrapper>)
        }).reduce((prev, curr) => [prev, ', ', curr])}
        .
    </GenericEntryWrapper>
)


const SkillsEntry = skills => (
    <GenericScoreEntry 
        scores={skills}
        title='Competència a Habilitats'
        choiceTextBuilder={(score, list) => (<>Escull-ne <Bold>{score}</Bold> d'entre {list}</>)}
        buildText={(_,__,pk) => pk}
        keyMap={skillLabel}
    />
)

const AbilitiesEntry = abilities => (
    <GenericScoreEntry 
        scores={abilities}
        title='Increment de Puntuació de Característica'
        choiceTextBuilder={(score, list) => (<>i reparteix <Bold>{score}</Bold> punts entre {list}</>)}
        buildText={(_,v,pk) => `${pk} ${toSignedStr(v)}`}
        keyMap={abilityScoreLabel}
    />
)

const SpeedEntry = ({value}) => (<GenericEntry name='Velocitat' entries={[`${value} peus.`]} />)

const SizeEntry = ({value}) => (<GenericEntry name='Tamany' entries={[`${creatureSizeLabel[value]}.`]} />)

const DarkVisionEntry = ({value}) => (<GenericEntry name='Visió de Foscor' entries={[`${value} peus.`]} />)

const LanguagesEntry = ({value: {anyStandard, ...rest}}) => {
    let extraString = ''
    if(anyStandard === 1) extraString = ' i un idioma extra'
    if(anyStandard > 1) extraString = ` i ${anyStandard} idiomes extres`
    return (
        <GenericEntry
            name='Idiomes'
            entries={[
                capitalizeFirstLetter(Object.keys(rest).join(', '))
                + extraString
                + '.'
            ]}
        />
    )
}

const LineBreak = styled.div`
    border-top: 1px solid black;
`

const keysToIgnore = ['page','source','srd','soundClip', 'hasFluffImages', 'hasFluff', 'traitTags', 'resist', 'heightAndWeight', 'weaponProficiencies', 'additionalSpells', 'feats']

const Race = ({
    name,
    ability,
    speed,
    size,
    entries,
    languageProficiencies,
    ['visió de foscor']: darkvision,
    skillProficiencies,
    subraces: sr,
    isSubrace,
    ...rest
},i) => {
    let subraces = sr
    if(!isSubrace && name === 'Humà'){
        const [a, ...b] = sr
        ability = a.ability
        subraces = b
    }
    return(
    <ArticleWrapper isSubrace={isSubrace} key={i}>
        {isSubrace? <h4>Subraça: {name}</h4> : <h3>{name}</h3>}
        {ability && <AbilitiesEntry {...ability[0]}/>}
        {speed && <SpeedEntry value={speed} />}
        {size && <SizeEntry value={size} />}
        {skillProficiencies && <SkillsEntry {...skillProficiencies[0]} />}
        {languageProficiencies && <LanguagesEntry value={languageProficiencies[0]} />}
        {darkvision && <DarkVisionEntry value={darkvision} />}
        {!isSubrace && <LineBreak/>}
        {entries && entries.map(e => (<GenericEntry key={e.name} {...e} />))}
        <UnusedKeysWarning rest={rest} keysToIgnore={keysToIgnore} />
        {!isSubrace && subraces && subraces.map((s,i)=>(<Race key={i} isSubrace={true} {...s}/>))}
    </ArticleWrapper>
)}

export default Race