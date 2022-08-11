const Filters = ({classes, levels}) => {
    return (<div>
        <div>
            <div>
                {classes.map(c=>(
                    <button key={c}>
                        {c}
                    </button>
                ))}
            </div>
            <div>
                {levels.map(l=>(
                    <button key={l}>
                        {l}
                    </button>
                ))}
            </div>
        </div>
    </div>)
}
export default Filters