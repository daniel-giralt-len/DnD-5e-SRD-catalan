import styled from 'styled-components'

const toSignedStr = n => n < 0 ? `-${n}` : `+${n}`

const ArticleWrapper = styled.article`
    border-bottom: 1px solid black;
`

const AbilityScoreIncrease = styled.span`
    margin-left: 3px;
    font-weight: bold;
`

const ParagraphTitleStyle = styled.span`
    font-style: italic;
`

const RaceEntry = styled.p``

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

const ParagraphTitle = ({children, inline=false}) => (<ParagraphTitleStyle inline={inline}>{children}. </ParagraphTitleStyle>)

const SkillsEntries = (skills) => (
    <RaceEntry>
        <ParagraphTitle>Competència a Habilitats</ParagraphTitle>
        {Object.entries(skills).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>Escull-ne <Bold>{v.count || 1}</Bold> entre {v.from.map(k=>skillKeyToLabel[k]).join(', ')}</span>)
            }
            return (<AbilityScoreIncrease key={k}>{skillKeyToLabel[k.toString()]}</AbilityScoreIncrease>)
        }).reduce((prev, curr) => [prev, ', ', curr])}
        .
    </RaceEntry>
)

const AbilityArray = (abilities) => (
    <RaceEntry>
        <ParagraphTitle>Bonus a les puntuacions de característica</ParagraphTitle>
        {Object.entries(abilities).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>i reparteix <Bold>{v.count || 1}</Bold> punts entre <Bold>{v.from.map(k=>abilityKeyToLabel[k]).join(', ')}</Bold></span>)
            }
            return (<AbilityScoreIncrease key={k}>{abilityKeyToLabel[k]} {toSignedStr(v)}</AbilityScoreIncrease>)
        }).reduce((prev, curr) => [prev, ', ', curr])}
        .
    </RaceEntry>
)

const SpeedEntry = ({value}) => (
    <RaceEntry>
        <ParagraphTitle>Velocitat</ParagraphTitle>
        {value} peus.
    </RaceEntry>
)

const SizeEntry = ({value}) => (
    <RaceEntry>
        <ParagraphTitle>Tamany</ParagraphTitle>
        {sizeKeyToLabel[value]}.
    </RaceEntry>
)

const DarkVisionEntry = ({value}) => (
    <RaceEntry>
        <ParagraphTitle>Visió de Foscor</ParagraphTitle>
        {value} peus.
    </RaceEntry>
)


const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1)
const LanguagesEntry = ({value: {anyStandard, ...rest}}) => (
    <RaceEntry>
        <ParagraphTitle>Idiomes</ParagraphTitle>
        {capitalizeFirstLetter(Object.keys(rest).join(', '))}
        {anyStandard && 
            (anyStandard === 1 
            ? ' i un idioma qualsevol'
            : ` i ${anyStandard} idiomes qualsevols`)
        }
        .
    </RaceEntry>
)

const LineBreak = styled.div`
    border-top: 1px solid black;
`

const Warning = styled.p`background-color: yellow; color: red;`

const restToIgnore = ['page','source','srd','soundClip', 'hasFluffImages', 'hasFluff', 'traitTags', 'resist', 'heightAndWeight', 'weaponProficiencies', 'additionalSpells', 'feats']

const renderEntry = e => {
    return (<p key={e.name}>
        <ParagraphTitle>{e.name}</ParagraphTitle>
        {e.entries.join('<br />')}
    </p>)
}

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
    console.log(name, ability)
    return(
    <ArticleWrapper key={i}>
        {isSubrace? <h4>Subraça: {name}</h4> : <h3>{name}</h3>}
        {ability && <AbilityArray {...ability[0]}/>}
        {speed && <SpeedEntry value={speed} />}
        {size && <SizeEntry value={size} />}
        {skillProficiencies && <SkillsEntries {...skillProficiencies[0]} />}
        {languageProficiencies && <LanguagesEntry value={languageProficiencies[0]} />}
        {darkvision && <DarkVisionEntry value={darkvision} />}
        {!isSubrace && <LineBreak/>}
        {entries && entries.map(renderEntry)}
        {r.length > 0 && <Warning>{JSON.stringify(r)}</Warning>}
        {!isSubrace && subraces && subraces.map((s,i)=>(<Race key={i} isSubrace={true} {...s}/>))}
    </ArticleWrapper>
)}

export default Race