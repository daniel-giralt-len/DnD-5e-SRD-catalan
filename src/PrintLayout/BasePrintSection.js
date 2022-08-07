import styled from 'styled-components'

const SectionWrapper = styled.div`
    @media print {
        page-break-after: always;
    }
`

const renderEntry = e => {
    let content
    if(typeof e === 'object'){
        if(['section','entries'].includes(e.type)){
            content = renderEntry(e.entries)
        }else{
            //console.warn(e.name, 'if of unsupported type', e.type)
            //TODO: types image, inline, inset, list, table
        }
    }else{
        content = <p>{e}</p>
    }
    return (<span>{content}</span>)
}

const BasePrintSection = ({name, entries}) => (
    <SectionWrapper>
        <h2>{name}</h2>
        {entries.map(renderEntry)}
    </SectionWrapper>
)

export default BasePrintSection