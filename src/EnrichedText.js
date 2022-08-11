import { toSignedStr } from './textModifiers'
import { Bold, Italic } from './TextStyles'

const fallback = a => a[2]||a[0]
const italic = (a,i)=>(<Italic key={i}>{a}</Italic>)
const bold = (a,i)=>(<Bold key={i}>{a}</Bold>)
const none = () => ''

const linkBuilder = {
    '5etools': a=>a[0],
    action: fallback,
    atk: none,
    b: bold,
    book: a=>a[0],
    chance: a=>a[1]||a[0],
    class: fallback,
    classFeature: a=>a[0],
    condition: fallback,
    creature: fallback,
    d20: toSignedStr,
    damage: fallback,
    dc: a=>`CD ${a[0]}`,
    deity: a=>a[0],
    dice: fallback,
    h: none,
    hit: toSignedStr,
    i: italic,
    item: fallback,
    language: fallback,
    note: italic,
    race: fallback,
    recharge: a=> (a ? `(Recarrega de ${a} a 6` : 'Recarrega a 6)'),
    scaledamage: fallback,
    scaledice: fallback,
    sense: fallback,
    skill: fallback,
    spell: italic,
    table: fallback
}

const buildHyperLink = (data,i) => {
    const [linkType, ...linkRest] = data.split(' ')
    const linkData = linkRest.join(' ')
    const linkArguments = linkData.split('|')
    if(linkType === 'filter'){
        return linkArguments[0]
    }
    if(!linkBuilder[linkType]){
        console.warn('no builder for', linkType, '; arguments are', linkArguments)
        return linkArguments[2] || linkArguments[0]
    }
    return linkBuilder[linkType](linkArguments,i)
}

const parseLinks = s => s
    .toString()
    .split(/{|}/g).map((s,i)=>
        s[0]==='@'
        ? buildHyperLink(s.substring(1), i)
        : s
    )
    //.replace(/{@(.*?)}/gi, buildHyperLink)

const EnrichedText = ({children=''}) => {
    return (<>{parseLinks(children)}</>)
}

export default EnrichedText
export {
    parseLinks
}