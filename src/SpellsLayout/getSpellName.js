const getSpellName = s => typeof s.srd === 'string' ? s.srd : s.name

export default getSpellName