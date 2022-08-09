import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'
import UnusedKeysWarning from './UnusedKeysWarning'
import {
    abilityScoreLabel,
    armorTypeLabel,
    weaponTypeLabel,
    skillLabel
} from '../translationLists'
import { capitalizeFirstLetter, toSignedStr } from '../textModifiers'
import { parseLinks } from '../EnrichedText'
import Table from './Entries/Table'

const SectionWrapper = styled.article`
    break-after: page;
`
const BodyWrapper = styled.div`
    column-count: 2;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 2;
    }
`

const ColonEntry = ({name, entry}) => (<GenericEntry name={name} titleDivider=': ' entries={entry} />)

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
            `${weapons
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

const EquipmentList = styled.ul`padding-left: 1.5em;`

const StartingEquipment = ({
    default: entries,
}) => (<SubSectionWrapper>
    <h3>Equipament Inicial</h3>
    <EquipmentList>
        {entries.map((e,i)=>(<li key={i}>{parseLinks(e)}</li>))}
    </EquipmentList>
</SubSectionWrapper>)

const ClassTable = ({classTableGroups=[], classFeatures=[]}) => {
    const getProficiency = lvl => 2 + Math.floor(lvl/4)
    const labels = [
        'Nivell',
        'Bonus de Comp.',
        'Trets',
        ...classTableGroups
            .reduce((acc,g) => ([...acc, ...g.colLabels]), [])
    ]

    const styles = Array(labels.length).fill('text-centered')
    styles[2] = '' //all centered except feat list

    const parseRow = r => {
        if(typeof r === 'object') {
            if(r.type === 'bonus') return toSignedStr(r.value)
            if(r.type === 'dice') return r.toRoll.map(d=>`${d.number}d${d.faces}`).join('+')
            if(r.type === 'bonusSpeed') return `${r.value}p.`

        }
        return r
    }

    const getSrdFeatures = (lvl, features) => features
        .map(f => typeof f === 'string' ? f : f.classFeature)
        .map(f=>f.split('|'))
        .filter(([name,className,_,level,book]) => !book && parseInt(level) === lvl)
        .map(([name])=>name)
    
    const rows = Array(20).fill()
        .map((_,i) => {
            return [
                i,
                toSignedStr(getProficiency(i)),
                getSrdFeatures(i+1, classFeatures).join(', '),
                ...classTableGroups
                    .reduce((acc,g) => (
                        [...acc, ...g.rows[i].map(parseRow)
                    ]), [])
            ]
        })
    return(<Table
        colLabels={labels}
        colStyles={styles}
        rows={rows}
        tableAlign='center'
    />)
}

const FeatureEntryWrapper = styled.div`
    break-inside:avoid;
    @media-print {
        break-inside:avoid;
    }
`

const FeatureEntry = ({name, ...feature}) => (
    <FeatureEntryWrapper>
        <h3>{name}</h3>
        <GenericEntry {...feature} />
    </FeatureEntryWrapper>
)

const FeatureList = ({features}) => (
    <section>
        {features.map((f,i) => (<FeatureEntry
            key={`${f.name}-${i}`}
            {...f}
        />))}
    </section>
)

const keysToIgnore=['source','page','srd','Multi-classe', 'spellcastingAbility', 'casterProgression', 'cantripProgression', 'spellsKnownProgressionFixedByLevel', 'spellsKnownProgression', 'spellsKnownProgressionFixedAllowLowerLevel', 'optionalfeatureProgression', 'spellsKnownProgressionFixed', 'preparedSpells', 'subclassTitle']

const ClassSection = ({
    hrefId,
    name,
    hd,
    startingProficiencies,
    startingEquipment,
    classTableGroups,
    classFeatures,
    classFeature,
    proficiency,
    ...rest
}) => (
    <SectionWrapper>
        <h1 id={hrefId}>{name}</h1>
        <BodyWrapper>
            {hd && <HitPoints faces={hd.faces} />}
            <StartingEquipment {...startingEquipment} />
            <Proficiencies 
                savingThrows={proficiency}
                {...startingProficiencies}
            />
        </BodyWrapper>
        <ClassTable
            classTableGroups={classTableGroups}
            classFeatures={classFeatures}
        />
        <BodyWrapper>
            <FeatureList features={classFeature} />
            <UnusedKeysWarning rest={rest} keysToIgnore={keysToIgnore} />
        </BodyWrapper>
    </SectionWrapper>
)

export default ClassSection