/* This is previous team code and our team did not touch this file logic*/
// import "../../../css/Admin_ManageFaculty.css";
import React, { useState, useEffect, useRef } from "react";
import ListManager from "../../ListManager/ListManager";
import { getDepartment, updateDepartmentFacultyMember } from "../../../services/service";
import FacultyListConfig from '../../ListManager/FacultyListConfig';
import MenuBar from "../../MenuBar";
import { View } from "@aws-amplify/ui-react";
import AddFaculty from '../../AddForms/AddFacultyForm';

export default function Admin_ManageFaculty() {
  //stores users under a selected department
  const [users, setUsers] = useState([]);

  // pop-up form states
  const dialogRef = useRef();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const flattenUser = (u) => {
    return ({
      ...u, 
      user: undefined, 
      ...u.user, 
      fullName: u.user.first_name + " " + u.user.last_name, 
      source: undefined, 
      invited_by: u.source.first_name + " " + u.source.last_name,
      id: u.id
    })
  }

  const editUser = async (newUser) => {
    const newFM = await updateDepartmentFacultyMember({
      id: newUser.id,
      user_type: newUser.user_type,
      status: newUser.status
    });
    setUsers(oldUsers => oldUsers.map(
      user => {
        if(user.id == newUser.id){
          return {
            ...user,
            ...newFM
          };
        }
        return user;
      }
    ));
  }

  useEffect(() => {
    //TODO: get the actual department of the current user.....
    getDepartment(1)
      .then(dept => {
        setUsers(dept.faculty)}
      );
  }, [])

  useEffect(() => {
    console.log("users", users);
  }, [users])

  // pop-up form event handlers
  const onOpen = () => {
    // current?. ensures that ref.current is not null before running showModal()
    setDialogOpen(true);
    dialogRef.current?.showModal();
  }

  const onClose = () => {
    setDialogOpen(false);
    dialogRef.current?.close();
  }

  const onSubmit = () => {
    // we want to close the dialog menu before running user form submission process
    onClose();

    // convert to user table fields
    const newUser = {user: {}, source: {}};
    newUser.user.first_name = formData.first_name;
    newUser.user.last_name = formData.last_name;

    //... TODO: pull user data
    newUser.source.first_name = "You"; 
    newUser.source.last_name = " ";
    newUser.email = formData.email;

    // TODO: are these the actual IDs?
    newUser.id = formData.cwid; 
    newUser.user_type = formData.role;
    newUser.status = true;
    newUser.created_at = new Date().toLocaleDateString();
    newUser.updated_at = new Date().toLocaleDateString();
    
    // add to users
    setUsers((pu) => [...pu, newUser]);
    // run any back-end calls
    setFormData({});
  };

  const onChange = (e, field) => {
    // get value
    let value = e.currentTarget.value; 
    if (e.target.type === "checkbox") { // checkboxes have different location for value
        value = e.target.checked;
    }

    setFormData((pfd) => {
        const newPfd = {...pfd};
        newPfd[field] = value;
        return newPfd;
    })
  }

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      <MenuBar/>
      <View style={{width: '100%'}}>
        <ListManager
          config={FacultyListConfig}
          data={users.map(flattenUser)}
          editItem={editUser}
          showAddComponent={onOpen}
        />
        <dialog ref={dialogRef}>
          {dialogOpen && 
            <AddFaculty
              formData={formData}
              onSubmit={onSubmit}
              onChange={onChange}
              onClose={onClose}
            />
          } 
        </dialog>
      </View>
      
    </View>
    
  )
}