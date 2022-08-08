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


const restToIgnore = ['page','source','srd','soundClip']

const Race = ({
    name,
    ability,
    speed,
    ...rest
},i) => {
    return(
    <article key={i}>
        <h3>{name}</h3>
        {ability && <AbilityArray {...ability[0]}/>}
        {speed && <SpeedEntry value={speed} />}
        {JSON.stringify(Object.keys(rest).filter(k=>!restToIgnore.includes(k)))}
    </article>
)}

export default Race