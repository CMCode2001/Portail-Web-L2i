import React, { useState, useEffect } from 'react';
import { RiFileDownloadLine } from 'react-icons/ri';
import Sidebar from './Course-Components/components/Sidebar';
import SearchBar from './Course-Components/components/SearchBar';
import CarouselComponent from './Course-Components/components/CarouselComponent';
import "../../Styles/Cours.css";

const CoursL2i = () => {
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedDate, setSelectedDate] = useState('');


  // useEffect(() => {
  //   fetch('/api/cours', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setCours(data);
  //       setFilteredCours(data);
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des cours:', error);
  //     });
  // }, []);
  useEffect(() => {
    const mockData = [
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L3', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L2', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Programmation', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L3', professor: 'Prof. A', lastModifiedAt: new Date('2024-06-27'), creatAt: new Date('2024-06-27'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      { id: 1, title: 'Algorithemique 1', pdfContent: '/pdf_test/Classeur2.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A', },
      // ... ajouter plus de cours
    ];

    setCours(mockData);
    setFilteredCours(mockData);
  }, []);

  
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterCours(term, selectedLevel, selectedSubject, selectedSemester, selectedDate);
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
      filtered = filtered.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (level) {
      filtered = filtered.filter(c => c.classeroom === level);
    }
    if (subject) {
      filtered = filtered.filter(c => c.subject === subject);
    }
    if (semester) {
      filtered = filtered.filter(c => c.classeroom === semester);
    }
    if (date) {
      filtered = filtered.filter(c => new Date(c.creatAt) >= new Date(date));
    }

    setFilteredCours(filtered);
  };


  return (
    <>
      {/* <CarouselComponent/> */}
      <div className='ligne-separateur'></div>
      <div className="cours-page">
        <Sidebar onFilter={handleFilter} />
        <div className="main-content">
          <SearchBar onSearch={handleSearch} />
          <div className="cours-list">
            {filteredCours.map(c => (
              <div key={c.id} className="cours-item">
                <div className="card">
                  <img src="" alt={c.title} className="card-image" />
                  <div className="card-content">
                    <h3>{c.title}</h3>
                    <p>{c.professor}</p>
                    <p>{new Date(c.creatAt).toLocaleDateString()}</p>
                    <a href={c.pdfContent} download className="download-button">Télécharger <RiFileDownloadLine /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursL2i;