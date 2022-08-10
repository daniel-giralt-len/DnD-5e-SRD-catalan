import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'

const SectionWrapper = styled.div`
    margin-top: 1em;
    border-top: 1px solid black;
    @media print {
        border: 0;
    }
`

const BodyWrapper = styled.article`
    break-after: page;
    column-count: 2;
    @media (max-width: 600px) {
        column-count: 1;
    }
    @media print {
        column-count: 2;
    }
`

const MechanicsSection = ({
    sections = [],
    indices,
    title
}) => {
    if(sections.length === 0) return
    return (
        <SectionWrapper>
            {title
                ? (<h1>{title}</h1>)
                : (<h1 id={indices[sections[0].name]}>{sections[0].name}</h1>)
            }
            <BodyWrapper>
                {sections.map((s, i)=>(
                    <section key={i} id={indices[s.name]}>
                        <GenericEntry
                            {...s}
                            name={(i === 0 && title) ? s.name : null}
                            titleHeader={(i === 0 && !title) ? 1 : 2}
                        />
                    </section>
                ))}
            </BodyWrapper>
        </SectionWrapper>
    )
}

export default MechanicsSection