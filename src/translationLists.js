
const abilityScoreLabel = {
    'str': 'FRÇ',
    'dex': 'DES',
    'con': 'CON',
    'int': 'INT',
    'wis': 'SAV',
    'cha': 'CAR'
}

const armorTypeLabel = {
    'light': 'lleugera',
    'medium': 'mitjana',
    'heavy': 'pesada',
    'shield': 'escut',
}

const weaponTypeLabel = {
    'simple': 'simples',
    'martial': 'marcials',
}

const alignmentLabel = {
	"G": "bo",
	"L": "legal",
	"N": "neutral",
	"C": "caòtic",
	"E": "malvat",
	"U": "cap alineament",
	"A": "qualsevol alineament",   

	"qualsevol alineament no-bo": ["L", "NX", "C", "NY", "E"],
	"qualsevol alineament no-legal": ["NX", "C", "G", "NY", "E"],
	"qualsevol alineament no-malvat": ["L", "NX", "C", "NY", "G"],
	"qualsevol alineament no-caòtic": ["NX", "L", "G", "NY", "E"],

	"qualsevol alineament caòtic": ["C", "G", "NY", "E"],
	"qualsevol alineament malvat": ["L", "NX", "C", "E"],
	"qualsevol alineament legal": ["L", "G", "NY", "E"],
	"qualsevol alineament bo": ["L", "NX", "C", "G"],

	"qualsevol alineament neutral": ["NX", "NY", "N"],

}

const creatureSizeLabel = {
    'S': 'Petit',
    'M': 'Mitjà',
    'T': 'Diminut',
    'L': 'Gran',
    'H': 'Enorme',
    'G': 'Titànic',
}

const skillLabel = {
    'athletics': 'Atletisme',
    'acrobatics': 'Acrobàcies',
    'sleight of hand': 'Joc de Mans',
    'stealth': 'Sigil',
    'arcana': 'Arcana',
    'history': 'Història',
    'investigation': 'Investigació',
    'nature': 'Naturalesa',
    'religion': 'Religió',
    'animal handling': 'Tracte Animal',
    'insight': 'Perspicàcia',
    'medicine': 'Medicina',
    'perception': 'Percepció',
    'survival': 'Supervivència',
    'deception': 'Engany',
    'intimidation': 'Intimidació',
    'performance': 'Faràndula',
    'persuasion': 'Persuasió',
}

const schoolLabel = {
    'A': 'Abjuració',
    'C': 'Conjuració',
    'D': 'Endevinació',
    'E': 'Encantament',
    'V': 'Evocació',
    'I': 'Il·lusió',
    'N': 'Nigromància',
    'T': 'Transmutació',
}

export {
    abilityScoreLabel,
    creatureSizeLabel,
    skillLabel,
    armorTypeLabel,
    weaponTypeLabel,
    schoolLabel,
    alignmentLabel
}