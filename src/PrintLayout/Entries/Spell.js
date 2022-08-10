import styled from 'styled-components'
import { schoolLabel } from '../../translationLists'
import ColonEntry from './ColonEntry'

const Wrapper = styled.div`
    break-inside: avoid-column;
`

const getLevelText = lvl => lvl === 0 ? 'Truc' : `Nivell ${lvl}`

const getCastingTimeText = o => `${o.number} ${o.unit === 'bonus' ? 'acció bonus' : o.unit} ${o.condition ? o.condition : ''}`

const getComponentsText = ({v,s,m}) => [
    v?'V':null,
    s?'S':null,
    m?`M (${m.text || m})`:''
].filter(i=>i).join(', ')

const durationsPlurals = {
    ronda: ['ronda','rondes'],
    minut: ['minut','minuts'],
    hora: ['hora','hores'],
    dia: ['dia','dies'],
}
const lengthsPlurals = {
    peus: ['peu','peus'],
    milles: ['milla','milles']
}

const getPlural = (t,a,l) => a === 1 ? l[t][0] : l[t][1]
const getDurationPlural = (t,a) => getPlural(t,a,durationsPlurals)
const getLengthsPlural = (t,a) => getPlural(t,a,lengthsPlurals)

const getDurationText = ({
    type,
    duration,
    concentration,
    ends
}) => {
    if(type === 'cronometrada'){
        let out = `${duration.amount} ${getDurationPlural(duration.type, duration.amount)}`
        if(concentration){ out = `Concentració, fins a ${out}`}
        return out
    }
    if(type === 'permanent'){
        let out = 'Fins que es dissipi'
        if(ends.includes('trigger')){ out += ' o es detoni'}
        return out
    }
    if(type === 'instant'){ return 'Instantània' }
    if(type === 'especial'){ return 'Especial' }
    console.info(type)
}

const getRangeText = ({
    type,
    distance
}) => {
    if(type === 'especial') { return 'Especial'}
    if(type === 'point') {
        if(distance.type === 'tocar') { return 'Tocar' }
        if(distance.type === 'peus') { return `${distance.amount} peus` }
        if(distance.type === 'llançador') { return `Llançador/a/i` }
        if(distance.type === 'a vista') { return `A vista` }
        if(distance.type === 'unlimited') { return `Il·limitat` }
        if(distance.type === 'milles') { return `${distance.amount} ${distance.amount === 1 ? 'milla' : 'milles'}`}
    }
    const distanceWords = `${distance.amount} ${getLengthsPlural(distance.type, distance.amount)}`
    const centered = '(Llançador/a/i)'
    if(type === 'hemisphere') { return `Hemisferi de ${distanceWords} de radi ${centered}`}
    if(type === 'esfera') { return `Esfera de ${distanceWords} de radi ${centered}`}
    if(type === 'radius') { return `${distanceWords} de radi ${centered}`}
    if(type === 'line') { return `Línia de ${distanceWords} ${centered}`}
    if(type === 'cube') { return `Cub de ${distanceWords} de costat ${centered}`}
    if(type === 'con') { return `Con de ${distanceWords} ${centered}`}
    console.info('unknown spell range type',type)
}

const Spell = ({
    name,
    srd,
    level,
    school,
    time,
    components,
    duration,
    range
}) => (
    <Wrapper>
        <h2>{typeof srd === 'string' ? srd : name}</h2>
        <div>
            <span>{getLevelText(level)}</span>, <span>{schoolLabel[school]}</span>
            <ColonEntry name='Duració de Llançament' entry={getCastingTimeText(time[0])} />
            <ColonEntry name='Abast' entry={getRangeText(range)} />
            <ColonEntry name='Components' entry={getComponentsText(components)} />
            <ColonEntry name='Duració' entry={getDurationText(duration[0])}/>
        </div>
    </Wrapper>
    )

export default Spell
