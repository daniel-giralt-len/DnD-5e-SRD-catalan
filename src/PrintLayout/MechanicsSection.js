import styled from 'styled-components'
import GenericEntry from './Entries/GenericEntry'

const SectionWrapper = styled.article`
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
    sections,
    indices
}) => (
    <SectionWrapper>
        <h1 id={indices[sections[0].name]}>{sections[0].name}</h1>
        {sections.map((s, i)=>{
            const {name, ...rest} = s
            if(i===0){
                return (<GenericEntry
                    key={i}
                    {...rest}
                    titleHeader={2}
                />)
            }
            return (
                <section key={i}>
                    <GenericEntry {...s} titleHeader={2}/>
                </section>
            )
        })}
    </SectionWrapper>
)

export default MechanicsSection