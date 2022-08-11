const SpellItem = ({name}) => (
    <li>
        <div>{name}</div>
        <button>+</button>
    </li>
)

const SpellList = ({names}) => {
    return (<ul>
        {names
            .map(name => (
                <SpellItem 
                    key={name}
                    name={name}
                />
                )
            )
        }
    </ul>)
}
export default SpellList