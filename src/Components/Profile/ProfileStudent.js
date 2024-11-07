import { Button, Form, Input, notification, Select, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAuth } from "../../Utils/AuthContext";
import { useApi } from "../../Utils/Api";

const ProfileStudent = () => {
  const api = useApi();
  const { authData, setuser, logout } = useAuth();
  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    specialityStudent: "",
    classroom_id: "",
    active: false,
    ine: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [changePassword, setChangePassword] = useState(false);
  // const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [form] = Form.useForm();

  const openSuccessNotification = () => {
    notification.success({
      message: "Mise à jour réussie",
      description: "Vos informations ont été mises à jour avec succès!",
      placement: "top",
    });
  };

  const openErrorNotification = () => {
    notification.error({
      message: "Erreur de mise à jour",
      // description: message,
      placement: "top",
    });
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
      window.location.href = "/connexion";
    } catch (error) {
      logout(); // En cas d'erreur, déconnecter quand même l'utilisateur localement
      window.location.href = "/";
      console.error("Erreur lors de la requête de déconnexion:", error);
    }
  };

  useEffect(() => {
    const currentStudent = authData?.user;
    if (currentStudent) {
      const fetchStudent = async () => {
        try {
          const response = await api.get(`/student/${currentStudent.id}`);

          if (response.status !== 200) {
            throw new Error("Error fetching student data");
          }

          const data = response.data; // Axios renvoie les données directement
          setStudent(data);

          form.setFieldsValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            specialityStudent: data.specialityStudent,
            classroom_id: data.classroom_id,
            ine: data.ine,
          });
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudent();
    }
  }, [form, authData, api]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword" || name === "newPassword") {
      setPasswords({ ...passwords, [name]: value });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleFormSubmit = async () => {
    try {
      const body = changePassword
        ? { ...student, ...passwords }
        : { ...student };

      const response = await api.patch(`/student/${student.id}`, body);

      if (response.status === 200) {
        const contentType = response.headers["content-type"];
        if (contentType && contentType.includes("application/json")) {
          const updatedStudent = response.data;
          setuser(updatedStudent);
          openSuccessNotification();

          // Déconnecter l'utilisateur si le mot de passe a été changé
          if (changePassword) {
            handleLogout();
          }
        } else {
          openSuccessNotification();
        }
      } else {
        throw new Error(
          response.data?.message ||
            "Erreur lors de la mise à jour des informations"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations:", error);
      openErrorNotification();
    }
  };

  const onFinish = () => {
    handleFormSubmit();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      setPasswordStatus("error");
      return Promise.reject(new Error("Veuillez entrer votre mot de passe!"));
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      setPasswordStatus("error");
      return Promise.reject(
        new Error(
          "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial !"
        )
      );
    }
    setPasswordStatus("success");
    return Promise.resolve();
  };

  const backHome = () => {
    window.location.href = "/";
  };

  const classroomOptions = [
    { label: "Licence 1", value: 1 },
    { label: "Licence 2", value: 2 },
    { label: "Licence 3", value: 3 },
  ];

  const choixOptions = [
    { label: "None", value: "None" },
    { label: "GL", value: "GL" },
    { label: "RS", value: "RS" },
  ];

  return (
    <div className="container">
      <br />
      <Button
        style={{ backgroundColor: "#6B2239", color: "white" }}
        className="backBouton"
        onClick={backHome}
      >
        <ArrowLeftOutlined />
      </Button>

      <br />

      <Form
        form={form}
        name="update-form"
        initialValues={student}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <p className="text-center h4" style={{ fontWeight: "bold" }}>
          <br />
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
            value={student.firstName}
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
            value={student.lastName}
            style={{ width: "70%" }}
          />
        </Form.Item>
        {/* <Form.Item
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
            value={student.email}
            style={{ width: "70%" }}
          />
        </Form.Item> */}
        <Form.Item
          className="text-lg-center"
          name="specialityStudent"
          rules={[
            { required: true, message: "Veuillez entrer votre spécialité !" },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Select
            name="specialityStudent"
            value={student.specialityStudent}
            style={{ width: "70%" }}
            options={choixOptions}
            onChange={(value) =>
              setStudent({ ...student, specialityStudent: value })
            }
          />
        </Form.Item>
        <Form.Item
          className="text-lg-center"
          name="classroom_id"
          rules={[
            { required: true, message: "Veuillez entrer votre classe !" },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Select
            name="classroom_id"
            value={student.classroom_id}
            style={{ width: "70%" }}
            options={classroomOptions}
            onChange={(value) =>
              setStudent({ ...student, classroom_id: value })
            }
          />
        </Form.Item>
        <Form.Item
          className="text-lg-center"
          name="ine"
          onChange={handleInputChange}
          rules={[{ required: true, message: "Veuillez entrer votre INE !" }]}
          style={{ marginBottom: 20 }}
        >
          <Input
            placeholder="INE"
            name="ine"
            value={student.ine}
            style={{ width: "70%" }}
          />
        </Form.Item>

        {/* Toggle pour changer le mot de passe */}
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
                  message: "Veuillez entrer votre actuelle mot de passe !",
                },
              ]}
              style={{ marginBottom: 20 }}
            >
              <Input.Password
                placeholder="Mot de passe actuel"
                name="currentPassword" // Utilisez un nom différent
                style={{ width: "70%" }}
                autocomplete="new-password" // Indiquer qu'il s'agit d'un nouveau mot de passe
              />
            </Form.Item>
            <Form.Item
              className="text-lg-center"
              name="newPassword"
              validateStatus={passwordStatus}
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

        <Form.Item style={{ textAlign: "center", marginBottom: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#6B2239",
              borderColor: "#6B2239",
              width: "50%",
            }}
          >
            Mettre à jour
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileStudent;
