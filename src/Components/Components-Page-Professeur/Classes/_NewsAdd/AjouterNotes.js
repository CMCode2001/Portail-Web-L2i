import { SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import * as XLSX from "xlsx";
import ImgExcel from "../../../../Assets/img/office365.png";
import "../../../../Styles/Professeur/_News Add/AjouterNotes.css";
import { useApi } from "../../../../Utils/Api";
import { useAuth } from "../../../../Utils/AuthContext";

export default function AjouterNotes() {
  const [selectedLicence, setSelectedLicence] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notes, setNotes] = useState({});
  const searchInput = useRef(null);
  const { authData } = useAuth();
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const currentUser = authData?.user;

  const fetchEtudiant = (level) => {
    api
      .get(`/curentListStudent/niveau/${level}`)
      .then((response) => {
        const data = response.data;
        data.sort(
          (a, b) =>
            a.lastName.localeCompare(b.lastName) ||
            a.firstName.localeCompare(b.firstName)
        );
        const initialNotes = {};
        data.forEach((student) => {
          initialNotes[student.id] = {
            cc1: "absent",
            cc2: "absent",
            exam: "absent",
          };
        });
        setStudents(data);
        setNotes(initialNotes);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const handleButtonClick = (licence) => {
    setSelectedLicence(licence);
    fetchEtudiant(licence);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div onKeyDown={(e) => e.stopPropagation()}>
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
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: "INE",
      dataIndex: "ine",
      key: "ine",
      width: "20%",
      ...getColumnSearchProps("ine"),
    },
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "lastName",
      width: "30%",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Prénom",
      dataIndex: "firstName",
      key: "firstName",
      width: "30%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "CC1",
      key: "cc1",
      width: "10%",
      render: (text, record) => (
        <Input
          type="text"
          placeholder="CC1"
          value={notes[record.id]?.cc1 || "absent"}
          onChange={(e) => handleNoteChange(e, record.id, "cc1")}
          style={{ width: 70 }}
        />
      ),
    },
    {
      title: "CC2",
      key: "cc2",
      width: "10%",
      render: (text, record) => (
        <Input
          type="text"
          placeholder="CC2"
          value={notes[record.id]?.cc2 || "absent"}
          // defaultValue={notes[record.id]?.cc2 || "absent"}
          onChange={(e) => handleNoteChange(e, record.id, "cc2")}
          style={{ width: 70 }}
        />
      ),
    },
    {
      title: "Exam",
      key: "exam",
      width: "10%",
      render: (text, record) => (
        <Input
          type="text"
          placeholder="Exam"
          value={notes[record.id]?.exam || "absent"}
          // defaultValue={notes[record.id]?.exam || "absent"}
          onChange={(e) => handleNoteChange(e, record.id, "exam")}
          style={{ width: 70 }}
        />
      ),
    },
  ];

  const handleNoteChange = (e, studentId, noteType) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [studentId]: {
        ...prevNotes[studentId],
        [noteType]: e.target.value,
      },
    }));
  };

  const downloadExcel = () => {
    const studentData = students.map((student) => ({
      INE: student?.ine,
      Prénom: student?.firstName,
      Nom: student?.lastName,
      // Email: student?.email,
      CC1: notes[student.id]?.cc1 || "absent",
      CC2: notes[student.id]?.cc2 || "absent",
      Exam: notes[student.id]?.exam || "absent",
    }));

    const ws = XLSX.utils.json_to_sheet(studentData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Étudiants");

    XLSX.writeFile(wb, `${selectedLicence}_notes.xlsx`);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const workbook = XLSX.read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const updatedNotes = { ...notes };

        parsedData.forEach((row) => {
          const studentINE = row.INE || row.ine;
          // console.log("studentINE : " + studentINE);

          const student = students.find((s) => s.ine === String(studentINE));
          // console.log("students[0] : " + students[0].ine);

          if (student) {
            updatedNotes[student.id] = {
              cc1:
                row.CC1 || row.cc1 || updatedNotes[student.id]?.cc1 || "absent",
              cc2:
                row.CC2 || row.cc2 || updatedNotes[student.id]?.cc2 || "absent",
              exam:
                row.Exam ||
                row.exam ||
                updatedNotes[student.id]?.exam ||
                "absent",
            };
          }
        });

        setNotes(updatedNotes);
      };
      reader.readAsBinaryString(file);
    }
  };

  // const sendNotesStudent = () => {
  //   if (window.confirm("Voulez-vous envoyer les notes ?")) {
  //     setLoading(true);
  //     const studentNotes = students.map((student) => ({
  //       id: student?.id,
  //       firstName: student?.firstName,
  //       lastName: student?.lastName,
  //       email: student?.email,
  //       ine: student?.ine,
  //       professorName: currentUser?.firstName + " " + currentUser?.lastName,
  //       cc1: notes[student.id]?.cc1 || "absent",
  //       cc2: notes[student.id]?.cc2 || "absent",
  //       exam: notes[student.id]?.exam || "absent",
  //     }));

  //     api
  //       .post("/course/sendNotesStudents", {
  //         level: selectedLicence,
  //         studentNotes,
  //       })
  //       .then(() => setIsModalVisible(true))
  //       .catch((error) => console.error("Erreur d'envoi des notes:", error));
  //     setLoading(false);
  //   }
  // };

  const sendNotesStudent = () => {
    if (window.confirm("Voulez-vous envoyer les notes ?")) {
      setLoading(true);
      const studentNotes = students.map((student) => ({
        id: student?.id,
        firstName: student?.firstName,
        lastName: student?.lastName,
        email: student?.email,
        ine: student?.ine,
        professorName: currentUser?.firstName + " " + currentUser?.lastName,
        cc1: notes[student.id]?.cc1 || "absent",
        cc2: notes[student.id]?.cc2 || "absent",
        exam: notes[student.id]?.exam || "absent",
      }));

      api
        .post("/course/sendNotesStudents", {
          level: selectedLicence,
          studentNotes,
        })
        .then(() => {
          setIsModalVisible(true);
        })
        .catch((error) => {
          console.error("Erreur d'envoi des notes:", error);
        })
        .finally(() => {
          // Arrête le chargement une fois la requête terminée
          setLoading(false);
        });
    }
  };

  return (
    <div
      className="spaceContainer"
      style={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="headerSection"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Space>
          <Button
            id="btnProA"
            type="primary"
            icon={<TeamOutlined />}
            size="large"
            onClick={() => handleButtonClick("LICENCE1")}
          >
            Licence 1-2i
          </Button>
          <Button
            id="btnProB"
            type="primary"
            icon={<TeamOutlined />}
            size="large"
            onClick={() => handleButtonClick("LICENCE2")}
          >
            Licence 2-2i
          </Button>
          <Button
            id="btnProC"
            type="primary"
            icon={<TeamOutlined />}
            size="large"
            onClick={() => handleButtonClick("LICENCE3")}
          >
            Licence 3-2i
          </Button>
        </Space>
      </div>
      <div
        style={{
          marginTop: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selectedLicence && (
          <>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              id="downCSV"
            />
            <h2 style={{ marginRight: "6rem" }}>{selectedLicence}</h2>

            <Button
              type="dashed"
              size="large"
              onClick={downloadExcel}
              id="downExcel"
            >
              Télécharger
              <img src={ImgExcel} alt="Download" width={25} height={25} />
            </Button>
          </>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={students}
        rowKey="id"
        pagination={false}
        style={{ width: "100%", marginTop: "2rem" }}
      />
      <div>
        <br />
        <Button type="primary" onClick={sendNotesStudent} loading={loading}>
          Envoyer les notes
        </Button>
      </div>
      <Modal
        title="Notes envoyées avec succès"
        // title={modalTitle}
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
    </div>
  );
}
