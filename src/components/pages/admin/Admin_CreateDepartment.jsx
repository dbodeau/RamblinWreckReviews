import React, { useState, useEffect } from 'react';
import { createDepartment, getInactiveDepartments } from '../../../services/service';
import { useSelector } from "react-redux";
import MenuBar from '../../MenuBar';
import { SelectField, Button, TextField, View } from "@aws-amplify/ui-react";
import '../../../css/Admin_Home.css';
import ContrastButton from '../../ContrastButton';

export default function AdminCreateDepartment() {
  const currentUser = useSelector((state => state.auth.user));
  
  const [formData, setFormData] = useState({department: "", email: ""});
  const [formErrors, setFormErrors] = useState({department: {hasError: false, errorMsg: ""}, email: {hasError: false, errorMsg: ""}});
  const [departments, setDepartments] = useState([]);

  const onSubmit = () => {
    // createDepartment()
  }

  const onChange = (e, field) => {

  }

  // onMount, grab departments
  useEffect(() => {
    getInactiveDepartments()
      .then((departments) => {
        console.log(departments);
      })
  }, [])

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      <MenuBar/>
      <View style={{width: '100%'}}>
        <form style={{width: "40%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", border: '2px solid', borderColor: "#21314d", borderRadius: "5px", padding: '20px'}}>
          <SelectField 
            label="Department"
            placeholder='Ex. CSCI...'
            value={formData.department ?? ''}
            onChange={(e) => onChange(e, 'department')}
            hasError={formErrors.department.hasError}
            errorMessage={formErrors.department.errorMsg}
          />
          <div style={{margin: "20px"}}/>
          <TextField
            label="Email"
            value={formData.email ?? ''}
            onChange={(e) => onChange(e, 'email')}
            hasError={formErrors.email.hasError}
            errorMessage={formErrors.email.errorMsg}
          />
          <div style={{display: "flex", flexDirection: "row-reverse", marginTop: "15px", }}> 
            <ContrastButton onClick={onSubmit}>Create</ContrastButton>
          </div>
          
        </form>
      </View>
    </View>
  );
}