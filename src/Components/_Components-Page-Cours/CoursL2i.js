import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  TextField,
  Button,
  MenuItem,
  Collapse,
  Box,
  Pagination,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  FilterList as FilterIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { SERVER_URL } from "../../Utils/constantURL";

const CoursL2i = () => {
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(true); // State for showing/hiding filters
  const coursesPerPage = 6;

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = () => {
    fetch(`${SERVER_URL}/document`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Trier les cours par date décroissante
        const sortedData = data.sort(
          (a, b) => new Date(b.creatAt) - new Date(a.creatAt)
        );
        setCours(sortedData);
        setFilteredCours(sortedData);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des cours:", error)
      );
  };

  const filterCours = (searchTerm, level, professor, date) => {
    let filtered = cours;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c?.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c?.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (level) {
      filtered = filtered.filter((c) => c.classroomName === level);
    }
    if (professor) {
      filtered = filtered.filter((c) =>
        c.professorName.toLowerCase().includes(professor.toLowerCase())
      );
    }
    if (date) {
      filtered = filtered.filter((c) => {
        const courseDate = new Date(c.creatAt).toISOString().split("T")[0];
        return courseDate === date;
      });
    }
    setFilteredCours(filtered);
  };

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible); // Toggle filters visibility
  };

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  // const currentCourses = filteredCours.slice(indexOfFirstCourse, indexOfLastCourse);

  const currentCourses = filteredCours.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <Container>
      <Box
        textAlign="center"
        my={4}
        fontWeight="bold"
        borderRadius={50}
        color="#6B2239"
      >
        {/* Title and Description */}
        <Box
          sx={{
            borderBottom: "solid 5px rgb(19,121,140)",
            borderLeft: "solid 5px rgb(19,121,140)",
            borderRight: "solid 2px #6B2239",
            borderTop: "solid 2px #6B2239",
            paddingBottom: "20px",
            backgroundColor: "rgb(19,121,140, 0.1)",
            borderBottomRightRadius: "25px",
            borderTopLeftRadius: "25px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            Catalogue des Cours
          </Typography>
          <Typography variant="subtitle1" color="#6B2239" fontWeight="bold">
            Explorez et téléchargez vos cours en toute simplicite !
          </Typography>
        </Box>
      </Box>
      {/* Search Bar (Moved Outside Filters) */}
      <Box mb={4}>
        <TextField
          fullWidth
          label="Recherche par titre"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "50px", // Border radius for the input
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px", // Border radius for the input field
                "& fieldset": {
                  borderColor: "#085867", // Border color
                },
                "&:hover fieldset": {
                  borderColor: "#13798C", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#13798C", // Border color when focused
                },
              },
            },
          }}
        />
      </Box>

      {/* Toggle Filters Button */}
      <Box textAlign="center" mb={4}>
        <Button
          mt
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={toggleFilters}
          sx={{
            borderBottom: "solid 3px rgb(19,121,140)",
            borderLeft: "solid 3px rgb(19,121,140)",
            borderRight: "solid 2px #6B2239",
            borderTop: "solid 2px #6B2239",
            backgroundColor: "white",
            border: "solid 2px #6B2239",
            width: "235px",
            borderRadius: "25px",
            margin: "0 auto",
            transition: "0.5s",
            marginBottom: "25px",
            color: "#085867",
            "&:hover": {
              borderColor: "#13798C",
              border: "solid 2px white",
              color: "white",
              backgroundColor: "#6B2239",
            },
          }}
        >
          {filtersVisible ? "Cacher les filtres" : "Afficher les filtres"}
        </Button>
      </Box>

      {/* Filters (collapsible) */}
      <Collapse in={filtersVisible}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mb={4}
        >
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Niveau"
              variant="outlined"
              value={selectedLevel}
              onChange={(e) =>
                handleFilter(e.target.value, selectedProfessor, selectedDate)
              }
            >
              <MenuItem value="">Tous les niveaux</MenuItem>
              <MenuItem value="LICENCE1">L1</MenuItem>
              <MenuItem value="LICENCE2">L2</MenuItem>
              <MenuItem value="LICENCE3">L3</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Professeur"
              variant="outlined"
              value={selectedProfessor}
              onChange={(e) =>
                handleFilter(selectedLevel, e.target.value, selectedDate)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              variant="outlined"
              value={selectedDate}
              onChange={(e) =>
                handleFilter(selectedLevel, selectedProfessor, e.target.value)
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Reset Filters Button */}
        <Box textAlign="center" mb={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleFilter("", "", "")}
            startIcon={<FilterIcon />}
            sx={{
              borderBottom: "solid 3px rgb(19,121,140)",
              borderLeft: "solid 3px rgb(19,121,140)",
              borderRight: "solid 2px #6B2239",
              borderTop: "solid 2px #6B2239",
              backgroundColor: "white",
              borderRadius: "25px",
              border: "solid 2px #6B2239",
              width: "157px",
              margin: "0 auto",
              marginBottom: "-15px",
              color: "#085867",
              transition: "0.5s",
              "&:hover": {
                borderColor: "#13798C",
                border: "solid 2px white",
                color: "white",
                backgroundColor: "#6B2239",
              },
            }}
          >
            Réinitialiser
          </Button>
        </Box>
      </Collapse>

      <Divider
        component="div"
        role="presentation"
        sx={{
          border: "solid 5px rgb(19,121,140)",
          borderRadius: "25px",
          width: "350px",
          margin: "0 auto",
        }}
      ></Divider>

      {/* Courses Display */}
      {filteredCours.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            Aucun cours trouvé
          </Typography>
          <InfoIcon fontSize="large" color="action" />
        </Box>
      ) : (
        <Grid container spacing={4} mt={4}>
          {currentCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  height: "100%",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "solid 5px rgb(19,121,140)",
                  borderLeft: "solid 5px rgb(19,121,140)",
                  borderRight: "solid 2px #6B2239",
                  borderTop: "solid 2px #6B2239",
                  borderBottomRightRadius: "25px",
                  borderTopLeftRadius: "20px",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 175,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#085867", // Choisissez une couleur de fond
                    color: "white",
                    fontSize: "2rem",
                  }}
                >
                  {course?.classroomName}
                </CardMedia>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {course?.title}
                  </Typography>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {course?.url.substring(course?.url.indexOf("_") + 1) ||
                          course?.url}
                      </Typography>
                      <Divider
                        component="div"
                        sx={{
                          border: "solid 1px rgb(19,121,140)",
                          width: "100px",
                          margin: "0 auto",
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Professeur : Mr. {course?.professorName}
                        {/* {course?.classroom.professors[0].firstName}{" "}
                        {course?.classroom.professors[0].lastName.toUpperCase()} */}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        Niveau : {course.classroomName}
                        <br />
                        Date d'upload :{" "}
                        {new Date(course?.creatAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        target="blank"
                        href={`${SERVER_URL}/cours/${course?.url}`}
                        startIcon={<PdfIcon />}
                        fullWidth
                      >
                        Télécharger
                      </Button>
                    </CardActions>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {filteredCours.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredCours.length / coursesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default CoursL2i;
