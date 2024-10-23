import React, { useState, useEffect, useRef } from "react";
import ListManager from "../../ListManager/ListManager";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../../../services/service";
import QuestionListConfig from '../../ListManager/QuestionListConfig';
import MenuBar from "../../MenuBar";
import { Accordion, View } from "@aws-amplify/ui-react";
import PopupForm from "../../AddForms/PopupForm";
import { useSelector } from "react-redux";

export default function Admin_ManageQuestions() {
  const currentUser = useSelector((state => state.auth.user));
  const [adminDepartment, setAdminDepartment] = useState(null);

  // stores questions by category
  const [questionsByCategory, setQuestionsByCategory] = useState({});

  // so we don't need multiple add forms
  const [addingToCategory, setAddingToCategory] = useState("");

  // pop-up form states
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({});

  const editQuestion = async (question) => {
    if (adminDepartment) {
      const newQuestion = await updateQuestion(adminDepartment, question);

      // update table
      setQuestionsByCategory(pq => {
        const newQuestions = {...pq};
        newQuestions[addingToCategory] = [...newQuestions[addingToCategory], newQuestion];
        return newQuestions;
      });
    }
  }

  useEffect(() => {
    // ensure we have user data before trying to get department info
    if(currentUser) {
      const adminDept = currentUser.roles.find(role => role.user_type == 'admin' && role.resource_type == 'dept' && role.status == true)?.resource_id;
      // update department state
      setAdminDepartment(adminDept);
      // pull department questions
      getQuestions(adminDept)
        .then(questions => {
          // split up questions by their category
          const byCategory = questions.reduce((acc, question) => {
            // if the category exists, add the question to that array, otherwise create a new array with it
            !!acc[question.category] ? acc[question.category].push(question) : acc[question.category] = [question];
            return acc;
          }, {});
          // update state
          setQuestionsByCategory(byCategory);
        });
    }
    else {
      setQuestionsByCategory({});
    }
  }, [currentUser])

  const onSubmit = async () => {
    // convert to question table fields
    console.log(formData);
    const newQuestion = await createQuestion(adminDepartment, formData);

    // add to table
    setQuestionsByCategory(pq => {
      const newQuestions = {...pq};
      newQuestions[addingToCategory] = [...newQuestions[addingToCategory], newQuestion];
      return newQuestions;
    });

    setFormData({}); // empty formData after call
}

const onOpen = (category) => {
  setAddingToCategory(category);
  popupRef.current.onOpen();
}

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      <MenuBar/>
      <View style={{width: '100%', overflow: 'scroll', marginLeft: 10}}>
        <Accordion.Container allowMultiple>
          {Object.keys(questionsByCategory).map(category => (
            <Accordion.Item key={category} value={category} style={{marginTop: 10}}>
              <Accordion.Trigger style={{backgroundColor: "#21314d", color: "white"}}>
                {category}
                <Accordion.Icon style={{color: "white"}}/>
              </Accordion.Trigger>
              <Accordion.Content>
                <ListManager
                  config={QuestionListConfig}
                  data={questionsByCategory[category]}
                  editItem={editQuestion}
                  showAddComponent={() => onOpen(category)}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Container>
        
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