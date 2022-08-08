import styled from 'styled-components'

const PageBreakWrapper = styled.div`
    @media print {
        break-after: always;
    }
`

const PrintLegalInfo = ({name, entries, hrefId}) => (
    <PageBreakWrapper>
        <h3 id={hrefId}>{name}</h3>
        {entries.map((e,i)=>(<p key={i}>{e}</p>))}
    </PageBreakWrapper>
)

export default PrintLegalInfo