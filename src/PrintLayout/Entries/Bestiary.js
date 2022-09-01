import styled from 'styled-components'
import { capitalizeFirstLetter, toSignedStr } from '../../textModifiers'
import { creatureSizeLabel, alignmentLabel, femaleCreatureSizeLabel, getAlignmentLabel, abilityScoreLabel, skillLabel } from '../../translationLists'
import ColonEntry from './ColonEntry'
import SpellcastingEntry from './SpellcastingEntry'
import Table from './Table'
import UnusedKeysWarning from '../UnusedKeysWarning'
import GenericEntry from './GenericEntry'
import { Italic } from '../../TextStyles'

const Wrapper = styled.div`
    break-inside: avoid-column;
`

const getTypeText = type => typeof type === 'string' ? type : type.type

const getCreatureSizeText = (type, size) => ['bèstia','monstrositat', 'fata', 'planta'].includes(getTypeText(type)) ? femaleCreatureSizeLabel[size] : creatureSizeLabel[size]

const getAlignmentText = as => {
    if(typeof as[0] !== 'object'){
        const out = getAlignmentLabel(as)
        if(out) return out
    }
    return as
        .map(a => {
            if(typeof a === 'string') { return alignmentLabel[a] }
            return `${getAlignmentText(a.alineament)} (${a.chance}%)`
        })
        .join(' ')
    
}

const getACText = acs => {
    return acs
        .map(ac => {
            if(typeof ac !== 'object') { return ac.toString() }
            const from = ac.from ? `(${ac.from})` : ''
            const condition = ac.condition ? `${ac.condition}` : ''
            return`${ac.ac} ${from} ${condition}`
        })
        .join(', ')
}

const getHPText = ({average, formula}) => `${average} (${formula})`

const getSpeedsText = s => {
    return Object.entries(s)
        .map(([k,v]) => {
            const base = `${v.number || v} peus`
            const c = v.condition || ''
            if(k==='walk') return `${base} ${c}`
            if(k==='swim') return `${base} de natació ${c}`
            if(k==='fly' || k === 'volar') return `${base} de vol ${c}`
            if(k==='canHover') return `pot flotar ${c}`
            if(k==='climb') return `${base} d'escalada ${c}`
            if(k==='burrow') return `${base} excavant ${c}`
            console.info('no method for speed',k)
        })
        .join(', ')
}

const getMod = score => Math.floor(score/2)

const keysToIgnore = [
    'source','page','srd','otherSources','legendaryGroup','environment','hasToken','soundClip','traitTags','senseTags','actionTags','languageTags','damageTags','miscTags','conditionInflict','conditionInflictLegendary','hasFluff','hasFluffImages', 'variant', 'spellcastingTags', 'conditionInflictSpell', 'altArt', 'dragonCastingColor', 'familiar', 'englishName'
]

const getSkillText = (skill, passive) => {
    const skills = Object.entries(skill).map(([k,v])=> `${skillLabel[k] || k} ${v}`).join(', ')
    const passivePerception = passive ? `, percepció passiva ${passive}` : ''
    return `${skills}${passivePerception}`
}

const getCRText = cr => {
    if(typeof cr === 'string') {return cr}
    let out = `${cr.cr}`
    if(cr.lair) { out += `, ${cr.lair} a la llar`}
    if(cr.coven) { out += `, ${cr.coven} amb el sàbat`}
    return out
}

const getDamageImmunityTexts = l => getDamageTexts(l, 'immune')
const getDamageResistanceTexts = l => getDamageTexts(l, 'resist')
const getDamageVulnerableTexts = l => getDamageTexts(l, 'vulnerable')

const getDamageTexts = (is,k) => {
    return is.map(i => {
        if(typeof i === 'string') { return i }
        if(i.special) return i.special
        return `i ${i[k].join(', ')} ${i.note}`
    }).join(', ')
}

const Bestiary = ({
    name,
    type, size, alineament,
    ac,
    hp,
    speed,
    str,dex,con,int,wis,cha,
    save = {},
    skill,
    passive,
    senses,
    idiomes,
    cr,
    immune,
    resist,
    conditionImmune,
    vulnerable,
    trait,
    action, 
    legendary,
    reaction,
    spellcasting,
    group, //TODO: fer grups?
    ...rest
}) => (
    <Wrapper>
        <h2>{name}</h2>
        <p>
            <Italic>{capitalizeFirstLetter(getTypeText(type))} {getCreatureSizeText(type, size).toLowerCase()}, {getAlignmentText(alineament)}</Italic>
        </p>
        <div>
            <ColonEntry name="Classe d'Armadura (CA)" entry={getACText(ac)} />
            <ColonEntry name="Punts de Vida (PV)" entry={getHPText(hp)}/>
            <ColonEntry name="Velocitat" entry={getSpeedsText(speed)} />
        </div>
        <Table
            colLabels={['',...Object.values(abilityScoreLabel)]}
            colStyles={['text-left','text-center','text-center','text-center','text-center','text-center','text-center',]}
            rows={[
                [ 
                    'Punt.',
                    toSignedStr(str),
                    toSignedStr(dex),
                    toSignedStr(con),
                    toSignedStr(int),
                    toSignedStr(wis),
                    toSignedStr(cha)
                ],
                [ 
                    'Mod.',
                    toSignedStr(getMod(str)),
                    toSignedStr(getMod(dex)),
                    toSignedStr(getMod(con)),
                    toSignedStr(getMod(int)),
                    toSignedStr(getMod(wis)),
                    toSignedStr(getMod(cha))
                ],
                [
                    'Salv.',
                    toSignedStr(getMod(save.str || str)),
                    toSignedStr(getMod(save.dex || dex)),
                    toSignedStr(getMod(save.con || con)),
                    toSignedStr(getMod(save.int || int)),
                    toSignedStr(getMod(save.wis || wis)),
                    toSignedStr(getMod(save.cha || cha)),
                ]
            ]}
        />
        <div>
            {skill && <ColonEntry name="Habilitats" entry={getSkillText(skill, passive)} />}
            {senses && <ColonEntry name="Sentits" entry={senses.join(', ')}/>}
            {resist && <ColonEntry name="Resistència a Dany" entry={getDamageResistanceTexts(resist)} />}
            {immune && <ColonEntry name="Immunitat a Dany" entry={getDamageImmunityTexts(immune)} />}
            {vulnerable && <ColonEntry name="Vulnerabilitat a Dany" entry={getDamageVulnerableTexts(vulnerable)} />}
            {conditionImmune && <ColonEntry name="Immunitat a Condicions" entry={conditionImmune.join(', ')} />}
            {idiomes && <ColonEntry name="Idiomes" entry={idiomes.join(', ')} />}
            {cr && <ColonEntry name="Valor de Repte (VR)" entry={getCRText(cr)} />}
        </div>
        {trait && (
            <>
                <h3>Trets</h3>
                <GenericEntry entries={trait} />
                {spellcasting && <SpellcastingEntry entries={spellcasting} />}
            </>)}
        {action && (
            <>
                <h3>Accions</h3>
                <GenericEntry entries={action} />
            </>)}
        {legendary && (
            <>
                <h3>Accions llegendàries</h3>
                <GenericEntry entries={legendary} />
            </>)}
        {reaction && (
            <>
                <h3>Reaccions</h3>
                <GenericEntry entries={reaction} />
            </>)}
        <UnusedKeysWarning rest={rest} keysToIgnore={keysToIgnore} />
    </Wrapper>
    )

export default Bestiary
