import { FilePdfOutlined } from "@ant-design/icons";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  Card,
  InputGroup,
} from "react-bootstrap";
import "../../Styles/Cours.css";
import { SERVER_URL } from "../../Utils/constantURL";

const CoursL2i = () => {
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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
        setCours(data);
        setFilteredCours(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCours(term, selectedLevel, selectedProfessor, selectedDate);
  };

  const handleFilter = (level, professor, date) => {
    setSelectedLevel(level);
    setSelectedProfessor(professor);
    setSelectedDate(date);
    filterCours(searchTerm, level, professor, date);
  };

  const filterCours = (searchTerm, level, professor, date) => {
    let filtered = cours;

    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (level) {
      filtered = filtered.filter((c) => c.classeroom.name === level);
    }
    if (professor) {
      filtered = filtered.filter((c) =>
        c.createdBy.toLowerCase().includes(professor.toLowerCase())
      );
    }
    if (date) {
      filtered = filtered.filter((c) => {
        const courseDate = new Date(c.creatAt).toLocaleDateString();
        const filterDate = new Date(date).toLocaleDateString();
        return courseDate === filterDate;
      });
    }

    setFilteredCours(filtered);
  };

  return (
    <Container>
      <Form>
        <Row className="mb-3 justify-content-center">
          <Col md={6} className="centered">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Recherche par titre"
                value={searchTerm}
                onChange={handleSearch}
              />
              <InputGroup.Text className="loupe">
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <div className="d-md-none text-center mb-3">
          <Button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>
        </div>
        <Row className={`mb-3 ${showFilters ? "" : "d-none d-md-flex"}`}>
          <Col md={2} className="mb-2 mb-md-0">
            <Form.Select
              value={selectedLevel}
              onChange={(e) =>
                handleFilter(e.target.value, selectedProfessor, selectedDate)
              }
            >
              <option value="">Tous les niveaux</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </Form.Select>
          </Col>
          <Col md={3} className="mb-2 mb-md-0">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Professeur"
                value={selectedProfessor}
                onChange={(e) =>
                  handleFilter(selectedLevel, e.target.value, selectedDate)
                }
              />
              <InputGroup.Text className="loupe">
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={3} className="mb-2 mb-md-0">
            <InputGroup>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  handleFilter(selectedLevel, selectedProfessor, e.target.value)
                }
              />
              <InputGroup.Text className="loupe">
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={3}>
            <Button
              onClick={() => handleFilter("", "", "")}
              className="w-100"
              style={{
                backgroundColor: "#13798C",
                color: "#ffffff",
                // border: '5px solid #6B2239'
              }}
            >
              Réinitialiser les filtres
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="justify-content-center">
        {filteredCours.map((course) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={course.id}
            className="custom-col mb-4 d-flex"
          >
            <Card className="card w-100">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {course.createdBy}
                </Card.Subtitle>
                <Card.Text>
                  Niveau : {course.classeroom.name}
                  <br />
                  Date d'upload :{" "}
                  {new Date(course.creatAt).toLocaleDateString()}
                </Card.Text>
                <Button
                  variant="primary"
                  className="btn"
                  href={SERVER_URL + `/course/${course?.id}/pdf`}
                  style={{ backgroundColor: "#13798C", color: "#ffffff" }}
                >
                  <FilePdfOutlined /> Télécharger
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CoursL2i;
