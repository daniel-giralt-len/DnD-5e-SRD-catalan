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

const sectionNameToHrefId = {
    'Legal Info': 'legal info',
    'Races': 'races',
}

const PrintFriendlyApp = ({sections}) => {
    const s = sections.reduce((acc,ss) => ({...acc, [ss.name]:ss}),{})
    return(<PrintableDocument>
        <DocumentIndex indexableSections={sectionNameToHrefId} />
        <PrintLegalInfo 
            {...s['Legal Info']}
            hrefId={sectionNameToHrefId['Legal Info']}
        />
        <RacesSection 
            {...s['Races']}
            hrefId={sectionNameToHrefId['Races']}
            RacialTraits={<GenericSection doesPageBreak={false} {...s['Trets Racials']} />}
        />
    </PrintableDocument>)
}
export default PrintFriendlyApp