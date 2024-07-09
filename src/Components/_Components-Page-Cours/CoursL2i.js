import { FilePdfOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../Styles/Cours.css";
import { SERVER_URL } from "../../constantURL";
import SearchBar from "./Course-Components/components/SearchBar";
import Sidebar from "./Course-Components/components/Sidebar";

const CoursL2i = () => {
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [mockData, setCourse] = useState([]);
  const fetchCourse = () => {
    fetch(`${SERVER_URL}/course`, {
      method: "GET",
      headers: {
        // Authorization: `${token}`,
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
        setCourse(data);
      })
      .catch((error) => console.error("Error fetching forum:", error));
  };

  useEffect(() => {
    fetchCourse();

    setCours(mockData);
    setFilteredCours(mockData);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterCours(
      term,
      selectedLevel,
      selectedSubject,
      selectedSemester,
      selectedDate
    );
  };

  const handleFilter = (level, subject, semester, date) => {
    setSelectedLevel(level);
    setSelectedSubject(subject);
    setSelectedSemester(semester);
    setSelectedDate(date);
    filterCours(searchTerm, level, subject, semester, date);
  };

  const filterCours = (searchTerm, level, subject, semester, date) => {
    let filtered = cours;

    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // if (level) {
    //   filtered = filtered.filter((c) => c?.classeroom === level);
    // }
    // if (subject) {
    //   filtered = filtered.filter((c) => c?.subject === subject);
    // }
    // if (semester) {
    //   filtered = filtered.filter((c) => c?.classeroom === semester);
    // }
    if (date) {
      filtered = filtered.filter((c) => new Date(c?.creatAt) >= new Date(date));
    }

    setFilteredCours(filtered);
  };

  return (
    <>
      <div className="cours-page">
        <Sidebar onFilter={handleFilter} />
        <div className="main-content">
          <SearchBar onSearch={handleSearch} />
          <Row>
            {filteredCours &&
              // filteredCours.map((c) => (
              mockData.map((c) => (
                <Col key={c.id} xs={12} md={2} lg={4}>
                  <div className="card mb-3 " style={{ width: "20rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{c?.title}</h5>
                      <p className="card-text">{c?.createdBy}</p>
                      <p className="card-text">
                        {new Date(c?.creatAt).toLocaleDateString()}
                      </p>
                      <a
                        href={SERVER_URL + `/course/${c?.id}/pdf`}
                        // href={SERVER_URL}
                        download
                        id="monbuttonDow"
                      >
                        Télécharger <FilePdfOutlined />
                      </a>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default CoursL2i;
