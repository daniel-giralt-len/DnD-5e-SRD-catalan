import styled from 'styled-components'

const PageBreakWrapper = styled.div`
    @media print {
        page-break-after: always;
    }
`

const PrintLegalInfo = ({name, entries}) => (
    <PageBreakWrapper>
        <h3>{name}</h3>
        {entries.map(e=>(<p>{e}</p>))}
    </PageBreakWrapper>
)

export default PrintLegalInfo