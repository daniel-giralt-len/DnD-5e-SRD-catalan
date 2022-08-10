import styled from 'styled-components'
import { capitalizeFirstLetter } from '../../textModifiers'
import { creatureSizeLabel, alignmentLabel, femaleCreatureSizeLabel, getAlignmentLabel } from '../../translationLists'
import GenericEntry from './GenericEntry'
import ColonEntry from './ColonEntry'

const Wrapper = styled.div`
    break-inside: avoid-column;
`

const Italic = styled.p`font-style:italic;`

const getTypeText = type => typeof type === 'string' ? type : type.type

const getCreatureSizeText = (type, size) => ['bèstia','monstrositat', 'fata', 'planta'].includes(getTypeText(type)) ? femaleCreatureSizeLabel[size] : creatureSizeLabel[size]

const getAlignmentText = as => {
    if(typeof as[0] !== 'object'){
        const out = getAlignmentLabel(as)
        if(out) return out
    }
    return as
        .map(a => {
            if(typeof a === 'string') { return alignmentLabel[a] }
            return `${getAlignmentText(a.alineament)} (${a.chance}%)`
        })
        .join(' ')
    
}

const getACText = acs => {
    return acs
        .map(ac => {
            if(typeof ac !== 'object') { return ac.toString() }
            const from = ac.from ? `(${ac.from})` : ''
            const condition = ac.condition ? `${ac.condition}` : ''
            return`${ac.ac} ${from} ${condition}`
        })
        .join(', ')
}

const getHPText = ({average, formula}) => `${average} (${formula})`

const getSpeedsText = s => {
    return Object.entries(s)
        .map(([k,v]) => {
            const base = `${v.number || v} peus`
            const c = v.condition || ''
            if(k==='walk') return `${base} ${c}`
            if(k==='swim') return `${base} de natació ${c}`
            if(k==='fly' || k === 'volar') return `${base} de vol ${c}`
            if(k==='canHover') return `pot flotar ${c}`
            if(k==='climb') return `${base} d'escalada ${c}`
            if(k==='burrow') return `${base} excavant ${c}`
            console.info('no method for speed',k)
        })
        .join(', ')
}

const Bestiary = ({
    name,
    type, size, alineament,
    ac,
    hp,
    speed,
}) => (
    <Wrapper>
        <h2>{name}</h2>
        <Italic>{capitalizeFirstLetter(getTypeText(type))} {getCreatureSizeText(type, size).toLowerCase()}, {getAlignmentText(alineament)}</Italic>
        <div>
            <ColonEntry name="Classe d'Armadura (CA)" entry={getACText(ac)} />
            <ColonEntry name="Punts de Vida (PV)" entry={getHPText(hp)}/>
            <ColonEntry name="Velocitat" entry={getSpeedsText(speed)} />
        </div>
    </Wrapper>
    )

export default Bestiary
