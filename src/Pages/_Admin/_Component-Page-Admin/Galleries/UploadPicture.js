import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../../../Utils/constantURL";
import { Button, Image, notification } from "antd";

const UploadPicture = () => {
  const [pictures, setPictures] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const openSuccessNotification = (message) => {
    notification.success({
      message: "Succès",
      description: message,
      placement: "top",
    });
  };

  const openErrorNotification = (message) => {
    notification.error({
      message: "Erreur",
      description: message,
      placement: "top",
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    fetch(SERVER_URL + "/picture", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des images");
        }
        return response.json();
      })
      .then((data) => setPictures(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des images", error)
      );
  }, []);

  // const handleDelete = (id) => {
  //   const token = sessionStorage.getItem("access_token");

  //   if (window.confirm("Voulez-vous vraiment supprimer cette photo?")) {
  //     fetch(`${SERVER_URL}/picture/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           setPictures((prevPictures) =>
  //             prevPictures.filter((picture) => picture.id !== id)
  //           );
  //         } else {
  //           console.error("Failed to delete picture");
  //         }
  //       })
  //       .catch((error) => console.error("Error deleting picture:", error));
  //   }
  // };

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("access_token");

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
            openSuccessNotification("Photo supprimée avec succès!");
          } else {
            openErrorNotification("Échec de la suppression de la photo.");
          }
        })
        .catch((error) => {
          openErrorNotification("Erreur lors de la suppression de la photo.");
          console.error("Erreur lors de la suppression de la photo:", error);
        });
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("description", description);

  //   const token = sessionStorage.getItem("access_token");

  //   try {
  //     const response = await fetch(SERVER_URL + "/picture/upload", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("There was an error uploading the file!");
  //     }

  //     const data = await response.json();
  //     alert(data);
  //     setPictures([...pictures, data]);
  //   } catch (error) {
  //     console.error("There was an error uploading the file!", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    const token = sessionStorage.getItem("access_token");

    try {
      const response = await fetch(SERVER_URL + "/picture/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement du fichier!");
      }

      // const data = await response.json();
      const data = await response.text(); // Si le backend renvoie une simple chaîne de caractères
      setPictures([...pictures, data]);

      openSuccessNotification("Fichier téléchargé avec succès!");
    } catch (error) {
      openErrorNotification("Erreur lors du téléchargement du fichier!");
      console.error("Erreur lors du téléchargement du fichier!", error);
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
          <div key={picture?.id} className="picture-card">
            <Image
              width={200}
              src={SERVER_URL + picture?.url}
              alt={picture?.description}
            />
            <p>{picture?.description}</p>
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
