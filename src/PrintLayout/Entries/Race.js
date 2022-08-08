import styled from 'styled-components'
import GenericEntry, { ParagraphTitle, GenericEntryWrapper } from './GenericEntry'

const toSignedStr = n => n < 0 ? `-${n}` : `+${n}`

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

const abilityKeyToLabel = {
    'str': 'FRÇ',
    'dex': 'DES',
    'con': 'CON',
    'int': 'INT',
    'wis': 'SAV',
    'cha': 'CAR'
}

const sizeKeyToLabel = {
    'S': 'Petit',
    'M': 'Mitjà'
}

const skillKeyToLabel = {
    'athletics': 'Atletisme',
    'acrobatics': 'Acrobàcies',
    'sleight of hand': 'Joc de Mans',
    'stealth': 'Sigil',
    'arcana': 'Arcana',
    'history': 'Història',
    'investigation': 'Investigació',
    'nature': 'Naturalesa',
    'religion': 'Religió',
    'animal handling': 'Tracte Animal',
    'insight': 'Perspicàcia',
    'medicine': 'Medicina',
    'perception': 'Percepció',
    'survival': 'Supervivència',
    'deception': 'Engany',
    'intimidation': 'Intimidació',
    'performance': 'Faràndula',
    'persuasion': 'Persuasió',
}

const ScoreWrapper = styled.span`
    margin-left: 0.1em;
    font-weight: bold;
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

const SkillsEntries = skills => (
    <GenericScoreEntry 
        scores={skills}
        title='Competència a Habilitats'
        choiceTextBuilder={(score, list) => (<>Escull-ne <Bold>{score}</Bold> d'entre {list}</>)}
        buildText={(_,__,pk) => pk}
        keyMap={skillKeyToLabel}
    />
)


const AbilityArray = abilities => (
    <GenericScoreEntry 
        scores={abilities}
        title='Increment de Puntuació de Característica'
        choiceTextBuilder={(score, list) => (<>i reparteix <Bold>{score}</Bold> punts entre {list}</>)}
        buildText={(_,v,pk) => `${pk} ${toSignedStr(v)}`}
        keyMap={abilityKeyToLabel}
    />
)

const SpeedEntry = ({value}) => (
    <GenericEntryWrapper>
        <ParagraphTitle>Velocitat</ParagraphTitle>
        {value} peus.
    </GenericEntryWrapper>
)

const SizeEntry = ({value}) => (
    <GenericEntryWrapper>
        <ParagraphTitle>Tamany</ParagraphTitle>
        {sizeKeyToLabel[value]}.
    </GenericEntryWrapper>
)

const DarkVisionEntry = ({value}) => (
    <GenericEntryWrapper>
        <ParagraphTitle>Visió de Foscor</ParagraphTitle>
        {value} peus.
    </GenericEntryWrapper>
)


const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1)
const LanguagesEntry = ({value: {anyStandard, ...rest}}) => (
    <GenericEntryWrapper>
        <ParagraphTitle>Idiomes</ParagraphTitle>
        {capitalizeFirstLetter(Object.keys(rest).join(', '))}
        {anyStandard && 
            (anyStandard === 1 
            ? ' i un idioma qualsevol'
            : ` i ${anyStandard} idiomes qualsevols`)
        }
        .
    </GenericEntryWrapper>
)

const LineBreak = styled.div`
    border-top: 1px solid black;
`

const Warning = styled.p`background-color: yellow; color: red;`

const restToIgnore = ['page','source','srd','soundClip', 'hasFluffImages', 'hasFluff', 'traitTags', 'resist', 'heightAndWeight', 'weaponProficiencies', 'additionalSpells', 'feats']

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
    const r = Object.keys(rest).filter(k=>!restToIgnore.includes(k))
    let subraces = sr
    if(!isSubrace && name === 'Humà'){
        const [a, ...b] = sr
        ability = a.ability
        subraces = b
    }
    return(
    <ArticleWrapper isSubrace={isSubrace} key={i}>
        {isSubrace? <h4>Subraça: {name}</h4> : <h3>{name}</h3>}
        {ability && <AbilityArray {...ability[0]}/>}
        {speed && <SpeedEntry value={speed} />}
        {size && <SizeEntry value={size} />}
        {skillProficiencies && <SkillsEntries {...skillProficiencies[0]} />}
        {languageProficiencies && <LanguagesEntry value={languageProficiencies[0]} />}
        {darkvision && <DarkVisionEntry value={darkvision} />}
        {!isSubrace && <LineBreak/>}
        {entries && entries.map(e => (<GenericEntry {...e} />))}
        {r.length > 0 && <Warning>{JSON.stringify(r)}</Warning>}
        {!isSubrace && subraces && subraces.map((s,i)=>(<Race key={i} isSubrace={true} {...s}/>))}
    </ArticleWrapper>
)}

export default Race