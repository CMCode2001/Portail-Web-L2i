import { Button, Form, Input, notification, Select, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../Utils/constantURL";
import { ArrowLeftOutlined } from "@ant-design/icons";

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

  const openErrorNotification = () => {
    notification.error({
      message: "Erreur de mise à jour",
      // description: message,
      placement: "top",
    });
  };

  const getUserInfo = () => {
    const userJson = sessionStorage.getItem("user");
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

  useEffect(() => {
    const currentStudent = getUserInfo();

    if (currentStudent) {
      const fetchStudent = async () => {
        const token = sessionStorage.getItem("access_token");
        try {
          const response = await fetch(
            SERVER_URL + `/student/${currentStudent.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Optionnel, mais utile si besoin de spécifier
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error fetching student data");
          }

          const data = await response.json();
          setStudent(data);

          form.setFieldsValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            specialityStudent: data.specialityStudent,
            classeroom_id: data.classeroom_id,
            ine: data.ine,
          });
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudent();
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
    const token = sessionStorage.getItem("access_token");
    try {
      const body = changePassword
        ? { ...student, ...passwords }
        : { ...student };

      const response = await fetch(`${SERVER_URL}/student/${student.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const updatedStudent = await response.json();
          sessionStorage.setItem("student", JSON.stringify(updatedStudent));
          openSuccessNotification();
        } else {
          openSuccessNotification();
        }
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la mise à jour des informations"
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
        {/* <Form.Item
          className="text-lg-center"
          name="specialityStudent"
          onChange={handleInputChange}
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
        {/* <Form.Item
          className="text-lg-center"
          name="classeroom_id"
          onChange={handleInputChange}
          rules={[
            { required: true, message: "Veuillez entrer votre classe !" },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Select
            name="classeroom_id"
            value={student.classeroom_id}
            style={{ width: "70%" }}
            options={classroomOptions}
          />
        </Form.Item> */}
        <Form.Item
          className="text-lg-center"
          name="classeroom_id"
          rules={[
            { required: true, message: "Veuillez entrer votre classe !" },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Select
            name="classeroom_id"
            value={student.classeroom_id}
            style={{ width: "70%" }}
            options={classroomOptions}
            onChange={(value) =>
              setStudent({ ...student, classeroom_id: value })
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
                style={{ width: "70%" }}
              />
            </Form.Item>
            <Form.Item
              className="text-lg-center"
              name="newPassword"
              onChange={handleInputChange}
              rules={[
                {
                  required: changePassword,
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
