import styled from 'styled-components'
import PrintLegalInfo from './PrintLegalInfo'
import GenericSection from './GenericSection'
import RacesSection from './RacesSection'
import DocumentIndex from './DocumentIndex'
import ClassSection from './ClassSection'
import MechanicsSection from './MechanicsSection'

const PrintableDocument = styled.main`
    max-width: 1200px;
    @media print {
        font-size:0.5em;
        max-width: 100%;
    }
    > article {
        h1{
            font-size: 2em;
        }
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
    'Passat el nivell 1': 'beyond 1',
    'Multi-classe': 'multiclass',
    'Alineament': 'alineament',
    'Idiomes': 'idiomes',
    'Inspiració': 'inspiració',
    'Rerefons': 'rerefons',
    'Rerefons d\'Exemple': 'rerefons sample',
    'Equipament': 'equipament',
    'Dots': 'dots',
    'Dots d\'Exemple': 'dots sample',
    'Emprar les Puntuacions de Característica': 'ability scors usage',
    'Time': 'time',
    'Moviment': 'moviment',
    'Combat': 'combat',
    'Llançament de Conjurs': 'llançament de conjurs',
}

const mechanicsSections = [[
    'Passat el nivell 1',
    'Multi-classe',
    'Alineament',
    'Idiomes',
    'Inspiració',
],[
    'Rerefons',
    'Rerefons d\'Exemple',
],/* [
    'Equipament',
], */[
    'Dots',
    'Dots d\'Exemple',
],[
    'Emprar les Puntuacions de Característica',
],[
    'Time',
    'Moviment',
],[
    'Combat',
],[
    'Llançament de Conjurs',
]
]
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
        {
            mechanicsSections.map((sectionNames,i) => {
                const subSections = sections.filter(cs => sectionNames.includes(cs.name))
                if(i>3){return}
                return (<MechanicsSection
                    key={i}
                    indices={sectionNameToHrefId}
                    sections={subSections}
                />)
            })
        }
    </PrintableDocument>)
}
export default PrintFriendlyApp