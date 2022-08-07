import styled from 'styled-components'
import PrintLegalInfo from './PrintLegalInfo'

const PrintableDocument = styled.main`
    @media print {
        font-size:0.5em;
    }
`

const sectionNameToComponent = {
    'Legal Info': PrintLegalInfo,
}

const renderSection = section => {
    const SectionComponent = sectionNameToComponent[section.name]
    if(SectionComponent) {
        return (<SectionComponent {...section} />)
    }
    return (<section>
        <h1>{section.name}</h1>
        {section.entries.map((e, i) => {
            let content
            if(typeof e === 'object'){
                if(['section','entries'].includes(e.type)){
                    content = renderSection(e)
                }else{
                    console.log(e.name, 'if of unsupported type', e.type)
                    //TODO: types image, inline, inset, list, table
                }
            }else{
                content = <p>{e}</p>
            }
            return (<span key={`${section.name}+${i}`}>{content}</span>)
        })}
    </section>)
}

const PrintFriendlyApp = ({sections}) => (<PrintableDocument>
    {sections.map(renderSection)}
</PrintableDocument>)
export default PrintFriendlyApp