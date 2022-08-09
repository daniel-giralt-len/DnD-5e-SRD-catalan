const linkBuilder = {}

const buildHyperLink = (match, linkType, linkData) => {
    const linkArguments = linkData.split('|')
    if(!linkBuilder[linkType]){
        console.warn('no builder for', linkType, '; arguments are', linkArguments)
        return linkArguments[2] || linkArguments[0]
    }
    
    return match
}

const parseLinks = s => s.replace(/{@(.*?) (.*?)}/gi, buildHyperLink)

const EnrichedText = ({children}) => (<>{parseLinks(children)}</>)

export default EnrichedText
export {
    parseLinks
}