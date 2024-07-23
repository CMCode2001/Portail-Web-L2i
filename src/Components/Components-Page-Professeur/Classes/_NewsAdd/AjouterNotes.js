import React, { useState, useRef } from "react";
import { TeamOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Space, Table, Input } from "antd";
import Highlighter from "react-highlight-words";
import * as XLSX from "xlsx";
import ImgExcel from "../../../../Assets/img/office365.png";
import "../../../../Styles/Professeur/_News Add/AjouterNotes.css";
import { SERVER_URL } from "../../../../constantURL";

export default function AjouterNotes() {
  const [selectedLicence, setSelectedLicence] = useState(null);
  const [etudant, setEtudiant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [notes, setNotes] = useState({});
  const searchInput = useRef(null);
  const token = sessionStorage.getItem("jwt");

  const handleButtonClick = (licence, level) => {
    setSelectedLicence(licence);
    fetchEtudiant(level);
  };

  const fetchEtudiant = (level) => {
    fetch(`${SERVER_URL}/student/niveau/${level}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const initialNotes = {};
        data.forEach((student) => {
          initialNotes[student.id] = {
            cc1: "absent",
            cc2: "absent",
            exam: "absent",
          };
        });
        setEtudiant(data);
        setNotes(initialNotes);
      })
      .catch((error) => console.error("Error fetching students:", error));
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
      title: "INE",
      dataIndex: "ine",
      key: "ine",
      width: "20%",
      ...getColumnSearchProps("ine"),
    },
    {
      title: "Prénom",
      dataIndex: "firstName",
      key: "firstName",
      width: "30%",
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
    const studentData = etudant.map((student) => ({
      CIN: student.cin,
      Prénom: student.firstName,
      Nom: student.name,
      Email: student.email,
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
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        // Mapping parsed data to the student structure
        const updatedStudents = parsedData.map((row) => ({
          id: row.ID, // Assuming your CSV contains an 'ID' column
          cin: row.CIN,
          firstName: row.Prenom,
          name: row.Nom,
          email: row.Email,
        }));

        setEtudiant(updatedStudents);

        // Initialize notes for the new students
        const initialNotes = {};
        updatedStudents.forEach((student) => {
          initialNotes[student.id] = {
            cc1: "absent",
            cc2: "absent",
            exam: "absent",
          };
        });
        setNotes(initialNotes);
      };
      reader.readAsBinaryString(file);
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
            id="btnPro2"
            type="primary"
            icon={<TeamOutlined />}
            size="large"
            onClick={() => handleButtonClick("Licence 1-2i", 1)}
          >
            Licence 1-2i
          </Button>
          <br />
          <Button
            id="btnPro2"
            type="primary"
            icon={<TeamOutlined />}
            size="large"
            onClick={() => handleButtonClick("Licence 2-2i", 2)}
          >
            Licence 2-2i
          </Button>
          <br />
          <Button
            id="btnPro2"
            type="primary"
            icon={<TeamOutlined />}
            size="large"
            onClick={() => handleButtonClick("Licence 3-2i", 3)}
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
      <div style={{ width: "100%", marginTop: "1rem" }}>
        <Table columns={columns} dataSource={etudant} rowKey="id" />
      </div>
    </div>
  );
}
