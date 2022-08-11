import styled from 'styled-components'
import { capitalizeFirstLetter } from '../../textModifiers'
import GenericEntry from './GenericEntry'
import srd from '../../srd.json'

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

const cleanReferences = (e,o) => {
    if(typeof e !== 'string') return e
    return e
        .replace(/{{(.*?)}}/gi, (match,data)=>{
            if(data==='item.resist') { return o.resist.join(', ') }
            console.warn('no item detail reference for',data)
        })
        .replace(/{=(.*?)}/gi, (match,data)=>{
            if(data==='bonusAc') { return o.bonusAc }
            if(data==='bonusWeapon') { return o.bonusWeapon }
            if(data==='dmgType') { return 'del dany de l\'arma extra' }
            console.warn('no bonus reference for',data)
        })
        .replace(/{#(.*?)}/gi, (match,data)=>{
            const [type, ...rest]=data.split(' ')
            if(type === 'itemEntry') {
                const itemName = rest.join(' ')
                console.log(itemName)
                const entry = srd.references.baseItems
                    .find(i=>i.name === itemName)
                    .entriesTemplate[0]
                return cleanReferences(entry, o)
             }
            console.warn('no item reference for',data)
        })

}

const Object = (o) => (
    <Wrapper>
        <GenericEntry 
            {...o} 
            titleHeader={4}
            entries={[
                getSubtitle(o),
                ...o.entries.map(e=>cleanReferences(e,o))
            ]}
        />
    </Wrapper>
)

export default Object
