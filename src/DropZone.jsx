import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import upload from './images/upload-mines.png';
import success from './images/checkmark-circle-green.png'; // Import success image
import './css/DropZone.css'; 

const MyDropzone = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async (fileContent) => {
    try {
        console.log(fileContent);
      const response = await fetch('https://rcs7kfkc00.execute-api.us-east-2.amazonaws.com/upload-csv-to-s3-stage', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set appropriate content type
          'X-API-KEY': 'ZmKJbn1sFC7Xd9N0YZM1p8bspfgWPI425pOsleiE',
          "Authorization": 'NONE' 
        },
        body: fileContent, // Send the file content as the body
      });
      console.log("Response:", response);
  
      // ... rest of your upload logic
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      console.log("File upload completed (success or error)");
    }
  };

const onDrop = (acceptedFiles) => {
    return new Promise((resolve, reject) => {
      // Check if file is a CSV
      const isCSV = acceptedFiles[0].type === 'text/csv';
      if (isCSV) {
        // handleFileUpload(acceptedFiles[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target.result; // Get file content as a string
          setFile(acceptedFiles[0]); // Update state with file information
          resolve(); // Resolve the promise
          handleFileUpload(fileContent); // Call upload function with content
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          reject(new Error('Error reading file'));
        };
        reader.readAsText(acceptedFiles[0]); // Read file as text (adjust for binary data)
      } else {
        alert('Only CSV files are permitted for download');
        reject(new Error('Invalid file type'));
      }
    });
  };
  

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'text/csv' });

  return (
    <div className='main-dropzone-frame' {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <div className="dropzone-content" style={{ backgroundColor: '#dff0df'}}>
          <img src={success} alt="Success" />
          <span>File Uploaded: {file.name}</span>
        </div>
      ) : (
        <div className="dropzone-content" style={{ backgroundColor: 'rgba(33, 49, 77, 0.2)'}}>
          <img src={upload} alt="Upload CSV" />
          <span>Drag and Drop CSV<br></br><b>OR</b><br></br>Select File</span>
        </div>
      )}
    </div>
  );
};

export default MyDropzone;


