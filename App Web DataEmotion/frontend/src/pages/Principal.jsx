import React, { useState } from 'react';
import axios from 'axios';


export function Principal() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('archivo', file);
      const res = await axios.post('http://localhost:8000/appweb/cargar_y_analizar_csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Subir Archivo</button>
    </div>
  );
}

