

const renderSection = section => {
    return (<section>
        <h1>{section.name}</h1>
        {section.entries.map((e, i) => {
            let content
            if(typeof e === 'object'){
                if(['section','entries'].includes(e.type)){
                    content = renderSection(e)
                }else{
                    //TODO: types image, inline, inset, list, table
                }
            }else{
                content = <p>{e}</p>
            }
            return (<span key={section.name+i}>{content}</span>)
        })}
    </section>)
}

const PrintFriendlyApp = ({sections}) => (<div>
    {sections.map(renderSection)}
</div>)
export default PrintFriendlyApp