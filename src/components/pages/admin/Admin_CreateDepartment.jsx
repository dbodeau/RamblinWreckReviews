import React, { useState, useEffect } from 'react';
import { createDepartment, getInactiveDepartments } from '../../../services/service';
import MenuBar from '../../MenuBar';
import { SelectField, TextField, View } from "@aws-amplify/ui-react";
import ContrastButton from '../../ContrastButton';

export default function AdminCreateDepartment() {
  const errors = {department: {hasError: false, errorMsg: ""}, email: {hasError: false, errorMsg: ""}, first: {hasError: false, errorMsg: ""}, last: {hasError: false, errorMsg: ""}};
  
  const [formData, setFormData] = useState({department: "", email: "", first: "", last: ""});
  const [formErrors, setFormErrors] = useState(errors);
  const [departments, setDepartments] = useState([]);

  const validate = (formData, field="all") => {
    let hasError = false;
    const err = errors;
    // do our data validation
    if ((field === "all" || field === "department") && formData.department === "") {
        err.department.hasError = true;
        err.department.errorMsg = "Required field";
        hasError = true;
    }
    if ((field === "all" || field === "email") && formData.email === "") {
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
    if ((field === "all" || field === "first") && formData.first === "") {
      err.first.hasError = true;
      err.first.errorMsg = "Required field";
      hasError = true;
    } 
    if ((field === "all" || field === "last") && formData.last === "") {
      err.last.hasError = true;
      err.last.errorMsg = "Required field";
      hasError = true;
    }

    // update error state
    setFormErrors(err);
    return hasError;
  }

  const onSubmit = () => {
    // createDepartment()
    if (!validate(formData)) {
      // createDepartment();
      setFormData({department: "", email: "", first: "", last: ""});
    }
  }

  const onChange = (e, field) => {
    const value = e.target.value;

    setFormData((pfd) => {
      const newFormData = {...pfd};
      newFormData[field] = value;
      validate(newFormData, field);
      return newFormData;
    })
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
          <div style={{margin: "20px"}}/>
          <TextField
            label="First Name"
            value={formData.first ?? ''}
            onChange={(e) => onChange(e, 'first')}
            hasError={formErrors.first.hasError}
            errorMessage={formErrors.first.errorMsg}
          />
          <div style={{margin: "20px"}}/>
          <TextField
            label="Last Name"
            value={formData.last ?? ''}
            onChange={(e) => onChange(e, 'last')}
            hasError={formErrors.last.hasError}
            errorMessage={formErrors.last.errorMsg}
          />
          <div style={{display: "flex", flexDirection: "row-reverse", marginTop: "15px", }}> 
            <ContrastButton onClick={onSubmit}>Create</ContrastButton>
          </div>
          
        </form>
      </View>
    </View>
  );
}