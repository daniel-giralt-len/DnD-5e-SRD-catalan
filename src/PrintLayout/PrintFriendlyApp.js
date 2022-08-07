import styled from 'styled-components'
import PrintLegalInfo from './PrintLegalInfo'
import BasePrintSection from './BasePrintSection'

const PrintableDocument = styled.main`
    @media print {
        font-size:0.5em;
    }
`

const sectionNameToComponent = {
    'Legal Info': PrintLegalInfo,
}

const renderSection = (section, i) => {
    const SectionComponent = sectionNameToComponent[section.name]
    if(SectionComponent) {
        return (<SectionComponent key={i} {...section} />)
    }
    return (<BasePrintSection key={i} {...section} />)
}

const PrintFriendlyApp = ({sections}) => (<PrintableDocument>
    {sections.map(renderSection)}
</PrintableDocument>)
export default PrintFriendlyApp