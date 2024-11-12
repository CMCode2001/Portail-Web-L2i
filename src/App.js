import { Route, Routes } from "react-router-dom";
import ForgetMotDePasse from "./Components/ForgetMotDePasse";
import ProfileStudent from "./Components/Profile/ProfileStudent";
import ResetMotDePasse from "./Components/ResetMotDePasse";
import ScrollToTop from "./Components/ScrollToTop";
import MaquetteL1 from "./Components/_Components-Page-Maquette/MaquetteL1";
import MaquetteL2 from "./Components/_Components-Page-Maquette/MaquetteL2";
import MaquetteL3 from "./Components/_Components-Page-Maquette/MaquetteL3";
import Accueil from "./Pages/Accueil";
import ActivationMessage from "./Pages/ActivationMessage";
import Apropos from "./Pages/Apropos";
import Connexion from "./Pages/Connexion";
import Cours from "./Pages/Cours";
import Forum from "./Pages/Forum";
import Gallerie from "./Pages/Gallerie";
import Inscription from "./Pages/Inscription";
import Maquette from "./Pages/Maquette";
import Professeur from "./Pages/Professeur";
import PageAdmin from "./Pages/_Admin/PageAdmin";
import "./Styles/bootstrap.min.css";
import PersistLogin from "./Utils/PersistLogin";
import RequireAuth from "./Utils/RequireAuth";
import EndSession from "./Utils/EndSession";

const ROLES = {
  Student: "student",
  Professor: "professor",
  Admin: "admin",
};

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        {/* public routes */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/password/reset" element={<ResetMotDePasse />} />
        <Route path="/password/forget" element={<ForgetMotDePasse />} />
        <Route element={<PersistLogin />}>
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
          
          {/* <Route path="/confirmation/:idtoken" element={<Confirmation />} /> */}
          <Route path="/activation-message" element={<ActivationMessage />} />
          <Route path="/end-session" element={<EndSession />} />

          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            <Route path="studentProfile" element={<ProfileStudent />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Professor]} />}>
            <Route path="/professeur" element={<Professeur />}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/adminflksosdjds" element={<PageAdmin />} />
          </Route>
        </Route>
        <Route path="*" element={<Accueil />} />
      </Routes>
    </div>
  );
}

export default App;
