import { Button, Form, Input, notification, Upload, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../../../Utils/constantURL";
import { useAuth } from "../../../../Utils/AuthContext";
import { useApi } from "../../../../Utils/Api";

const UpdateAdmin = () => {
  const api = useApi();
  const { authData, setuser } = useAuth();
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

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

  const getUserInfo = () => {
    // const userJson = sessionStorage.getItem("user");
    const userJson = authData?.user;

    if (userJson) {
      // Vérifie si userJson est une chaîne de caractères à analyser
      if (typeof userJson === "string") {
        try {
          const user = JSON.parse(userJson);
          return user;
        } catch (error) {
          console.error(
            "Erreur lors de l'analyse de l'utilisateur depuis authData :",
            error
          );
        }
      } else {
        // Si c'est déjà un objet, il suffit de le retourner
        return userJson;
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans authData");
    }

    return null;
  };

  useEffect(() => {
    const currentUser = getUserInfo();
    if (currentUser) {
      setUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
      form.setFieldsValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
    }
  }, [form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword" || name === "newPassword") {
      setPasswords({ ...passwords, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await api.patch(`/adminl2Ikfdsjlkjmsd/${user.id}`, {
        ...user,
        ...passwords,
      });

      if (response.status === 200) {
        const updatedUser = response.data; // Axios renvoie les données directement
        // sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setuser(updatedUser);
        openSuccessNotification();
      } else {
        throw new Error("Erreur lors de la mise à jour des informations");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations:", error);
      openErrorNotification(error.response?.data?.message || error.message);
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
          </p>{" "}
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
          {/* <Form.Item
            className="text-lg-center"
            name="oldPassword"
            onChange={handleInputChange}
            rules={[
              {
                // required: true,
                required: false,
                message: "Veuillez entrer votre mot de passe actuel !",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              placeholder="Mot de passe actuel"
              name="oldPassword"
              value={passwords.oldPassword}
              style={{ width: "70%" }}
            />
          </Form.Item> */}
          {/* <Form.Item
            className="text-lg-center"
            name="newPassword"
            onChange={handleInputChange}
            rules={[
              {
                // required: true,
                required: false,
                message: "Veuillez entrer votre nouveau mot de passe !",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              placeholder="Nouveau mot de passe"
              name="newPassword"
              value={passwords.newPassword}
              style={{ width: "70%" }}
            />
          </Form.Item> */}
          <Form.Item
            className="text-lg-center"
            name="oldPassword"
            onChange={handleInputChange}
            rules={[
              {
                required: false,
                message: "Veuillez entrer votre mot de passe actuel !",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              placeholder="Mot de passe actuel"
              name="oldPassword"
              style={{ width: "70%" }}
            />
          </Form.Item>
          <Form.Item
            className="text-lg-center"
            name="newPassword"
            onChange={handleInputChange}
            rules={[
              {
                required: false,
                message: "Veuillez entrer votre nouveau mot de passe !",
              },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input.Password
              placeholder="Nouveau mot de passe"
              name="newPassword"
              style={{ width: "70%" }}
            />
          </Form.Item>
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

export default UpdateAdmin;
