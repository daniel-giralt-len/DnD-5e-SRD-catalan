import styled from 'styled-components'
const Warning = styled.p`background-color: yellow; color: red;`

const UnusedKeysWarning = ({rest, keysToIgnore}) => {
    const r = Object.keys(rest).filter(k=>!keysToIgnore.includes(k))
    if(r.length === 0) return
    return (<Warning>{r.join(', ')}</Warning>)
}

export default UnusedKeysWarning;