import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'
import UnusedKeysWarning from './UnusedKeysWarning'
import {
    abilityKeyToLabel
} from '../translationLists'

const SectionWrapper = styled.article`
    break-after: page;
`
const BodyWrapper = styled.div`
    column-count: 2;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 1;
    }
`

const ColonEntry = ({name, entry}) => (<GenericEntry name={name} titleDivider=':' entries={entry} />)


const HitPoints = ({faces}) => (
    <section>
        <h3>Vida</h3>
        <ColonEntry name='Daus de Vida' entry={`1d${faces} per nivell.`} />
        <ColonEntry name='Punts de Vida (nivell 1)' entry={`${faces} + CON.`} />
        <ColonEntry name='Punts de Vida a nivells superiors' entry={`+ 1d${faces} (o 5) + CON.`} />
    </section>
)

const Proficiencies = ({armor,
    weapons,
    tools,
    savingThrows = [],
    skills
}) => (
    <section>
        <h3>Competències</h3>
        <ColonEntry name='Salvades' entry={savingThrows.map(skill=>abilityKeyToLabel[skill]).join(', ')} />
        
    </section>

)

const keysToIgnore=['source','page','srd']

const ClassSection = ({
    hrefId,
    name,
    hd,
    startingProficiencies,
    proficiency,
    ...rest
}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{name}</h1>
        <BodyWrapper>
            {hd && <HitPoints faces={hd.faces} />}
            <Proficiencies 
                savingThrows={proficiency}
                {...startingProficiencies}
            />
            <UnusedKeysWarning rest={rest} keysToIgnore={keysToIgnore} />
        </BodyWrapper>
    </SectionWrapper>
)

export default ClassSection