import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../../Utils/constantURL";
import { Button, Image } from "antd";

const UploadPicture = () => {
  const [pictures, setPictures] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(SERVER_URL + "/picture")
      .then((response) => setPictures(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des images", error)
      );
  }, []);

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("jwt");

    if (window.confirm("Voulez-vous vraiment supprimer cette photo?")) {
      fetch(`${SERVER_URL}/picture/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setPictures((prevPictures) =>
              prevPictures.filter((picture) => picture.id !== id)
            );
          } else {
            console.error("Failed to delete picture");
          }
        })
        .catch((error) => console.error("Error deleting picture:", error));
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      const response = await axios.post(
        SERVER_URL + "/picture/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
      setPictures([...pictures, response.data]);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image: </label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>

      <br />
      <br />
      <br />

      <div className="pictures-grid">
        {pictures.slice(10).map((picture) => (
          <div key={picture.id} className="picture-card">
            <Image
              width={200}
              src={SERVER_URL + picture.url}
              alt={picture.description}
            />
            <p>{picture.description}</p>
            <Button
              className="delete-button"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => handleDelete(picture.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadPicture;
