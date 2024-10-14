import { Route, Routes } from "react-router-dom";
import Licence12i from "./Components/Components-Page-Professeur/Classes/Licence12i";
import Licence22i from "./Components/Components-Page-Professeur/Classes/Licence22i";
import Licence32i from "./Components/Components-Page-Professeur/Classes/Licence32i";
import AjouterNotes from "./Components/Components-Page-Professeur/Classes/_NewsAdd/AjouterNotes";
import UpdateProf from "./Components/Components-Page-Professeur/Profiles/UpdateProf";
import MaquetteL1 from "./Components/_Components-Page-Maquette/MaquetteL1";
import MaquetteL2 from "./Components/_Components-Page-Maquette/MaquetteL2";
import MaquetteL3 from "./Components/_Components-Page-Maquette/MaquetteL3";
import Accueil from "./Pages/Accueil";
import Apropos from "./Pages/Apropos";
import Confirmation from "./Pages/Confirmation";
import Connexion from "./Pages/Connexion";
import Cours from "./Pages/Cours";
import Forum from "./Pages/Forum";
import Gallerie from "./Pages/Gallerie";
import Inscription from "./Pages/Inscription";
import Maquette from "./Pages/Maquette";
import Professeur from "./Pages/Professeur";
import PageAdmin from "./Pages/_Admin/PageAdmin";
import "./Styles/bootstrap.min.css";
import ForgetMotDePasse from "./Components/ForgetMotDePasse";
import ProfileStudent from "./Components/Profile/ProfileStudent";
import ActivationMessage from "./Pages/ActivationMessage";
import ResetMotDePasse from "./Components/ResetMotDePasse";
import ScrollToTop from "./Components/ScrollToTop";
import PersistLogin from "./Utils/PersistLogin";
import RequireAuth from "./Utils/RequireAuth";
import Logout from "./Pages/Logout";

const ROLES = {
  Student: "student",
  Professor: "professor",
  Admin: "admin",
};

// function App() {
//   return (
//     <div className="App">
//       <ScrollToTop />
//       <BrowserRouter>
//         <Routes>
//           {/* public routes */}
//           <Route element={<PersistLogin />}>
//             <Route path="/" element={<Accueil />} />
//             <Route path="/cours" element={<Cours />} />
//             <Route path="/forum" element={<Forum />} />
//             <Route path="/maquette" element={<Maquette />} />
//             <Route path="/maquette-L1" element={<MaquetteL1 />} />
//             <Route path="/maquette-L2" element={<MaquetteL2 />} />
//             <Route path="/maquette-L3" element={<MaquetteL3 />} />
//             <Route path="/a-propos" element={<Apropos />} />
//             <Route path="/gallerie" element={<Gallerie />} />
//             <Route path="/connexion" element={<Connexion />} />
//             <Route path="/inscription" element={<Inscription />} />
//             <Route path="/confirmation/:idtoken" element={<Confirmation />} />
//             <Route
//               path="/password/reset/:idtoken"
//               element={<ResetMotDePasse />}
//             />
//             <Route path="/password/forget" element={<ForgetMotDePasse />} />
//             <Route path="/activation-message" element={<ActivationMessage />} />

//             {/* Protected routes */}
//             <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
//               <Route path="studentProfile" element={<ProfileStudent />} />
//             </Route>
//             <Route
//               element={
//                 <RequireAuth allowedRoles={[ROLES.Professor, ROLES.Admin]} />
//               }
//             >
//               <Route path="/professeur" element={<Professeur />}>
//                 <Route path="classes/L1-2i" element={<Licence12i />} />
//                 <Route path="classes/L2-2i" element={<Licence22i />} />
//                 <Route path="classes/L3-2i" element={<Licence32i />} />
//                 <Route path="ajouter-notes" element={<AjouterNotes />} />
//                 <Route path="update-prof" element={<UpdateProf />} />
//               </Route>
//             </Route>
//             <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
//               <Route path="/adminflksosdjds" element={<PageAdmin />} />
//             </Route>
//           </Route>
//           <Route path="*" element={<Accueil />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        {/* public routes */}
        <Route path="/logout" element={<Logout />} />
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
          <Route path="/confirmation/:idtoken" element={<Confirmation />} />
          <Route
            path="/password/reset/:idtoken"
            element={<ResetMotDePasse />}
          />
          <Route path="/password/forget" element={<ForgetMotDePasse />} />
          <Route path="/activation-message" element={<ActivationMessage />} />

          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            <Route path="studentProfile" element={<ProfileStudent />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.Professor, ROLES.Admin]} />
            }
          >
            <Route path="/professeur" element={<Professeur />}>
              <Route path="classes/L1-2i" element={<Licence12i />} />
              <Route path="classes/L2-2i" element={<Licence22i />} />
              <Route path="classes/L3-2i" element={<Licence32i />} />
              <Route path="ajouter-notes" element={<AjouterNotes />} />
              <Route path="update-prof" element={<UpdateProf />} />
            </Route>
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
