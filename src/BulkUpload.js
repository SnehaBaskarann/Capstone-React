import React, { useState } from 'react';

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFiles([...event.dataTransfer.files]);
  };

  const handleUpload = () => {
    // Implement the upload logic here
    console.log(selectedFiles);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #007bff',
          padding: '30px',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <p>Drag and drop files here</p>
        <p>or</p>
        <button
          onClick={() => document.getElementById('fileInput').click()}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Upload a File
        </button>
      </label>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <button onClick={handleUpload}>Start Upload</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
