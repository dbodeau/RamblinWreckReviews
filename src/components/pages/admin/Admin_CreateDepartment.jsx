import React, { useState, useEffect } from 'react';
import { createDepartment, getInactiveDepartments } from '../../../services/service';
import MenuBar from '../../MenuBar';
import { SelectField, TextField, View } from "@aws-amplify/ui-react";
import ContrastButton from '../../ContrastButton';

export default function AdminCreateDepartment() {
  
  const [formData, setFormData] = useState({department: "", email: ""});
  const [formErrors, setFormErrors] = useState({department: {hasError: false, errorMsg: ""}, email: {hasError: false, errorMsg: ""}});
  const [departments, setDepartments] = useState([]);

  const validate = () => {
    console.log(formData);
    let hasError = false;
    const err = formErrors;
    // do our data validation
    if (!formData.hasOwnProperty("department") || formData.department === "") {
        err.department.hasError = true;
        err.department.errorMsg = "Required field";
        hasError = true;
    } 
    if (!formData.hasOwnProperty("email") || formData.email === "") {
      err.email.hasError = true;
      err.email.errorMsg = "Required field";
      hasError = true;
    } else { // do additional validation
        const pattern = new RegExp('^[a-zA-Z0-9_!#$%&\'*+/=?`{|}~^.-]+@mines.edu$'); // stop sql injection...

        if (!pattern.test(formData.email)) {
            err.email.hasError = true;
            err.email.errorMsg = "Invalid email";
            hasError = true;
        } 
    }

    // update error state
    setFormErrors(err);

    return hasError;
  }

  const onSubmit = () => {
    // createDepartment()
    if (!validate()) {
      // createDepartment();
    }
  }

  const onChange = (e, field) => {
    const value = e.target.value;

    setFormData((pfd) => {
      const newFormData = {...pfd};
      newFormData[field] = value;
      return newFormData;
    })
    validate();
  }

  // onMount, grab departments
  useEffect(() => {
    getInactiveDepartments()
      .then((departments) => {
        setDepartments(departments);
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
            options={departments.map(value => value.abbr + " - " + value.name)}
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