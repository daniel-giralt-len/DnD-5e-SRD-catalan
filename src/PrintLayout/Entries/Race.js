import styled from 'styled-components'

const toSignedStr = n => n < 0 ? `-${n}` : `+${n}`

const AbilityScoreIncrease = styled.span`
    margin-left: 3px;
    font-weight: bold;
`

const ParagraphTitleStyle = styled.span`
    font-style: italic;
`

const ParagraphTitle = ({children}) => <ParagraphTitleStyle>{children}. </ParagraphTitleStyle>

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

const AbilityArray = (abilities) => (
    <RaceEntry>
        <ParagraphTitle>Bonus a les puntuacions de característica</ParagraphTitle>
        {Object.entries(abilities).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>i reparteix <Bold>{v.count}</Bold> punts entre <Bold>{v.from.map(k=>abilityKeyToLabel[k]).join(', ')}</Bold></span>)
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
    border-top: 2px solid black;
`

const Warning = styled.p`background-color: yellow; color: red;`

const restToIgnore = ['page','source','srd','soundClip', 'hasFluffImages', 'hasFluff', 'traitTags', 'resist']

const renderEntry = e => {
    return (<div key={e.name}>
        <ParagraphTitle>{e.name}</ParagraphTitle>
        {e.entries.map((e2,i)=>(<p key={i}>{e2.toString()}</p>))}
    </div>)
}

const Race = ({
    name,
    ability,
    speed,
    size,
    entries,
    languageProficiencies,
    ['visió de foscor']: darkvision,
    ...rest
},i) => {
    console.log(darkvision)
    return(
    <article key={i}>
        <h3>{name}</h3>
        {ability && <AbilityArray {...ability[0]}/>}
        {speed && <SpeedEntry value={speed} />}
        {size && <SizeEntry value={size} />}
        {languageProficiencies && <LanguagesEntry value={languageProficiencies[0]} />}
        {darkvision && <DarkVisionEntry value={darkvision} />}
        <LineBreak/>
        {entries && entries.map(renderEntry)}
        <Warning>{JSON.stringify(Object.keys(rest).filter(k=>!restToIgnore.includes(k)))}</Warning>
    </article>
)}

export default Race