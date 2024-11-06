import React, { useState, useEffect } from 'react';
import { createDepartment, getInactiveDepartments } from '../../../services/service';
import MenuBar from '../../MenuBar';
import { Loader, SelectField, TextField, View } from "@aws-amplify/ui-react";
import ContrastButton from '../../ContrastButton';
import { Popup } from 'reactjs-popup';
import { MdClose } from 'react-icons/md';

export default function AdminCreateDepartment() {
  const errors = {department: {hasError: false, errorMsg: ""}, email: {hasError: false, errorMsg: ""}, first: {hasError: false, errorMsg: ""}, last: {hasError: false, errorMsg: ""}};
  
  const [formData, setFormData] = useState({department: "", email: "", first: "", last: ""});
  const [formErrors, setFormErrors] = useState(errors);
  const [departments, setDepartments] = useState([]);

  // states for creation success/failure popup
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const validate = (formData, field="all") => {
    let hasError = false;
    const err = errors;
    // do our data validation
    if ((field === "all" || field === "department") && formData.department === "") {
        err.department.hasError = true;
        err.department.errorMsg = "Required field";
        hasError = true;
    }
    if (field === "all" || field === "email") {
      if (formData.email === ""){
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
    if (!validate(formData)) {
      // get data fields
      const deptId = departments.find((dept) => dept.abbr === formData.department.split('\t-\t')[0]).id;

      // compile data into one object
      const createData = {...formData, deptId: deptId};

      // call back-end 
      createDepartment(createData)
        .then((response) => {
          // can't use .then/.catch 
          if (response.statusCode >= 200 && response.statusCode < 300) { // success
            setSuccess(true);
            setFormData({department: "", email: "", first: "", last: ""});
            setDepartments((pd) => pd.filter(val => val.id != deptId)); // remove department from departments list
            setResponseMessage("Department has been sucessfully added");
          } else { // 3xx 4xx 5xx status codes
            setFailure(true); // display to user
            setResponseMessage(JSON.parse(response.body));
          }
        })
        .finally(() => (setIsWaiting(false)))
        // let user know response is loading
        setIsWaiting(true);
    }
  }

  const onChange = (e, field) => {
    const value = e.target.value;

    setFormData((pfd) => {
      const newFormData = {...pfd};
      newFormData[field] = value;
      validate(newFormData, field); // validate with new data (live validation)
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
        <form style={{width: "40%", minWidth: "400px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", border: '2px solid', borderColor: "#21314d", borderRadius: "5px", padding: '20px'}}>
          <SelectField 
            label="Department"
            placeholder='Ex. CSCI...'
            value={formData.department ?? ''}
            onChange={(e) => onChange(e, 'department')}
            hasError={formErrors.department.hasError}
            errorMessage={formErrors.department.errorMsg}
            options={departments.map(value => value.abbr + "\t-\t" + value.name)}
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
            <ContrastButton onClick={onSubmit}>{isWaiting ? <Loader /> : "Create"}</ContrastButton>
          </div>
        </form>
        {/*success popup*/}
        <Popup open={success} onClose={() => setSuccess(false)}>
            <div style={{width: 400, height: 100, backgroundColor: "#c5ffca", borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{width: "100%", height: "20%", display: 'flex', flexDirection: 'row-reverse', marginBottom: -10, marginTop: -10, alignItems: 'flex-end', borderRadius: 6}}>
                <button onClick={() => setSuccess(false)} style={{border: "none", backgroundColor: "#c5ffca"}}><MdClose/></button>
              </div>
              <p>{responseMessage}</p>
            </div>
          </Popup>
          {/*fail popup*/}
          <Popup open={failure} onClose={() => setFailure(false)}> 
            <div style={{width: 400, height: 100, backgroundColor: "#ff9494", borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{width: "100%", height: "20%", display: 'flex', flexDirection: 'row-reverse', marginBottom: -10, marginTop: -10, alignItems: 'flex-end', borderRadius: 6}}>
                <button onClick={() => setFailure(false)} style={{border: "none", backgroundColor: "#ff9494"}}><MdClose/></button>
              </div>
              <p>{responseMessage}</p>
            </div>
          </Popup>
      </View>
    </View>
  );
}