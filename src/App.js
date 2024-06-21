
import './Styles/bootstrap.min.css'

import Accueil from './Pages/Accueil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cours from './Pages/Cours';
import Forum from "./Pages/Forum";
import Maquette from "./Pages/Maquette";
import Apropos from "./Pages/Apropos";
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import MaquetteL1 from './Components/_Components-Page-Maquette/MaquetteL1';
import MaquetteL2 from './Components/_Components-Page-Maquette/MaquetteL2';
import MaquetteL3 from './Components/_Components-Page-Maquette/MaquetteL3';
import Gallerie from './Pages/Gallerie';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

          <Route path='/' element={<Accueil/>}/>
          <Route path='/cours' element={<Cours/>}/>
          <Route path='/forum' element={<Forum/>}/>
          <Route path='/maquette' element={<Maquette/>} />
          <Route path='/maquette-L1' element={<MaquetteL1/>} />
          <Route path='/maquette-L2' element={<MaquetteL2/>} />
          <Route path='/maquette-L3' element={<MaquetteL3/>} />
          <Route path='/a-propos' element={<Apropos/>} />
          <Route path='/gallerie' element={<Gallerie/>} />
          <Route path='/connexion' element={<Connexion/>} />
          <Route path='/inscription' element={<Inscription/>} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
