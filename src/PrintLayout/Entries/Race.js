import styled from 'styled-components'
import Text from '../../EnrichedText'

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

const AbilityScoreIncrease = styled.span`
    margin-left: 0.1em;
    font-weight: bold;
`

const ParagraphTitleStyle = styled.span`
    font-style: italic;
`

const RaceEntry = styled.section`
    margin: 0.6em 0;
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

const ParagraphTitle = ({children, inline=false}) => (<ParagraphTitleStyle inline={inline}>{children}. </ParagraphTitleStyle>)

const SkillsEntries = (skills) => (
    <RaceEntry>
        <ParagraphTitle>Competència a Habilitats</ParagraphTitle>
        {Object.entries(skills).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>
                    Escull-ne <Bold>{v.count || 1}</Bold> d'entre {v.from.map(k=>skillKeyToLabel[k]).join(', ')}
                </span>)
            }
            return (<AbilityScoreIncrease key={k}>{skillKeyToLabel[k.toString()]}</AbilityScoreIncrease>)
        }).reduce((prev, curr) => [prev, ', ', curr])}
        .
    </RaceEntry>
)

const AbilityArray = (abilities) => (
    <RaceEntry>
        <ParagraphTitle>Increment de Puntuació de Característica</ParagraphTitle>
        {Object.entries(abilities).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>
                    i reparteix <Bold>{v.count || 1}</Bold> punts entre <Bold>{v.from.map(k=>abilityKeyToLabel[k]).join(', ')}</Bold>
                </span>)
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
                    .map(r=>(<Text>{r}</Text>))
            }
        </TableWrapper>
    </div>
)

const IndentedParagraph = styled.p`
    text-indent: 1em;
    margin-top: 0.05em;
`

const renderEntry = e => {
    const [firstEntry, ...entries] = e.entries
    return (<RaceEntry key={e.name}>
        <ParagraphTitle>{e.name}</ParagraphTitle>
        <Text>{firstEntry.toString()}</Text>
        {entries.map((b,i)=>{
            if(typeof b === 'string'){return (<IndentedParagraph key={i}><Text>{b.toString()}</Text></IndentedParagraph>)}
            if(b.type === 'table'){ return (<Table {...b} />)}
            return (<SubEntry>{renderEntry(b)}</SubEntry>)
       })}
    </RaceEntry>)
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
        {entries && entries.map(renderEntry)}
        {r.length > 0 && <Warning>{JSON.stringify(r)}</Warning>}
        {!isSubrace && subraces && subraces.map((s,i)=>(<Race key={i} isSubrace={true} {...s}/>))}
    </ArticleWrapper>
)}

export default Race