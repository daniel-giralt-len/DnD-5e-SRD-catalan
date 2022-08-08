const linkBuilder = {}

const buildHyperLink = (match, linkType, linkData) => {
    const linkArguments = linkData.split('|')
    if(!linkBuilder[linkType]){
        console.warn('no builder for', linkType, '; arguments are', linkArguments)
        return linkArguments[0]
    }
    
    return match
}

const EnrichedText = ({children}) => (
    <>
        {children.replace(/{@(.*?) (.*?)}/gi, buildHyperLink)}
    </>
)

export default EnrichedText