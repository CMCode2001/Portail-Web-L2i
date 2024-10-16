import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input } from "antd";
import { useApi } from "../../../../Utils/Api";

const UserSite = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/student");

      if (response.status === 200) {
        const data = response.data;
        setData(data);
        setFilteredData(data); // Initialiser filteredData avec toutes les données
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error(
        "Error fetching student data:",
        error.response?.data || error.message
      );
    }
  }, [api]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce user?")) {
      try {
        const response = await api.delete(`/student/${id}`);

        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
          setFilteredData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        } else {
          console.error("Failed to delete item student");
        }
      } catch (error) {
        console.error(
          "Error deleting item:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleBlock = async (id, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/student/unblocked/${id}`
        : `/student/blocked/${id}`;
      const response = await api.post(endpoint);

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, blocked: !isBlocked } : item
          )
        );
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, blocked: !isBlocked } : item
          )
        );
      } else {
        console.error("Failed to block/unblock the student");
      }
    } catch (error) {
      console.error(
        "Error blocking/unblocking student:",
        error.response?.data || error.message
      );
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
            style={{ backgroundColor: "red", color: "white", marginRight: 8 }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          <Button
            style={{
              backgroundColor: record.blocked ? "yellow" : "green",
              color: "white",
            }}
            onClick={() => handleBlock(record.id, record.blocked)}
          >
            {record.blocked ? "Débloquer" : "Bloquer"}
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
