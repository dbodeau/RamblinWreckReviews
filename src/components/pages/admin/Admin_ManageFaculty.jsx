/* This is previous team code and our team did not touch this file logic*/
// import "../../../css/Admin_ManageFaculty.css";
import React, { useState, useEffect, useRef } from "react";
import ListManager from "../../ListManager/ListManager";
import { getDepartment, updateDepartmentFacultyMember, addDepartmentFacultyMember  } from "../../../services/service";
import FacultyListConfig from '../../ListManager/FacultyListConfig';
import MenuBar from "../../MenuBar";
import { View } from "@aws-amplify/ui-react";
import PopupForm from "../../AddForms/PopupForm";
import { useSelector } from "react-redux";

export default function Admin_ManageFaculty() {
  const currentUser = useSelector((state => state.auth.user));
  const [adminDepartment, setAdminDepartment] = useState(null);

  //stores users under a selected department
  const [users, setUsers] = useState([]);

  // pop-up form states
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({});
  // return stored faculty response from service
  const [rtnfacultyFormData, setRtnFacultyFormData] = React.useState({});

  const flattenUser = (u) => {
    return ({
      ...u, 
      user: undefined, 
      ...u.user, 
      fullName: u.user.first_name + " " + u.user.last_name, 
      source: undefined, 
      invited_by: u.source.first_name + " " + u.source.last_name,
      id: u.id,
    })
  }

  const editUser = async (newUser) => {
    if (adminDepartment) {
      const newFM = await updateDepartmentFacultyMember(adminDepartment, {
        id: newUser.user_id,
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
  }

  useEffect(() => {
    //TODO: get the actual department of the current user.....
    if(currentUser) {
      const adminDept = currentUser.roles.find(role => role.user_type == 'admin' && role.resource_type == 'dept' && role.status == true)?.resource_id;
      setAdminDepartment(adminDept)
      getDepartment(adminDept)
        .then(dept => {
          setUsers(dept.faculty)}
        );
    }
    else {
      setUsers([])
    }
  }, [currentUser])

  const onSubmit = async () => {
    // convert to user table fields
    console.log(formData);
    const newFM = await addDepartmentFacultyMember(adminDepartment, formData);
    setUsers(u => [...u, newFM]);
  //   addDepartmentFacultyMember(adminDepartment, {

  //   })

  //   const newUser = {user: {}, source: {}};
  //   newUser.user.first_name = formData.first_name;
  //   newUser.user.last_name = formData.last_name;

  //   //... TODO: pull user data
  //   newUser.source.first_name = "You"; 
  //   newUser.source.last_name = " ";
  //   newUser.email = formData.email;

  //   // TODO: are these the actual IDs?
  //   newUser.id = formData.cwid; 
  //   newUser.user_type = formData.role;
  //   newUser.status = true;
  //   newUser.created_at = new Date().toLocaleDateString();
  //   newUser.updated_at = new Date().toLocaleDateString();
    
  //   // add to users
  //   setUsers((pu) => [...pu, newUser]);
  //   setFormData({});

  //   // TODO: run any back-end calls
  //   addDepartmentFacultyMember(newUser.email, newUser.user.first_name, newUser.user.last_name, newUser.user_type, newUser.id ).then(res => {
  //       setRtnFacultyFormData(JSON.parse(res.body))
  //       //setRtnFacultyFormData(res.body)
  //       //console.log("ddd" +JSON.stringify(res,null,2))
  // })
};

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      <MenuBar/>
      <View style={{width: '100%', overflow: 'scroll'}}>
        <ListManager
          config={FacultyListConfig}
          data={users.map(flattenUser)}
          editItem={editUser}
          showAddComponent={() => popupRef.current.onOpen()}
        />
        <PopupForm
          formData={formData}
          onChange={setFormData}
          onSubmit={onSubmit}
          formType="faculty"
          ref={popupRef}
        />
      </View>
      
    </View>
    
  )
}