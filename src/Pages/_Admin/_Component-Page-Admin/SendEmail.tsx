// import React from "react";

// const SendEmail = () => {
//   return (
//     <div style={{ textAlign: "center", marginTop: 50 }}>
//       <h2>Partie non encore implémentée</h2>
//     </div>
//   );
// };

// export default SendEmail;

import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useApi } from "../../../Utils/Api";

const { TextArea } = Input;

const SendEmail = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Fonction pour gérer l'envoi du formulaire
  const handleFinish = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("subject", values.subject);

    // Ajouter le fichier s'il est disponible
    if (file) {
      formData.append("document", file);
    }

    try {
      const response = await api.post("/course/envoyerEmailGroupe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Email envoyé avec succès à tous les étudiants!");
    } catch (error) {
      message.error("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la sélection du fichier
  const handleFileChange = (info) => {
    const { file } = info;
    if (file.status === "done" || file.status === "removed") {
      setFile(file.originFileObj);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Envoyer un email groupé aux étudiants</h2>
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Sujet de l'email"
          name="subject"
          rules={[{ required: true, message: "Le sujet est obligatoire." }]}
        >
          <Input placeholder="Entrez le sujet de l'email" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Le message est obligatoire." }]}
        >
          <TextArea rows={4} placeholder="Entrez votre message" />
        </Form.Item>

        <Form.Item label="Pièce jointe (optionnelle)">
          <Upload
            beforeUpload={() => false} // Empêche l'upload automatique
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>
              Sélectionnez une pièce jointe
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Envoyer l'email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendEmail;
