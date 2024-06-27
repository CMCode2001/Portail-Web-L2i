import {
  DownloadOutlined,
  SearchOutlined,
  SendOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "../../../Styles/Professeur/Classes/Licence12i.css";
import { SERVER_URL } from "../../../constantURL";

const { TextArea } = Input;

const data = [
  {
    key: "1",
    prenom: "Cheikh Mbacke",
    nom: "COLY",
    email: "cm.c@zig.univ.sn",
    cin: "202000142",
  },
  {
    key: "1",
    prenom: "Cheikh Mbacke",
    nom: "COLY",
    email: "cm.c@zig.univ.sn",
    cin: "202000142",
  },
  {
    key: "1",
    prenom: "Cheikh Mbacke",
    nom: "COLY",
    email: "cm.c@zig.univ.sn",
    cin: "202000142",
  },
];

const Licence22i = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [title, setTitre] = useState("");
  const [pdfContent, setFichier] = useState(null);
  const [classeroom, setClasse] = useState("");
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);
  const token = sessionStorage.getItem("jwt");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Fonction pour récupérer et utiliser les informations de l'utilisateur
  const getUserInfo = () => {
    // Récupérer la chaîne JSON stockée dans sessionStorage
    const userJson = sessionStorage.getItem("user");

    if (userJson) {
      try {
        // Convertir la chaîne JSON en un objet JavaScript
        const user = JSON.parse(userJson);
        // Vous pouvez également retourner ou utiliser ces valeurs dans votre application
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
        // Vous pouvez gérer cette erreur, par exemple, en affichant un message d'erreur à l'utilisateur
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
      // Gérer le cas où il n'y a pas d'utilisateur dans le sessionStorage
    }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const onSendingCourse = () => {
    const donnee = {
      title,
      classeroom_id: 2,
      professor_id: getUserInfo().id,
      createdBy: "Test",
      // Ajoutez d'autres champs de donnee si nécessaire
    };

    const formatDonnee = new FormData();
    formatDonnee.append("course", JSON.stringify(donnee)); // Si besoin de transmettre des données JSON supplémentaires
    formatDonnee.append("pdf", pdfContent); // pdfContent est votre fichier PDF
    console.log(formatDonnee.get("pdf"));
    // Récupérez le jeton d'authentification de sessionStorage si nécessaire
    // const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + "/course", {
      method: "POST",
      headers: {
        Authorization: `${token}`, // Assurez-vous d'avoir correctement récupéré et inclus votre token
      },
      body: formatDonnee, // Passer le FormData directement comme corps de la requête
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
          throw new Error(response.json);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Course sent successfully:", data);
        // Réinitialiser le formulaire ou effectuer d'autres actions après l'envoi réussi
      })
      .catch((error) => console.error("Error sending course:", error));
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
      width: "30%",
      ...getColumnSearchProps("prenom"),
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      width: "20%",
      ...getColumnSearchProps("nom"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "CIN",
      dataIndex: "cin",
      key: "cin",
      ...getColumnSearchProps("cin"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleFileChange = (info) => {
    let fileList = [...info.fileList];

    // Limitez la liste des fichiers à 1 pour n'uploader qu'un seul fichier
    fileList = fileList.slice(-1);

    // Mettre à jour le state
    setFichier(fileList);
  };

  const beforeUpload = (file) => {
    // Limitez le type de fichier à PDF
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      console.log(`${file.name} n'est pas un fichier PDF valide.`);
    }
    return isPDF;
  };

  return (
    <div id="samaDivContainer">
      <div className="headerSection">
        <h2 className="leftAlign">
          <TeamOutlined />
          Classe Licence 1-2i
        </h2>
        <Button
          className="rightAlign"
          id="btnPro2"
          type="primary"
          icon={<DownloadOutlined />}
          size="large"
          onClick={showDrawer}
        >
          Ajouter Cours
        </Button>
      </div>
      <div className="tableSection">
        <h4 style={{ textAlign: "center" }}>Liste des etudiants</h4>
        <Table columns={columns} dataSource={data} />
      </div>
      <Drawer
        title="Ajouter un nouveau cours"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Fermer</Button>
            <Button
              onClick={() => {
                // onClose();
                onSendingCourse();
              }}
              type="primary"
              id="btnPro2"
            >
              Envoyer <SendOutlined />
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courseTitle"
                onChange={(e) => setTitre(e.target.value)}
                label="Titre du Cours (Intitulé)"
                rules={[
                  {
                    required: true,
                    message: "Please enter the course title",
                  },
                ]}
              >
                <Input placeholder="Please enter the course title" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name="professorMail"
                label="Email Professeur"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre email",
                  },
                ]}
              >
                <Input placeholder="Veuillez entrer votre email" />
              </Form.Item>
            </Col> */}
          </Row>
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="studentsMail"
                label="Email Etudiants"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer les mails des etudiants",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Veuillez entrer les mails des etudiants"
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="pdf"
                label="PDF"
                rules={[
                  {
                    required: true,
                    message: "Please upload the PDF file",
                  },
                ]}
              >
                {/* <Upload>
                  <Button onChange={handleFileChange} icon={<PlusOutlined />}>
                    {" "}
                    Upload PDF
                  </Button>
                </Upload> */}
                <input
                  class=" custom-file-input"
                  formControlName="imageCouverture"
                  id="imageCouverture"
                  onChange={(e) => setFichier(e.target.files[0])}
                  type="file"
                />
                {/* <Upload
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                  // fileList={pdfContent ? [pdfContent] : []}
                  maxCount={1}
                >
                  <Button icon={<PlusOutlined />}>Uploader PDF</Button>
                </Upload> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Licence22i;
