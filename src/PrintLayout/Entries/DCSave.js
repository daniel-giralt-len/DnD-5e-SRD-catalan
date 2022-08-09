import styled from 'styled-components'
import { abilityScoreLabel } from '../../translationLists'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.3em;
`

const DCSave = ({attributes}) => (
    <Wrapper>
        CD de Salvada = 8 + Bonus de Competència + {abilityScoreLabel[attributes]}
    </Wrapper>)

export default DCSave
