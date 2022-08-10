import styled from 'styled-components'
import { schoolLabel } from '../../translationLists'
import GenericEntry from './GenericEntry'
import ColonEntry from './ColonEntry'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.3em;
`

const getLevelText = lvl => lvl === 0 ? 'Truc' : `Nivell ${lvl}`

const getCastingTimeText = o => `${o.number} ${o.unit === 'bonus' ? 'acció bonus' : o.unit} ${o.condition ? o.condition : ''}`

const getComponentsText = ({v,s,m}) => [
    v?'V':null,
    s?'S':null,
    m?`M (${m.text || m})`:''
].filter(i=>i).join(', ')

const getDurationText = ({
    type,
    duration,
    concentration,
    ends
}) => {
    if(type === 'cronometrada'){
        let out = ''
        if(concentration){ out += 'Concentració, fins a '}
        out += `${duration.amount} `
        const durationWords = {
            ronda: ['ronda','rondes'],
            minut: ['minut','minuts'],
            hora: ['hora','hores'],
            dia: ['dia','dies'],
        }
        if(duration.amount === 1){ out += durationWords[duration.type][0]}
        else{ out += durationWords[duration.type][1]}
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

const Spell = ({
    name,
    level,
    school,
    time,
    components,
    duration
}) => (
    <div>
        <h2>{name}</h2>
        <div>
            <span>{getLevelText(level)}</span>, <span>{schoolLabel[school]}</span>
            <ColonEntry name='Duració de Llançament' entry={getCastingTimeText(time[0])} />
            <ColonEntry name='Abast' />
            <ColonEntry name='Components' entry={getComponentsText(components)} />
            <ColonEntry name='Duració' entry={getDurationText(duration[0])}/>
        </div>
    </div>
    )

export default Spell
