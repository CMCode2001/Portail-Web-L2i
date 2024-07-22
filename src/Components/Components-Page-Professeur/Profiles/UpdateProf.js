import { Button, Form, Input, notification, Upload, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

import { SERVER_URL } from "../../../constantURL";

const UpdateProf = () => {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    name: '',
    email: '',
    photo: ''
  });

  const [emailStatus, setEmailStatus] = useState("");
  const [form] = Form.useForm();

  const openSuccessNotification = () => {
    notification.success({
      message: 'Mise à jour réussie',
      description: 'Vos informations ont été mises à jour avec succès!',
      placement: 'top',
    });
  };

  const openErrorNotification = (message) => {
    notification.error({
      message: 'Erreur de mise à jour',
      description: message,
      placement: 'top',
    });
  };

  const getUserInfo = () => {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return user;
      } catch (error) {
        console.error('Erreur lors de l\'analyse de l\'utilisateur depuis le sessionStorage:', error);
      }
    } else {
      console.warn('Aucun utilisateur trouvé dans le sessionStorage');
    }
    return null;
  };

  useEffect(() => {
    const currentUser = getUserInfo();
    if (currentUser) {
      setUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        name: currentUser.name,
        email: currentUser.email,
        photo: currentUser.photo,
      });
      form.setFieldsValue({
        firstName: currentUser.firstName,
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        openSuccessNotification();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour des informations");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations:', error);
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

  const handlePhotoChange = info => {
    if (info.file.status === 'done') {
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
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
           <div style={{ display:'flex', flexDirection: 'column', alignItems:'center', marginBottom: 20 }}>
            <Avatar size={150} src={user.photo} />
            <Upload
              name="photo"
              action={`${SERVER_URL}/upload-photo`}
              showUploadList={false}
              onChange={handlePhotoChange}
            >
              <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>Charger une photo</Button>
            </Upload>
          </div>

          <p className=" text-center h4 " style={{fontWeight:'bold'}}>Mettre à jour vos informations</p> <br/>
          
          <Form.Item className="text-lg-center"
            name="firstName"
            onChange={handleInputChange}
            rules={[
              { required: true, message: "Veuillez entrer votre prénom !" },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input placeholder="Prénom" name="firstName" value={user.firstName} style={{ width: '70%' }} />
          </Form.Item>

          <Form.Item
          className="text-lg-center"
            name="name"
            onChange={handleInputChange}
            rules={[
              { required: true, message: "Veuillez entrer votre nom !" },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input placeholder="Nom" name="name" value={user.name} style={{ width: '70%' }} />
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
            <Input placeholder="Email" name="email" value={user.email} style={{ width: '70%' }} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', width:'70%', margin:'auto' }}  >
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