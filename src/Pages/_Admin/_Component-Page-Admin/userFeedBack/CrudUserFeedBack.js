import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input } from "antd";
import { useApi } from "../../../../Utils/Api";

const CrudUserFeedBack = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //   const fetchUserFeedback = useCallback(async () => {
  //     try {
  //       const response = await api.get("/userFeedBack");

  //       if (response.status === 200) {
  //         const feedbackData = response.data;
  //         setData(feedbackData);
  //         setFilteredData(feedbackData); // Initialiser avec toutes les données
  //       } else {
  //         console.error("Failed to fetch user feedback data");
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error fetching user feedback data:",
  //         error.response?.data || error.message
  //       );
  //     }
  //   }, [api]);

  const fetchUserFeedback = useCallback(async () => {
    try {
      const response = await api.get("/userFeedBack");

      if (response.status === 200) {
        const feedbackData = response.data;
        // Trier les feedbacks par date de création décroissante
        feedbackData.sort((a, b) => new Date(b.creatAt) - new Date(a.creatAt));
        setData(feedbackData);
        setFilteredData(feedbackData);
      } else {
        console.error("Failed to fetch user feedback data");
      }
    } catch (error) {
      console.error(
        "Error fetching user feedback data:",
        error.response?.data || error.message
      );
    }
  }, [api]);

  useEffect(() => {
    fetchUserFeedback();
  }, [fetchUserFeedback]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce feedback ?")) {
      try {
        const response = await api.delete(`/userFeedBack/${id}`);

        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
          setFilteredData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        } else {
          console.error("Failed to delete feedback");
        }
      } catch (error) {
        console.error(
          "Error deleting feedback:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.comment.toLowerCase().includes(value) ||
        item.createdBy.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Commentaire",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Note",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Créé par",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Date de création",
      dataIndex: "creatAt",
      key: "creatAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={() => handleDelete(record.id)}
        >
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Rechercher par commentaire ou auteur"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </>
  );
};

export default CrudUserFeedBack;
