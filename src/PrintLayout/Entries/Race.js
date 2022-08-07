import styled from 'styled-components'

const toSignedStr = n => n < 0 ? `-${n}` : `+${n}`

const Ability = styled.p``

const AbilityArray = ({str=0, dex=0, con=0, int=0, wis=0, cha=0, choose=false}) => (
    <div>
        <Ability>FRÇ: {toSignedStr(str)}</Ability>
        <Ability>DES: {toSignedStr(dex)}</Ability>
        <Ability>CON: {toSignedStr(con)}</Ability>
        <Ability>INT: {toSignedStr(int)}</Ability>
        <Ability>SAV: {toSignedStr(wis)}</Ability>
        <Ability>CAR: {toSignedStr(cha)}</Ability>
    </div>
)

const Race = ({
    name,
    ability,
    ...rest
},i) => {
    return(
    <article key={i}>
        <h4>{name}</h4>
        {ability && <AbilityArray {...ability[0]}/>}
        {JSON.stringify(Object.keys(rest))}
    </article>
)}

export default Race