import styled from 'styled-components'

const PageBreakWrapper = styled.div`
    break-after: page;
`

const PrintLegalInfo = ({name, entries, hrefId}) => (
    <PageBreakWrapper>
        <h3 id={hrefId}>{name}</h3>
        {entries.map((e,i)=>(<p key={i}>{e}</p>))}
    </PageBreakWrapper>
)

export default PrintLegalInfo