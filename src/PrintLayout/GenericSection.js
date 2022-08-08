import styled from 'styled-components'
import Text from '../EnrichedText'
import GenericEntry from './Entries/GenericEntry'

const SectionWrapper = styled.article`
    ${({doesPageBreak}) => doesPageBreak ? 'break-after: page;' : ''}
    column-count: 2;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 1;
    }
`

const renderEntry = (e, i, keyStack) => {
    let content
    if(typeof e === 'object'){
        if(['section','entries'].includes(e.type)){
            content = (<GenericEntry key={e.name} {...e} />)
        }else{
            //console.warn(e.name, 'is of unsupported type', e.type)
            //TODO: types image, inline, inset, list, table
        }
    }else{
        content = <p><Text>{e}</Text></p>
    }
    return (<span key={`${keyStack}-${i}`}>{content}</span>)
}

const GenericSection = ({name, entries, doesPageBreak=true, hrefId}) => (
    <SectionWrapper id={hrefId} doesPageBreak={doesPageBreak}>
        <h2>{name}</h2>
        {entries.map((e,i)=>renderEntry(e,i,name))}
    </SectionWrapper>
)

export default GenericSection