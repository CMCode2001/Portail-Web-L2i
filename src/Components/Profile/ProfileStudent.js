import { Button, Form, Input, notification } from "antd";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../Utils/constantURL";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./ProfileStudent.css";

const ProfileStudent = () => {
  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    specialityStudent: "",
    classeroom_id: "",
    active: false,
    ine: "",
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
    const userJson = sessionStorage.getItem("student");
    if (userJson) {
      try {
        const student = JSON.parse(userJson);
        return student;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'étudiant depuis le sessionStorage:",
          error
        );
      }
    } else {
      console.warn("Aucun étudiant trouvé dans le sessionStorage");
    }
    return null;
  };

  // const getUserInfo = () => {
  //   const userJson = sessionStorage.getItem("student");
  //   if (userJson) {
  //     try {
  //       const student = JSON.parse(userJson);
  //       return student;
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de l'analyse de l'étudiant depuis le sessionStorage:",
  //         error
  //       );
  //     }
  //   } else {
  //     console.warn("Aucun étudiant trouvé dans le sessionStorage");
  //   }
  //   return null;
  // };

  // useEffect(() => {
  //   const currentStudent = getUserInfo();
  //   if (currentStudent) {
  //     setStudent({
  //       id: currentStudent.id,
  //       firstName: currentStudent.firstName,
  //       lastName: currentStudent.lastName,
  //       email: currentStudent.email,
  //       specialityStudent: currentStudent.specialityStudent,
  //       classeroom_id: currentStudent.classeroom_id,
  //       active: currentStudent.active,
  //       ine: currentStudent.ine,
  //     });
  //     form.setFieldsValue({
  //       firstName: currentStudent.firstName,
  //       lastName: currentStudent.lastName,
  //       email: currentStudent.email,
  //       specialityStudent: currentStudent.specialityStudent,
  //       // classeroom_id: currentStudent.classeroom_id,
  //       // active: currentStudent.active,
  //       ine: currentStudent.ine,
  //     });
  //   }
  // }, [form]);

  useEffect(() => {
    const currentStudent = getUserInfo();
    if (currentStudent) {
      setStudent({
        id: currentStudent.id,
        firstName: currentStudent.firstName,
        lastName: currentStudent.lastName,
        email: currentStudent.email,
        specialityStudent: currentStudent.specialityStudent,
        classeroom_id: currentStudent.classeroom_id,
        active: currentStudent.active,
        ine: currentStudent.ine,
      });
      form.setFieldsValue({
        firstName: currentStudent.firstName,
        lastName: currentStudent.lastName,
        email: currentStudent.email,
        specialityStudent: currentStudent.specialityStudent,
        classeroom_id: currentStudent.classeroom_id,
        ine: currentStudent.ine,
      });
    }
  }, [form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword" || name === "newPassword") {
      setPasswords({ ...passwords, [name]: value });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleFormSubmit = async () => {
    const token = sessionStorage.getItem("jwt");
    try {
      const response = await fetch(`${SERVER_URL}/student/${student.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...student, ...passwords }),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        sessionStorage.setItem("student", JSON.stringify(updatedStudent));
        openSuccessNotification();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la mise à jour des informations"
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

  const backHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="container">
      <Button
        style={{ backgroundColor: "#6B2239", color: "white" }}
        className="backBouton"
        onClick={backHome}
      >
        <ArrowLeftOutlined />
      </Button>

      <Form
        form={form}
        name="update-form"
        initialValues={student}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <p className="text-center h4" style={{ fontWeight: "bold" }}>
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
            value={student.email}
            style={{ width: "70%" }}
          />
        </Form.Item>
        <Form.Item
          className="text-lg-center"
          name="specialityStudent"
          onChange={handleInputChange}
          rules={[
            { required: true, message: "Veuillez entrer votre spécialité !" },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Input
            placeholder="Spécialité"
            name="specialityStudent"
            value={student.specialityStudent}
            style={{ width: "70%" }}
          />
        </Form.Item>
        <Form.Item
          className="text-lg-center"
          name="classeroom_id"
          onChange={handleInputChange}
          rules={[
            { required: true, message: "Veuillez entrer votre classe !" },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Input
            placeholder="Classe"
            name="classeroom_id"
            value={student.classeroom_id}
            style={{ width: "70%" }}
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
        <Form.Item
          className="text-lg-center"
          name="oldPassword"
          onChange={handleInputChange}
          rules={[
            {
              required: true,
              message: "Veuillez entrer votre ancien mot de passe !",
            },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Input.Password
            placeholder="Ancien mot de passe"
            name="oldPassword"
            value={passwords.oldPassword}
            style={{ width: "70%" }}
          />
        </Form.Item>
        <Form.Item
          className="text-lg-center"
          name="newPassword"
          onChange={handleInputChange}
          rules={[
            {
              required: true,
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
        </Form.Item>
        <Form.Item
          style={{ textAlign: "center", width: "70%", margin: "auto" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Mettre à jour →
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileStudent;
