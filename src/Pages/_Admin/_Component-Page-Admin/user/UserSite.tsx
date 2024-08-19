import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import { SERVER_URL } from "../../../../Utils/constantURL";

const UserSite = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUser = () => {
    fetch(SERVER_URL + "/student")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filteredData with all data
      })
      .catch((error) =>
        console.error("Error fetching data student level 1:", error)
      );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("jwt");

    if (window.confirm("Voulez-vous vraiment supprimer ce user?")) {
      fetch(SERVER_URL + `/student/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            setFilteredData((prevData) =>
              prevData.filter((item) => item.id !== id)
            );
          } else {
            console.error("Failed to delete item student");
          }
        })
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(value) ||
        item.lastName.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search by first name, last name, or email"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </>
  );
};

export default UserSite;
