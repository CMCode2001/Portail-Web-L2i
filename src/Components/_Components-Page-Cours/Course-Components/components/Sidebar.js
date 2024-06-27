import React, { useState } from 'react';
import "../../../../Styles/Cours.css";

const Sidebar = ({ onFilter }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleLevelChange = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    onFilter(level, selectedSubject, selectedSemester, selectedDate);
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
    onFilter(selectedLevel, subject, selectedSemester, selectedDate);
  };

  const handleSemesterChange = (event) => {
    const semester = event.target.value;
    setSelectedSemester(semester);
    onFilter(selectedLevel, selectedSubject, semester, selectedDate);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    onFilter(selectedLevel, selectedSubject, selectedSemester, date);
  };

  const handleResetFilters = () => {
    setSelectedLevel('');
    setSelectedSubject('');
    setSelectedSemester('');
    setSelectedDate('');
    onFilter('', '', '', '');
  };

  return (
    <div className="sidebar">
      <button className="reset-button" onClick={handleResetFilters}>Tous les cours</button>
      <div className="filter-group">
        <h3>Niveau</h3>
        <label>
          <input type="radio" value="L1" checked={selectedLevel === 'L1'} onChange={handleLevelChange} />
          Licence 1
        </label>
        <label>
          <input type="radio" value="L2" checked={selectedLevel === 'L2'} onChange={handleLevelChange} />
          Licence 2
        </label>
        <label>
          <input type="radio" value="L3" checked={selectedLevel === 'L3'} onChange={handleLevelChange} />
          Licence 3
        </label>
      </div>
      <div className="filter-group">
        <h3>Matière</h3>
        <label>
          <input type="radio" value="Algorithemique 1" checked={selectedSubject === 'Algorithemique 1'} onChange={handleSubjectChange} />
          Algorithemique
        </label>
        <label>
          <input type="radio" value="Programmation" checked={selectedSubject === 'Programmation'} onChange={handleSubjectChange} />
          Programmation
        </label>
        <label>
          <input type="radio" value="Reseau" checked={selectedSubject === 'Reseau'} onChange={handleSubjectChange} />
          Réseau
        </label>
        <label>
          <input type="radio" value="Math" checked={selectedSubject === 'Math'} onChange={handleSubjectChange} />
          Math
        </label>
      </div>
      <div className="filter-group">
        <h3>Semestre</h3>
        <label>
          <input type="radio" value="S1" checked={selectedSemester === 'S1'} onChange={handleSemesterChange} />
          Semestre 1
        </label>
        <label>
          <input type="radio" value="S2" checked={selectedSemester === 'S2'} onChange={handleSemesterChange} />
          Semestre 2
        </label>
      </div>
      <div className="filter-group">
        <h3>Date de publication</h3>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default Sidebar;
