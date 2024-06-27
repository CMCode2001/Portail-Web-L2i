import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { RiFileDownloadLine } from 'react-icons/ri';
import Sidebar from './Course-Components/components/Sidebar';
import SearchBar from './Course-Components/components/SearchBar';
import "../../Styles/Cours.css";
import { FilePdfOutlined } from '@ant-design/icons';

const CoursL2i = () => {
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const mockData = [
      { id: 1, title: 'Algorithmiques 1', pdfContent: '/pdf_test/Algorithmiques1.pdf', classeroom: 'L1', professor: 'Prof. A', lastModifiedAt: new Date('2023-06-20'), creatAt: new Date('2023-06-01'), createdBy: 'Prof. A' },
      { id: 2, title: 'Programmation en C', pdfContent: '/pdf_test/Programmation_C.pdf', classeroom: 'L2', professor: 'Prof. B', lastModifiedAt: new Date('2023-07-15'), creatAt: new Date('2023-07-01'), createdBy: 'Prof. B' },
      { id: 3, title: 'Structures de Données', pdfContent: '/pdf_test/Structures_Donnees.pdf', classeroom: 'L2', professor: 'Prof. C', lastModifiedAt: new Date('2023-08-10'), creatAt: new Date('2023-08-01'), createdBy: 'Prof. C' },
      { id: 4, title: 'Bases de Données', pdfContent: '/pdf_test/Bases_Donnees.pdf', classeroom: 'L3', professor: 'Prof. D', lastModifiedAt: new Date('2023-09-05'), creatAt: new Date('2023-09-01'), createdBy: 'Prof. D' },
      { id: 5, title: 'Réseaux Informatiques', pdfContent: '/pdf_test/Reseaux_Informatiques.pdf', classeroom: 'L3', professor: 'Prof. E', lastModifiedAt: new Date('2023-10-20'), creatAt: new Date('2023-10-01'), createdBy: 'Prof. E' },
      { id: 6, title: 'Systèmes d\'Exploitation', pdfContent: '/pdf_test/Systemes_Exploitation.pdf', classeroom: 'L1', professor: 'Prof. F', lastModifiedAt: new Date('2023-11-12'), creatAt: new Date('2023-11-01'), createdBy: 'Prof. F' },
      { id: 7, title: 'Sécurité Informatique', pdfContent: '/pdf_test/Securite_Informatique.pdf', classeroom: 'L3', professor: 'Prof. G', lastModifiedAt: new Date('2023-12-08'), creatAt: new Date('2023-12-01'), createdBy: 'Prof. G' },
      { id: 8, title: 'Intelligence Artificielle', pdfContent: '/pdf_test/Intelligence_Artificielle.pdf', classeroom: 'L2', professor: 'Prof. H', lastModifiedAt: new Date('2024-01-18'), creatAt: new Date('2024-01-01'), createdBy: 'Prof. H' },
      { id: 9, title: 'Machine Learning', pdfContent: '/pdf_test/Machine_Learning.pdf', classeroom: 'L3', professor: 'Prof. I', lastModifiedAt: new Date('2024-02-22'), creatAt: new Date('2024-02-01'), createdBy: 'Prof. I' },
      { id: 10, title: 'Développement Web', pdfContent: '/pdf_test/Developpement_Web.pdf', classeroom: 'L2', professor: 'Prof. J', lastModifiedAt: new Date('2024-03-15'), creatAt: new Date('2024-03-01'), createdBy: 'Prof. J' }
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
      <div className="cours-page">
        <Sidebar onFilter={handleFilter} />
        <div className="main-content">
          <SearchBar onSearch={handleSearch} />
          <Row>
            {filteredCours.map(c => (
              <Col key={c.id} xs={12} md={2} lg={4}>
                <div className="card mb-3 " style={{ width: '20rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{c.title}</h5>
                    <p className="card-text">{c.professor}</p>
                    <p className="card-text">{new Date(c.creatAt).toLocaleDateString()}</p>
                    <a href={c.pdfContent} download  id='monbuttonDow' >Télécharger <FilePdfOutlined /></a>
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
