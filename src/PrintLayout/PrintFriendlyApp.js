import styled from 'styled-components'
import PrintLegalInfo from './PrintLegalInfo'
import GenericSection from './GenericSection'
import RacesSection from './RacesSection'
import DocumentIndex from './DocumentIndex'
import ClassSection from './ClassSection'
import MechanicsSection from './MechanicsSection'
import SpellListsSection from './SpellListsSection'
import SpellsSection from './SpellsSection'
import BestiarySection from './BestiarySection'
import ObjectsSection from './ObjectsSection'

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
    'Equipament': 'equipament',
    'Dots': 'dots',
    'Emprar les Puntuacions de Característica': 'ability scors usage',
    'Time': 'time',
    'Moviment': 'moviment',
    'Combat': 'combat',
    'Llançament de Conjurs': 'llançament de conjurs',
    'Condicions': 'Condicions',
    'Llistes de Conjurs': 'llistes de conjurs',
    'Descripcions dels Conjurs': 'descripcions dels conjurs',
    'Trampes': 'Trampes',
    'Malalties': 'Malalties',
    'Bogeria': 'Bogeria',
    'Objectes': 'Objectes',
    'Metzines': 'Metzines',
    'Divinitats del Multivers': 'Divinitats del Multivers',
    'Objectes Màgics': 'Objectes Màgics',
    'Objectes Màgics Conscients': 'Objectes Màgics Conscients',
    'Monstres': 'Monstres',
    'Llista de Monstres': 'Llista de Monstres',
    'Apèndix A: Criatures Vàries': 'Apèndix A',
    'Apèndix B: Personatges No Jugables': 'Apèndix B'
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
],[
    'Equipament',
],[
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
],[
    'Condicions', 'Llista de Condicions'
]
]
const runningACampaignSections = [
    [
        'Trampes', 'Trampes d\'Exemple',
        'Malalties', 'Malalties d\'Exemple',
        'Bogeria', 'Objectes',
        'Metzines', 'Metzines d\'Exemple',
    ],
    [
        'Divinitats del Multivers',
        'Els Plans d\'Existència',
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
                return (<MechanicsSection
                    key={i}
                    indices={sectionNameToHrefId}
                    sections={subSections}
                />)
            })
        }
        <SpellListsSection 
            hrefId={sectionNameToHrefId['Llistes de Conjurs']}
            lists={s['Llistes de Conjurs'].entries}
        />
        <SpellsSection
            hrefId={sectionNameToHrefId['Descripcions dels Conjurs']}
            spells={s['Descripcions dels Conjurs'].entries}
        />

        {
            runningACampaignSections.map((sectionNames,i) => {
                const subSections = sections.filter(cs => sectionNames.includes(cs.name))
                return (<MechanicsSection
                    key={i}
                    title={i===0?'Per a mestrar una campanya':null}
                    indices={sectionNameToHrefId}
                    sections={subSections}
                />)
            })
        }

        <ObjectsSection
            prefixSection={s['Objectes Màgics']}
            hrefId={sectionNameToHrefId['Objectes Màgics']}
            objects={s['Llista d\'Objectes Màgics']}
        />

        <ObjectsSection
            prefixSection={s['Objectes Màgics Conscients']}
            hrefId={sectionNameToHrefId['Objectes Màgics Conscients']}
            objects={s['Llista d\'Artefactes']}
        />

        <MechanicsSection
            title='Monstres'
            indices={sectionNameToHrefId}
            sections={[s['Estadístiques'], s['Modificar Criatures']]}
            hrefId={sectionNameToHrefId['Monstres']}
        />
        <BestiarySection
            hrefId={sectionNameToHrefId['Llista de Monstres']}
            {...s['Llista de Monstres']}
        />

        <BestiarySection
            prefixSection={s['Apèndix A: Criatures Vàries']}
            hrefId={sectionNameToHrefId['Apèndix A: Criatures Vàries']}
            {...s['Llista de Criatures Vàries']}
        />

        <BestiarySection
            prefixSection={s['Apèndix B: Personatges No Jugables']}
            hrefId={sectionNameToHrefId['Apèndix B: Personatges No Jugables']}
            {...s['Llista de PNJs']}
        />
    </PrintableDocument>)
}
export default PrintFriendlyApp