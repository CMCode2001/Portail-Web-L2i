import { Stack, TextField } from "@mui/material";
import React from "react";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
/* Zone a risque */
import { Email, Lock } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import CreateCustumer from "./CreateCustumer.jsx";
import CreatePrestataire from "./CreatePrestataire.jsx";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SERVER_URL } from "../constantURL.js";

/*  */
const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function Connexion({ setEstAuthentifie }) {
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
    setEstAuthentifie(newValue);
  };
  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken != null) {
          sessionStorage.setItem("jwt", jwtToken);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("user", user);
          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };

  if (isAuthenticated) {
    window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
  } else
    return (
      <>
        <HeaderBlock />

        <div>
          <Backdrop open={true}>
            <WallPaper />
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
                  <CreatePrestataire />
                  <CreateCustumer />
                </span>
              </Stack>
              {/* </Box> */}
            </Box>
          </Backdrop>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Login failed: Check your username and password"
          />
          {/* Pour le mfdp f*/}
        </div>

        <FooterBlock />
      </>
    );
}
