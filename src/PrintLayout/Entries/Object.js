import styled from 'styled-components'
import { capitalizeFirstLetter } from '../../textModifiers'
import GenericEntry from './GenericEntry'

const Wrapper = styled.div`
    break-inside: avoid-column;
`

const getSubtitle = ({
    rarity,
    reqAttune,
    wondrous,
}) => {
    const p =[
        wondrous ? 'objecte meravellós' : '',
        rarity,
        reqAttune ? `necessita harmonització${typeof reqAttune === 'string' ? ` ${reqAttune}` : ''}` : ''
    ].filter(s=>s.length>0)
    const m = capitalizeFirstLetter(p.join(', '))
    return `{@i ${m}}`
}

const Object = (o) => (
    <Wrapper>
        <GenericEntry 
            {...o} 
            titleHeader={4}
            entries={[
                getSubtitle(o),
                ...o.entries
            ]}
        />
    </Wrapper>
)

export default Object
