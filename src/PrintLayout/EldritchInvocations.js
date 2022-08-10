import srd from '../srd.json'
import GenericEntry from './Entries/GenericEntry'

const EldritchInvocations = () => (
    <>
        <h2>Invocacions Èldritx</h2>
        {srd
            .references.optionalFeatures.entries
            .filter(f=>f.featureType.includes('EI'))
            .map(f => (<GenericEntry {...f} titleHeader={3} />))}
    </>
)

export default EldritchInvocations