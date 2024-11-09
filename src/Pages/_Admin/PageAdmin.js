import React from "react";
import DashboardAdmin from "./_Component-Page-Admin/DashboardAdmin";
import { useAuth } from "../../Utils/AuthContext";

export default function PageAdmin() {
  // const getUserInfo = () => {
  //   const userJson = sessionStorage.getItem("user");

  //   if (userJson) {
  //     try {
  //       const user = JSON.parse(userJson);
  //       return user;
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
  //         error
  //       );
  //     }
  //   } else {
  //     console.warn("Aucun utilisateur trouvé dans le sessionStorage");
  //   }
  // };

  const { authData } = useAuth();
  const currentUser = authData?.user;

  return authData?.isLoggedIn && currentUser?.role === "admin" ? (
    <div>
      <div id="bgRedProf">
        <h1 style={{ textAlign: "center", color: "white" }}>
          Espace Administrateur L2i
        </h1>
      </div>
      <DashboardAdmin />
    </div>
  ) : (
    <div className="login-reminder">Please log in to join the admin</div>
  );
}
