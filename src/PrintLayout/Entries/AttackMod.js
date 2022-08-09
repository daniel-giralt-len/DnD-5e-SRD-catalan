import styled from 'styled-components'
import { abilityScoreLabel } from '../../translationLists'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.3em;
`

const AttackMod = ({attributes}) => (
    <Wrapper>
        Modificador d'Atac = 8 + {abilityScoreLabel[attributes]}
    </Wrapper>)

export default AttackMod
