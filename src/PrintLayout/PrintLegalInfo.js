import styled from 'styled-components'

const PageBreakWrapper = styled.article`
    break-after: page;
`

const PrintLegalInfo = ({name, entries, hrefId}) => (
    <PageBreakWrapper>
        <h1 id={hrefId}>{name}</h1>
        {entries.map((e,i)=>(<p key={i}>{e}</p>))}
    </PageBreakWrapper>
)

export default PrintLegalInfo