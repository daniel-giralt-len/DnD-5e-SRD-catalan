import styled from 'styled-components'
import PrintLegalInfo from './PrintLegalInfo'
import GenericSection from './GenericSection'
import RacesSection from './RacesSection'
import DocumentIndex from './DocumentIndex'
import ClassSection from './ClassSection'

const PrintableDocument = styled.main`
    max-width: 1200px;
    @media print {
        font-size:0.5em;
        max-width: 100%;
    }
`

const sectionNameToHrefId = {
    'Legal Info': 'legal info',
    'Races': 'races',
    'Bàrbar': 'barbar',
    'Bard': 'bard',
    'Brivall': 'brivall',
    'Bruixot': 'bruixot',
    'Clergue': 'clergue',
    'Druida': 'druida',
    'Explorador': 'explorador',
    'Guerrer': 'guerrer',
    'Mag': 'mag',
    'Monjo': 'monjo',
    'Paladí': 'paladí',
    'Sortiller': 'sortiller',
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
        {
            s['Classes'].entries
                .map(classData => (
                    <ClassSection
                    key={classData.class.name}
                    hrefId={sectionNameToHrefId[classData.class.name]}
                    {...classData.class}
                    classFeature={classData.classFeature}
                    subclass={classData.subclass}
                    subclassFeature={classData.subclassFeature}
                />))
        }
    </PrintableDocument>)
}
export default PrintFriendlyApp