import styled from 'styled-components'
import PrintLegalInfo from './PrintLegalInfo'
import GenericSection from './GenericSection'
import RacesSection from './RacesSection'
import DocumentIndex from './DocumentIndex'

const PrintableDocument = styled.main`
    max-width: 1200px;
    @media print {
        font-size:0.5em;
        max-width: 100%
    }
`

const RacialTraitsSection = params => (
    <GenericSection {...params} doesPageBreak={false} />
)

const sectionNameToComponent = {
    'Legal Info': PrintLegalInfo,
    'Trets Racials': RacialTraitsSection,
    'Races': RacesSection,
}

const sectionNameToHrefId = {
    'Legal Info': 'legal info',
    'Trets Racials': 'racial traits',
    'Races': 'races',
}

const renderSection = (section, i) => {
    const SectionComponent = sectionNameToComponent[section.name]
    if(SectionComponent) {
        return (<SectionComponent
            key={i}
            hrefId = {sectionNameToHrefId[section.name]}
            {...section}
        />)
    }
    return
}

const PrintFriendlyApp = ({sections}) => (<PrintableDocument>
    <DocumentIndex indexableSections={sectionNameToHrefId} />
    {sections.map(renderSection)}
</PrintableDocument>)
export default PrintFriendlyApp