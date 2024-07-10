import "./Styles/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import Apropos from "./Pages/Apropos";
import Connexion from "./Pages/Connexion";
import Cours from "./Pages/Cours";
import Forum from "./Pages/Forum";
import Gallerie from "./Pages/Gallerie";
import Inscription from "./Pages/Inscription";
import Maquette from "./Pages/Maquette";
import Professeur from "./Pages/Professeur";
import Licence12i from "./Components/Components-Page-Professeur/Classes/Licence12i";
import Licence22i from "./Components/Components-Page-Professeur/Classes/Licence22i";
import Licence32i from "./Components/Components-Page-Professeur/Classes/Licence32i";
import ConnexionProf from "./Components/Components-Page-Professeur/Profiles/ConnexionProf";
import MaquetteL1 from "./Components/_Components-Page-Maquette/MaquetteL1";
import MaquetteL2 from "./Components/_Components-Page-Maquette/MaquetteL2";
import MaquetteL3 from "./Components/_Components-Page-Maquette/MaquetteL3";
import PageAdmin from "./Pages/_Admin/PageAdmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/maquette" element={<Maquette />} />
          <Route path="/maquette-L1" element={<MaquetteL1 />} />
          <Route path="/maquette-L2" element={<MaquetteL2 />} />
          <Route path="/maquette-L3" element={<MaquetteL3 />} />
          <Route path="/a-propos" element={<Apropos />} />
          <Route path="/gallerie" element={<Gallerie />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />

          {/* ------------ Professeur -------------- */}
          <Route path="/professeur" element={<Professeur />}>
            
            {/* <Route path="mes-cours" element={<MesCoursBlock />} /> */}
            <Route path="classes/L1-2i" element={<Licence12i />} />
            <Route path="classes/L2-2i" element={<Licence22i />} />
            <Route path="classes/L3-2i" element={<Licence32i />} />
            <Route path="connexion" element={<ConnexionProf />} />
          </Route>
          {/* ------------ Professeur -------------- */}

          {/* ---------------- ADMIN --------------- */}
          <Route path="/admin" element={<PageAdmin/>}/>
          {/* ---------------- ADMIN --------------- */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
