// import React, { useState } from "react";
// import { Form, Input, Button, Upload, Select, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useApi } from "../../../Utils/Api";

// const { TextArea } = Input;
// const { Option } = Select;

// const SendEmailClasse = () => {
//   const api = useApi();
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);

//   // Fonction pour gérer l'envoi du formulaire
//   const handleFinish = async (values) => {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("message", values.message);
//     formData.append("subject", values.subject);
//     formData.append("classroom", values.classroom); // Ajoute la classe sélectionnée

//     // Ajouter le fichier s'il est disponible
//     if (file) {
//       formData.append("document", file);
//     }

//     try {
//       await api.post("/course/envoyerEmailClasse", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       message.success(
//         `Email envoyé avec succès à la classe ${values.classroom}!`
//       );
//     } catch (error) {
//       message.error("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fonction pour gérer la sélection du fichier
//   const handleFileChange = (info) => {
//     const { file } = info;
//     if (file.status === "done" || file.status === "removed") {
//       setFile(file.originFileObj);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Envoyer un email groupé à une classe spécifique</h2>
//       <Form layout="vertical" onFinish={handleFinish}>
//         {/* Sélection de la classe */}
//         <Form.Item
//           label="Choisir la classe"
//           name="classroom"
//           rules={[
//             {
//               required: true,
//               message: "La sélection d'une classe est obligatoire.",
//             },
//           ]}
//         >
//           <Select placeholder="Sélectionnez une classe">
//             <Option value="LICENCE1">Licence 1</Option>
//             <Option value="LICENCE2">Licence 2</Option>
//             <Option value="LICENCE3">Licence 3</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Sujet de l'email"
//           name="subject"
//           rules={[{ required: true, message: "Le sujet est obligatoire." }]}
//         >
//           <Input placeholder="Entrez le sujet de l'email" />
//         </Form.Item>

//         <Form.Item
//           label="Message"
//           name="message"
//           rules={[{ required: true, message: "Le message est obligatoire." }]}
//         >
//           <TextArea rows={4} placeholder="Entrez votre message" />
//         </Form.Item>

//         <Form.Item label="Pièce jointe (optionnelle)">
//           <Upload
//             beforeUpload={() => false} // Empêche l'upload automatique
//             onChange={handleFileChange}
//           >
//             <Button icon={<UploadOutlined />}>
//               Sélectionnez une pièce jointe
//             </Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Envoyer l'email
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default SendEmailClasse;

import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useApi } from "../../../Utils/Api";
import { useAuth } from "../../../Utils/AuthContext";

const { TextArea } = Input;
const { Option } = Select;

const SendEmailClasse = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { authData } = useAuth();

  const currentUser = authData?.user;

  // Fonction pour gérer l'envoi du formulaire
  const handleFinish = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("message", values.message);
    formData.append(
      "subject",
      `${values.subject} : ${currentUser?.firstName} ${currentUser?.lastName}`
    );
    formData.append("classroom", values.classroom);

    // Ajouter le fichier s'il est disponible
    if (file) {
      formData.append("document", file);
    }

    try {
      await api.post("/course/envoyerEmailClasse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(
        `Email envoyé avec succès à la classe ${values.classroom}!`
      );
    } catch (error) {
      message.error("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la sélection du fichier
  const handleFileChange = (info) => {
    if (info.file.status !== "removed") {
      setFile(info.file); // Utilise `info.file` directement
    } else {
      setFile(null);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Envoyer un email groupé à une classe spécifique</h2>
      <Form layout="vertical" onFinish={handleFinish}>
        {/* Sélection de la classe */}
        <Form.Item
          label="Choisir la classe"
          name="classroom"
          rules={[
            {
              required: true,
              message: "La sélection d'une classe est obligatoire.",
            },
          ]}
        >
          <Select placeholder="Sélectionnez une classe">
            <Option value="LICENCE1">Licence 1</Option>
            <Option value="LICENCE2">Licence 2</Option>
            <Option value="LICENCE3">Licence 3</Option>
          </Select>
        </Form.Item>

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

export default SendEmailClasse;
