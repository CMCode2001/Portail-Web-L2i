import { Email, Lock } from "@mui/icons-material";
import { Stack, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useState } from "react";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
// import CreateCustumer from "./CreateCustumer.jsx";
// import CreatePrestataire from "./CreatePrestataire.jsx";

import { SERVER_URL } from "../constantURL.js";

export default function Connexion() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  // Lorsque isAuthenticated change, appelez la fonction de rappel
  useEffect(() => {
    setEstAuthentifieCallback(isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Fonction de rappel pour mettre à jour estAuthentifie dans le composant parent
  const setEstAuthentifieCallback = (newValue) => {
    setAuth(newValue);
    // Mettez à jour estAuthentifie dans le composant parent
    // setEstAuthentifie(newValue);
  };
  // const login = () => {
  //   fetch(SERVER_URL + "/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => {
  //       const jwtToken = res.headers.get("Authorization");
  //       if (jwtToken != null) {
  //         console.log(res.data);
  //         // alert(res.data);
  //         sessionStorage.setItem("jwt", jwtToken);
  //         sessionStorage.setItem("isLoggedIn", true);
  //         sessionStorage.setItem("userTest", JSON.stringify(user)); // Stocker l'utilisateur comme chaîne JSON
  //         sessionStorage.setItem("userTest2", res.data); // Stocker l'utilisateur comme chaîne JSON
  //         sessionStorage.setItem("user", res.data.user); // Stocker l'utilisateur comme chaîne JSON

  //         setAuth(true);
  //       }
  //       // else {
  //       //   setOpen(true);
  //       // }
  //     })
  //     .catch((err) => console.error(err));
  // };

  const login = async () => {
    try {
      const response = await fetch(SERVER_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la connexion");
      }

      const jwtToken = response.headers.get("Authorization");
      if (jwtToken) {
        // Récupérer le corps de la réponse pour obtenir l'objet user
        const userData = await response.json();

        // Stocker le token JWT et les détails de l'utilisateur
        sessionStorage.setItem("jwt", jwtToken);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("user", JSON.stringify(userData.user)); // Stocker l'objet utilisateur sous forme de chaîne JSON

        // Mettre à jour l'état d'authentification
        setAuth(true);
      } else {
        throw new Error("Token JWT non trouvé dans la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  /* ********************* */

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  if (isAuthenticated) {
    window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
  } else
    return (
      <>
        <HeaderBlock />

        <div>
          <Backdrop open={true}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                mt: "10px", // Ajustez la marge supérieure
                mx: "20px", // Ajustez la marge horizontale
                backgroundColor: "#eae9f3",
                borderRadius: "10px", // Ajustez la valeur du rayon de la bordure
                padding: "20px", // Ajustez le rembourrage selon vos besoins
                boxShadow: "0 0 5px blue",
              }}
            >
              {/* <Box sx={{ width: "100%", overflow: "hidden" }}> */}
              <Stack
                spacing={2}
                alignItems="center"
                display="flex"
                justifyContent="center"
              >
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                  sx={{ p: "10px" }} // Ajustez la marge intérieure pour le TextField
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                  sx={{ p: "10px" }} // Ajustez la marge intérieure pour le TextField
                />
                <button
                  className="profile-card__button button--orange"
                  onClick={login}
                >
                  Se connecter{" "}
                </button>
                <span>
                  {" "}
                  {/* <CreatePrestataire /> */}
                  {/* <CreateCustumer /> */}
                </span>
              </Stack>
              {/* </Box> */}
            </Box>
          </Backdrop>
          {/* <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Login failed: Check your username and password"
          /> */}
          {/* Pour le mfdp f*/}
        </div>

        {/* <FooterBlock /> */}
      </>
    );
}
