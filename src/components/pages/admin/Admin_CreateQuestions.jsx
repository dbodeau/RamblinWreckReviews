/* This is previous team code and our team did not touch this file logic*/
// import "../../../css/Admin_ManageFaculty.css";
import React, { useState, useEffect, useRef } from "react";
import ListManager from "../../ListManager/ListManager";
import { getDepartment } from "../../../services/service";
import QuestionListConfig from '../../ListManager/QuestionListConfig';
import MenuBar from "../../MenuBar";
import { View } from "@aws-amplify/ui-react";
import PopupForm from "../../AddForms/PopupForm";
import { useSelector } from "react-redux";

export default function Admin_ManageQuestions() {
  const currentUser = useSelector((state => state.auth.user));
  const [adminDepartment, setAdminDepartment] = useState(null);

  //stores users under a selected department
  const [questions, setQuestions] = useState([]);


  const [addingToCategory, setAddingToCategory] = useState(""); // or int

  // pop-up form states
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({});

  const editQuestion = () => {
    console.log("EDIT");
  }

  const flattenQuestion = (question) => {
    console.log("Flatten: ", question);
  }


  useEffect(() => {
    //TODO: get the actual department of the current user.....
    if(currentUser) {
      const adminDept = currentUser.roles.find(role => role.user_type == 'admin' && role.resource_type == 'dept' && role.status == true)?.resource_id;
      setAdminDepartment(adminDept)
      getDepartment(adminDept)
        .then(dept => {
          setQuestions(dept.faculty)}
        );
    }
    else {
      setQuestions([])
    }
  }, [currentUser])

  const onSubmit = async () => {
    // convert to question table fields
    console.log(formData);
};

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      <MenuBar/>
      <View style={{width: '100%', overflow: 'scroll'}}>
        <ListManager
          config={QuestionListConfig}
          data={questions.map(flattenQuestion)}
          editItem={editQuestion}
          showAddComponent={() => popupRef.current.onOpen()}
        />
        <PopupForm
          formData={formData}
          onChange={setFormData}
          onSubmit={onSubmit}
          formType="question"
          ref={popupRef}
        />
      </View>
      
    </View>
    
  )
}