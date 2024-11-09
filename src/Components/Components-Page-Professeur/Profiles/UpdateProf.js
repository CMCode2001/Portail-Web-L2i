// import { Button, Form, Input, notification, Upload, Avatar } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import React, { useState, useEffect } from "react";

// import { SERVER_URL } from "../../../Utils/constantURL";
// import { useAuth } from "../../../Utils/AuthContext";
// import { useApi } from "../../../Utils/Api";

// const UpdateProf = () => {
//   const api = useApi();
//   const { authData, setuser } = useAuth();
//   const currentUser = authData?.user;
//   const [user, setUser] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     photo: "",
//   });

//   const [emailStatus, setEmailStatus] = useState("");
//   const [form] = Form.useForm();

//   const openSuccessNotification = () => {
//     notification.success({
//       message: "Mise à jour réussie",
//       description: "Vos informations ont été mises à jour avec succès!",
//       placement: "top",
//     });
//   };

//   const openErrorNotification = (message) => {
//     notification.error({
//       message: "Erreur de mise à jour",
//       description: message,
//       placement: "top",
//     });
//   };

//   useEffect(() => {
//     if (currentUser) {
//       setUser({
//         id: currentUser?.id,
//         firstName: currentUser?.firstName,
//         lastName: currentUser?.lastName,
//         email: currentUser?.email,
//         photo: currentUser?.photo,
//       });
//       form.setFieldsValue({
//         firstName: currentUser?.firstName,
//         lastName: currentUser?.lastName,
//         email: currentUser?.email,
//       });
//     }
//     // }, [form]);
//   }, [form, currentUser]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleFormSubmit = async () => {
//     try {
//       const response = await api.patch(`/professor/${user.id}`, user);

//       if (response.status === 200) {
//         const updatedUser = response.data;
//         setuser(updatedUser);
//         openSuccessNotification();
//       } else {
//         throw new Error(
//           response.data.message ||
//             "Erreur lors de la mise à jour des informations"
//         );
//       }
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour des informations:", error);
//       openErrorNotification(error.message);
//     }
//   };

//   const onFinish = () => {
//     handleFormSubmit();
//   };

//   const validateEmail = (_, value) => {
//     if (!value) {
//       setEmailStatus("error");
//       return Promise.reject(new Error("Veuillez entrer votre email!"));
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       setEmailStatus("error");
//       return Promise.reject(new Error("Email invalide"));
//     }
//     setEmailStatus("success");
//     return Promise.resolve();
//   };

//   const handlePhotoChange = (info) => {
//     if (info.file.status === "done") {
//       const { response } = info.file;
//       setUser({ ...user, photo: response.url });
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <Form
//           form={form}
//           name="update-form"
//           initialValues={user}
//           onFinish={onFinish}
//           layout="vertical"
//           style={{ maxWidth: 600, margin: "0 auto" }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: 20,
//             }}
//           >
//             <Avatar size={150} src={user.photo} />
//             <Upload
//               name="photo"
//               action={`${SERVER_URL}/upload-photo`}
//               showUploadList={false}
//               onChange={handlePhotoChange}
//             >
//               <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>
//                 Charger une photo
//               </Button>
//             </Upload>
//           </div>
//           <p className=" text-center h4 " style={{ fontWeight: "bold" }}>
//             Mettre à jour vos informations
//           </p>{" "}
//           <br />
//           <Form.Item
//             className="text-lg-center"
//             name="firstName"
//             onChange={handleInputChange}
//             rules={[
//               { required: true, message: "Veuillez entrer votre prénom !" },
//             ]}
//             style={{ marginBottom: 20 }}
//           >
//             <Input
//               placeholder="Prénom"
//               name="firstName"
//               value={user.firstName}
//               style={{ width: "70%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             className="text-lg-center"
//             name="lastName"
//             onChange={handleInputChange}
//             rules={[{ required: true, message: "Veuillez entrer votre nom !" }]}
//             style={{ marginBottom: 20 }}
//           >
//             <Input
//               placeholder="Nom"
//               name="lastName"
//               value={user.name}
//               style={{ width: "70%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             className="text-lg-center"
//             name="email"
//             onChange={handleInputChange}
//             validateStatus={emailStatus}
//             hasFeedback
//             rules={[
//               {
//                 validator: validateEmail,
//               },
//             ]}
//             style={{ marginBottom: 20 }}
//           >
//             <Input
//               placeholder="Email"
//               name="email"
//               value={user.email}
//               style={{ width: "70%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             style={{ textAlign: "center", width: "70%", margin: "auto" }}
//           >
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="login-form-button "
//             >
//               Mettre à jour →
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default UpdateProf;

import {
  Button,
  Form,
  Input,
  notification,
  Upload,
  Avatar,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import { SERVER_URL } from "../../../Utils/constantURL";
import { useAuth } from "../../../Utils/AuthContext";
import { useApi } from "../../../Utils/Api";

const UpdateProf = () => {
  const api = useApi();
  const { authData, setuser, logout } = useAuth();
  const currentUser = authData?.user;
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [changePassword, setChangePassword] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [form] = Form.useForm();

  const openSuccessNotification = () => {
    notification.success({
      message: "Mise à jour réussie",
      description: "Vos informations ont été mises à jour avec succès!",
      placement: "top",
    });
  };

  const openErrorNotification = (message) => {
    notification.error({
      message: "Erreur de mise à jour",
      description: message,
      placement: "top",
    });
  };

  useEffect(() => {
    if (currentUser) {
      setUser({
        id: currentUser?.id,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email,
        photo: currentUser?.photo,
      });
      form.setFieldsValue({
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email,
      });
    }
  }, [form, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword" || name === "newPassword") {
      setPasswords({ ...passwords, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleLogout = async () => {
    try {
      // Envoyer la requête de déconnexion avec les cookies (incluant le refresh token)
      const response = await api.post("/logout", null, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        console.error("Erreur lors de la déconnexion.");
        return;
      }

      console.log("Déconnexion réussie.");
      logout(); // Appeler la fonction de déconnexion du contexte pour effacer les informations locales
      window.location.href = "/connexion"; // Rediriger vers la page d'accueil après déconnexion
    } catch (error) {
      logout(); // En cas d'erreur, déconnecter quand même l'utilisateur localement
      window.location.href = "/";
      console.error("Erreur lors de la requête de déconnexion:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const body = changePassword ? { ...user, ...passwords } : { ...user };

      const response = await api.patch(`/professor/${user.id}`, body);

      if (response.status === 200) {
        const updatedUser = response.data;
        setuser(updatedUser);
        openSuccessNotification();
        // Déconnecter l'utilisateur si le mot de passe a été changé
        if (changePassword) {
          handleLogout();
        }
      } else {
        throw new Error(
          response.data.message ||
            "Erreur lors de la mise à jour des informations"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations:", error);
      openErrorNotification(error.message);
    }
  };

  const onFinish = () => {
    handleFormSubmit();
  };

  const validateEmail = (_, value) => {
    if (!value) {
      setEmailStatus("error");
      return Promise.reject(new Error("Veuillez entrer votre email!"));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailStatus("error");
      return Promise.reject(new Error("Email invalide"));
    }
    setEmailStatus("success");
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Veuillez entrer votre mot de passe!"));
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      return Promise.reject(
        new Error(
          "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial!"
        )
      );
    }
    return Promise.resolve();
  };

  const handlePhotoChange = (info) => {
    if (info.file.status === "done") {
      const { response } = info.file;
      setUser({ ...user, photo: response.url });
    }
  };

  return (
    <>
      <div className="container">
        <Form
          form={form}
          name="update-form"
          initialValues={user}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Avatar size={150} src={user.photo} />
            <Upload
              name="photo"
              action={`${SERVER_URL}/upload-photo`}
              showUploadList={false}
              onChange={handlePhotoChange}
            >
              <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>
                Charger une photo
              </Button>
            </Upload>
          </div>
          <p className=" text-center h4 " style={{ fontWeight: "bold" }}>
            Mettre à jour vos informations
          </p>
          <br />
          <Form.Item
            className="text-lg-center"
            name="firstName"
            onChange={handleInputChange}
            rules={[
              { required: true, message: "Veuillez entrer votre prénom !" },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input
              placeholder="Prénom"
              name="firstName"
              value={user.firstName}
              style={{ width: "70%" }}
            />
          </Form.Item>
          <Form.Item
            className="text-lg-center"
            name="lastName"
            onChange={handleInputChange}
            rules={[{ required: true, message: "Veuillez entrer votre nom !" }]}
            style={{ marginBottom: 20 }}
          >
            <Input
              placeholder="Nom"
              name="lastName"
              value={user.lastName}
              style={{ width: "70%" }}
            />
          </Form.Item>
          <Form.Item
            className="text-lg-center"
            name="email"
            onChange={handleInputChange}
            validateStatus={emailStatus}
            hasFeedback
            rules={[
              {
                validator: validateEmail,
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input
              placeholder="Email"
              name="email"
              value={user.email}
              style={{ width: "70%" }}
            />
          </Form.Item>

          <Form.Item
            label="Voulez-vous changer votre mot de passe ?"
            style={{ textAlign: "center", marginBottom: 20 }}
          >
            <Switch checked={changePassword} onChange={setChangePassword} />
          </Form.Item>
          {changePassword && (
            <>
              <Form.Item
                className="text-lg-center"
                name="currentPassword"
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre mot de passe actuel!",
                  },
                ]}
                style={{ marginBottom: 20 }}
              >
                <Input.Password
                  placeholder="Mot de passe actuel"
                  name="currentPassword"
                  style={{ width: "70%" }}
                  autoComplete="new-password"
                />
              </Form.Item>
              <Form.Item
                className="text-lg-center"
                name="newPassword"
                rules={[{ validator: validatePassword }]}
                onChange={handleInputChange}
                style={{ marginBottom: 20 }}
              >
                <Input.Password
                  placeholder="Nouveau mot de passe"
                  name="newPassword"
                  style={{ width: "70%" }}
                />
              </Form.Item>
            </>
          )}
          <Form.Item
            style={{ textAlign: "center", width: "70%", margin: "auto" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button "
            >
              Mettre à jour →
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateProf;
