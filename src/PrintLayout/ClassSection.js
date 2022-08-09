import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'
import UnusedKeysWarning from './UnusedKeysWarning'
import {
    abilityScoreLabel,
    armorTypeLabel,
    weaponTypeLabel,
    skillLabel
} from '../translationLists'
import { capitalizeFirstLetter } from '../textModifiers'
import { parseLinks } from '../EnrichedText'

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

const SubSectionWrapper=styled.section`break-inside:avoid;`

const HitPoints = ({faces}) => (
    <SubSectionWrapper>
        <h3>Vida</h3>
        <ColonEntry name='Daus de Vida' entry={`1d${faces} per nivell.`} />
        <ColonEntry name='Punts de Vida (nivell 1)' entry={`${faces} + CON.`} />
        <ColonEntry name='Punts de Vida a nivells superiors' entry={`+ 1d${faces} (o 5) + CON.`} />
    </SubSectionWrapper>
)

const Proficiencies = ({
    armor: armors = [],
    weapons = [],
    tools = [],
    savingThrows = [],
    skills = []
}) => {
    const skillsEntry = `Escull-ne ${skills[0].choose.count} d'entre ${skills[0].choose.from.map(k=>skillLabel[k]).join(', ')}.`

    const armorEntry = armors.length === 0
    ? 'Cap.'
    : capitalizeFirstLetter(
        `Armadura ${armors
            .map(armor => typeof armor === 'string' ? armor : armor.full)
            .map(armor => parseLinks(armor))
            .map(armor=>armorTypeLabel[armor] || armor)
            .join(', ')}.`
        )

    const weaponsEntry = weapons.length === 0
        ? 'Cap.'
        : capitalizeFirstLetter(
            `Armes ${weapons
                .map(weapon => typeof weapon === 'string' ? weapon : weapon.full)
                .map(weapon => parseLinks(weapon))
                .map(weapon=>weaponTypeLabel[weapon] || weapon)
                .join(', ')}.`
            )

    const toolsEntry = tools.length === 0
    ? 'Cap.'
    : `${capitalizeFirstLetter(tools
        .map(tool => parseLinks(tool))
        .join(', '))}.`

    const savesEntry = `${capitalizeFirstLetter(savingThrows.map(skill=>abilityScoreLabel[skill]).join(', '))}.`

    return (<SubSectionWrapper>
        <h3>Competències</h3>
        <ColonEntry name='Armadures' entry={armorEntry} />
        <ColonEntry name='Armes' entry={weaponsEntry} />
        <ColonEntry name='Salvades' entry={savesEntry} />
        <ColonEntry name='Habilitats' entry={skillsEntry} />
        <ColonEntry name='Eines' entry={toolsEntry} />
    </SubSectionWrapper>)
}

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