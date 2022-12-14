import srd from './srd.json'
import PrintFriendlyApp from './PrintLayout/PrintFriendlyApp'
import { createGlobalStyle } from 'styled-components'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import SpellPickerApp from './SpellsLayout/SpellPickerApp';

const GlobalStyle = createGlobalStyle`
  html, button, input, textarea {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }
  
`;


function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,500;0,700;0,900;1,200;1,500;1,700&display=swap" rel="stylesheet"></link>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={
            <PrintFriendlyApp
              sections={srd.sections}
              references={srd.references}
            />}
          />
          <Route path="/spells" element={
            <SpellPickerApp 
              spells={srd.sections.find(({name})=>name==='Descripcions dels Conjurs').entries}
            />} 
          />
        </Routes>
      </HashRouter>
      
    </>
  );
}

export default App;
