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

const HitPoints = ({faces}) => (
    <section>
        <h3>Vida</h3>
        <GenericEntry name='Daus de Vida' titleDivider=':' entries={[`1d${faces} per nivell.`]} />
        <GenericEntry name='Punts de Vida (nivell 1)' titleDivider=':' entries={[`${faces} + CON.`]} />
        <GenericEntry name='Punts de Vida a nivells superiors' titleDivider=':' entries={[`+ 1d${faces} (o 5) + CON.`]} />
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
        <GenericEntry
            name='Salvades'
            titleDivider=':' 
            entries={[
                savingThrows.map(skill=>abilityKeyToLabel[skill]).join(', ')
            ]}
        />
    </section>

)

const keysToIgnore=['source','page','srd']

const ClassSection = ({
    hrefId,
    name,
    hd,
    proficiency,
    ...rest
}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{name}</h1>
        <BodyWrapper>
            {hd && <HitPoints faces={hd.faces} />}
            <Proficiencies 
                savingThrows={proficiency}
            />
            <UnusedKeysWarning rest={rest} keysToIgnore={keysToIgnore} />
        </BodyWrapper>
    </SectionWrapper>
)

export default ClassSection