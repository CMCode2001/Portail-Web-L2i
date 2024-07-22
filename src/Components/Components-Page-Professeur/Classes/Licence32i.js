import {
  CalendarOutlined,
  CheckOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  SendOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "../../../Styles/Professeur/Classes/Licence12i.css";
import { SERVER_URL } from "../../../constantURL";
import * as XLSX from "xlsx";

const { TextArea } = Input;

const Licence32i = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [title, setTitre] = useState("");
  const [pdfContent, setFichier] = useState(null);
  const [classeroom, setClasse] = useState("");
  const [etudant, setEtudiant] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Pour le Drawer de programmation de devoir
  const [isCourseDrawerVisible, setIsCourseDrawerVisible] = useState(false); // Pour le Drawer d'ajout de cours
  const [isNotesDrawerVisible, setIsNotesDrawerVisible] = useState(false); // Pour le Drawer d'ajout de notes
  const searchInput = useRef(null);
  const token = sessionStorage.getItem("jwt");
  const [notes, setNotes] = useState({});
  const [assignmentTitle, setAssignmentTitle] = useState(""); // Ajouté
  const [assignmentDueDate, setAssignmentDueDate] = useState(""); // Ajouté

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    const user = getUserInfo();
    fetchEtudiant();
  }, []);

  const fetchEtudiant = () => {
    fetch(`${SERVER_URL}/student/niveau/3`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.creatAt) - new Date(a.creatAt));
        setEtudiant(data);
      })
      .catch((error) => console.error("Error fetching forum:", error));
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const onSendingCourse = () => {
    const donnee = {
      title,
      classeroom_id: 3,
      professor_id: getUserInfo().id,
      createdBy: "Test",
    };

    const formatDonnee = new FormData();
    formatDonnee.append("course", JSON.stringify(donnee));
    formatDonnee.append("pdf", pdfContent);

    fetch(SERVER_URL + "/course", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: formatDonnee,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        setIsModalVisible(true);
        return response.json();
      })
      .then((data) => {
        console.log("Course sent successfully:", data);
      })
      .catch((error) => console.error("Error sending course:", error));
  };

  const getUserInfo = () => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
    }
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
      title: "CIN",
      dataIndex: "cin",
      key: "cin",
      width: "20%",
      ...getColumnSearchProps("cin"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Prénom",
      dataIndex: "firstName",
      key: "firstName",
      width: "40%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    
  ];

  const showDrawerDevoir = () => {
    setIsDrawerVisible(true);
  };

  const showDrawerCourse = () => {
    setIsCourseDrawerVisible(true);
  };

  const showDrawerNotes = () => {
    setIsNotesDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
    setIsCourseDrawerVisible(false);
    setIsNotesDrawerVisible(false);
  };

  const handleNoteChange = (e, studentId) => {
    setNotes({
      ...notes,
      [studentId]: e.target.value,
    });
  };

  const handleValidateNote = (studentId) => {
    console.log(`Note for student ${studentId} validated: ${notes[studentId]}`);
    // Optionally, send the note to the server or handle it as needed
  };

  const handleDownload = () => {
    const data = etudant.map((student) => ({
      CIN: student.cin,
      Prénoms: student.firstName,
      Noms: student.name,
      Notes: notes[student.id] || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Notes");
    XLSX.writeFile(workbook, "notes_etudiants_L3-2i.xlsx");
  };

  const handleSendNotes = () => {
    console.log("Notes sent to UFR:", notes);
    // Optionally, send the notes to the server or handle them as needed
  };

  return (
    <div id="samaDivContainer">
      <Modal
        title="Cours envoyé avec succès"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button
            key="ok"
            onClick={() => setIsModalVisible(false)}
            style={{ backgroundColor: "#008000", color: "white" }}
          >
            OK
          </Button>,
        ]}
      ></Modal>
      <div className="spaceContainer" style={{ marginBottom: "2rem" }}>
      <div className="headerSection">
        <h2 className="leftAlign">
          <TeamOutlined />
          Classe Licence 3-2i
        </h2>
        
        <Space  className="rightAlign">
          <Button
            id="btnPro2"
            type="primary"
            icon={<CalendarOutlined />}
            style={{ width: "13rem" }}
            size="large"
            onClick={showDrawerDevoir}
          >
            Programmer Devoir
          </Button>
            <br/>
            <br/>
            <br/>
          <Button
            id="btnPro2"
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={showDrawerNotes}
          >
            Ajouter Notes
          </Button>
          <br/>
          <br/>
          <br/>

          <Button
            id="btnPro2"
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={showDrawerCourse}
          >
            Ajouter Cours
          </Button>
        </Space>
      </div>
      </div>
      <div className="tableSection">
        <h4 style={{ textAlign: "center" }}>Liste des étudiants</h4>
        <Table columns={columns} dataSource={etudant} />
      </div>
      {/* Programmer Devoir */}
      <Drawer
        title="Programmer un nouveau devoir"
        width={720}
        onClose={onClose}
        open={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={onClose}
              style={{ backgroundColor: "#600622", color: "white" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#13798C", color: "white" }}
              onClick={() => {
                onClose();
                // onSendingAssignment(); // Uncomment if needed
              }}
              type="primary"
            >
              Envoyer <SendOutlined />
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                name="assignmentTitle"
                label="Titre du Devoir"
                rules={[{ required: true, message: "Veuillez entrer le titre du devoir" }]}
              >
                <Input
                  placeholder="Veuillez entrer le titre du devoir"
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer la description du devoir",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Veuillez entrer la description du devoir" />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                name="dueDate"
                label="Date du Devoir"
                rules={[{ required: true, message: "Veuillez sélectionner une date d'échéance" }]}
              >
                <Input
                  type="date"
                  onChange={(e) => setAssignmentDueDate(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/* ======================== FIN PROGRAMMER DEVOIR ========================= */}

      {/* ==========================   AJOUTER COURS ============================= */}
      <Drawer
        title="Ajouter un nouveau cours"
        width={720}
        onClose={onClose}
        open={isCourseDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={onClose}
              style={{ backgroundColor: "#600622", color: "white" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#13798C", color: "white" }}
              onClick={() => {
                onClose();
                onSendingCourse();
              }}
              type="primary"
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
          </Row>
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
                <input
                  className="custom-file-input"
                  id="imageCouverture"
                  onChange={(e) => setFichier(e.target.files[0])}
                  type="file"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/* ==========================  FIN AJOUTER COURS ============================= */}

      {/* ==========================   AJOUTER NOTES ============================= */}
      <Drawer
        title="Ajouter des notes"
        width={720}
        onClose={onClose}
        open={isNotesDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={onClose}
              style={{ backgroundColor: "#600622", color: "white" }}
            >
              Fermer
            </Button>
            {/* <Button
              style={{ backgroundColor: "#13798C", color: "white" }}
              onClick={() => {
                onClose();
                handleSendNotes();
              }}
              type="primary"
            >
              Envoyer à l'UFR <SendOutlined />
            </Button> */}
            <Button
              style={{ backgroundColor: "#13798C", color: "white" }}
              onClick={handleDownload}
              type="primary"
            >
              Télécharger Excel <DownloadOutlined />
            </Button>
          </Space>
        }
      >
      <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Table dataSource={etudant} pagination={false} rowKey="id">
            <Table.Column
              title="CIN"
              dataIndex="cin"
              key="cin"
              width="20%"
            />
            <Table.Column
              title="Prénom"
              dataIndex="firstName"
              key="firstName"
              width="25%"
            />
            <Table.Column
              title="Nom"
              dataIndex="name"
              key="name"
              width="25%"
            />
            <Table.Column
              title="Note"
              key="note"
              width="30%"
              render={(text, record) => (
                <Space>
                  <Input
                    type="number"
                    placeholder="Entrez la note"
                    value={notes[record.id] || ""}
                    onChange={(e) => handleNoteChange(e, record.id)}
                    style={{ width: 70 }}
                  />
                  <Button onClick={() => handleValidateNote(record.id)} style={{backgroundColor:"#13798C"}}>
                    <CheckOutlined style={{ color:"white"}} />
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Col>
      </Row>
    </Form>

      </Drawer>
      {/* ==========================  FIN AJOUTER NOTES ============================= */}
    </div>
  );
};

export default Licence32i;
