import srdSections from './srd.json'
import PrintFriendlyApp from './PrintFriendlyApp'

function App() {
  return (
    <PrintFriendlyApp sections={srdSections} />
  );
}

export default App;
