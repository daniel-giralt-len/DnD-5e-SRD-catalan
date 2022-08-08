import styled from 'styled-components'

const toSignedStr = n => n < 0 ? `-${n}` : `+${n}`

const AbilityScoreIncrease = styled.span`
    margin-left: 3px;
    font-weight: bold;
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

const AbilityArray = (abilities) => (
    <div>
        Bonus a les puntuacions de característica. 
        {Object.entries(abilities).map(([k,v]) => {
            if(k==='choose'){
                return (<span key={k}>i reparteix <Bold>{v.count}</Bold> punts entre <Bold>{v.from.map(k=>abilityKeyToLabel[k]).join(', ')}</Bold></span>)
            }
            return (<AbilityScoreIncrease key={k}>{abilityKeyToLabel[k]} {toSignedStr(v)}</AbilityScoreIncrease>)
        }).reduce((prev, curr) => [prev, ', ', curr])}
        .
    </div>
)


const restToIgnore = ['page','source','srd','soundClip']

const Race = ({
    name,
    ability,
    ...rest
},i) => {
    return(
    <article key={i}>
        <h3>{name}</h3>
        {ability && <AbilityArray {...ability[0]}/>}
        {JSON.stringify(Object.keys(rest).filter(k=>!restToIgnore.includes(k)))}
    </article>
)}

export default Race