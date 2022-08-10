import styled from 'styled-components'
import { capitalizeFirstLetter } from '../../textModifiers'
import { creatureSizeLabel, alignmentLabel, femaleCreatureSizeLabel } from '../../translationLists'

const Wrapper = styled.div`
    break-inside: avoid-column;
`

const Italic = styled.p`font-style:italic;`

const getTypeText = type => typeof type === 'string' ? type : type.type

const getCreatureSizeText = (type, size) => ['bèstia','monstrositat', 'fata', 'planta'].includes(getTypeText(type)) ? femaleCreatureSizeLabel[size] : creatureSizeLabel[size]

const getAlignmentText = as => {
    return as
    .map(a => {
        if(typeof a === 'string') { return alignmentLabel[a] }
        return `${getAlignmentText(a.alineament)} (${a.chance}%)`
    }).join(' ')
}

const Bestiary = ({
    name,
    type, size, alineament
}) => (
    <Wrapper>
        <h2>{name}</h2>
        <Italic>{capitalizeFirstLetter(getTypeText(type))} {getCreatureSizeText(type, size).toLowerCase()}, {getAlignmentText(alineament)}</Italic>
    </Wrapper>
    )

export default Bestiary
