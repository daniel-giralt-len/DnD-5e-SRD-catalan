import styled from 'styled-components'
import Text from '../EnrichedText'
import GenericEntry from './Entries/GenericEntry'

const SectionWrapper = styled.article`
    break-after: page;
`

const renderEntry = (e, i, keyStack) => {
    let content
    if(typeof e === 'object'){
        if(['section','entries'].includes(e.type)){
            content = renderEntry(e.entries, i, `${keyStack}-${e.name}`)
        }else{
            //console.warn(e.name, 'if of unsupported type', e.type)
            //TODO: types image, inline, inset, list, table
        }
    }else{
        content = <p><Text>{e}</Text></p>
    }
    return (<span key={`${keyStack}-${i}`}>{content}</span>)
}

const GenericSection = ({name, entries}) => (
    <SectionWrapper>
        <h2>{name}</h2>
        {entries.map((e,i)=>renderEntry(e,i,name))}
    </SectionWrapper>
)

export default GenericSection