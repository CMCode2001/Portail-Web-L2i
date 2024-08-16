import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../../constantURL";

const UploadPicture = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

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
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image: </label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadPicture;
