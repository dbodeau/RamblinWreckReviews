/* This file is for the CSV file upload of students on the Professor_ManageStudents page. */

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import upload from '../assets/images/upload-mines.png';
import success from '../assets/images/checkmark-circle-green.png'; // Import success image
import '../css/DropZone.css'; // Import your CSS file
import { uploadData } from 'aws-amplify/storage';

function generateRandomFileName() { /* Must have unique name or AWS S3 will not upload(cant have duplicate named files)*/
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let fileName = '';

  for (let i = 0; i < 20; i++) {
    fileName += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return fileName;
}

const MyDropzone = () => {
  const [file, setFile] = useState(null);
  let myPath =  generateRandomFileName()+".csv"
  const handleFileUpload = async (fileContent) => {
    console.log("uploading file")
    const result = await uploadData({
      data: fileContent,
      path: myPath
    });
    console.log(21,result);
    }
  

const onDrop = (acceptedFiles) => {
    return new Promise((resolve, reject) => {
      //Check if file is a CSV
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


