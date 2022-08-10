import GenericEntry from "./GenericEntry"

const ColonEntry = ({name, entry}) => (<GenericEntry name={name} titleDivider=': ' entries={entry} />)

export default ColonEntry