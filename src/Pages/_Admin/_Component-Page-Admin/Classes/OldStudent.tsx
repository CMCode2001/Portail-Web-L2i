import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { SERVER_URL } from "../../../../constantURL";

const { Search } = Input;

const OldStudent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchOldStudent = () => {
    fetch(SERVER_URL + "/curentListStudent/niveau/ancien")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        });
        setData(sortedData);
        setFilteredData(sortedData);
      })
      .catch((error) =>
        console.error("Error fetching data student level 1:", error)
      );
  };

  useEffect(() => {
    fetchOldStudent();
  }, []);

  const handleSearch = (value) => {
    const filtered = data.filter(
      (student) =>
        student.firstName.toLowerCase().includes(value.toLowerCase()) ||
        student.lastName.toLowerCase().includes(value.toLowerCase()) ||
        student.email.toLowerCase().includes(value.toLowerCase()) ||
        student.ine.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "INE",
      dataIndex: "ine",
      key: "ine",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Speciality",
      dataIndex: "specialityStudent",
      key: "specialityStudent",
    },
  ];

  return (
    <>
      <Search
        placeholder="Rechercher un ancien étudiant"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </>
  );
};

export default OldStudent;
