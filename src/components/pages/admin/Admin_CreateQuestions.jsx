import React, { useState, useEffect, useRef } from "react";
import ListManager from "../../ListManager/ListManager";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../../../services/service";
import QuestionListConfig from '../../ListManager/QuestionListConfig';
import MenuBar from "../../MenuBar";
import { Accordion, View, Button } from "@aws-amplify/ui-react";
import PopupForm from "../../AddForms/PopupForm";
import { useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";

export default function Admin_ManageQuestions() {
  const currentUser = useSelector((state => state.auth.user));
  const [adminDepartment, setAdminDepartment] = useState(null);

  // stores questions by category
  const [questionsByCategory, setQuestionsByCategory] = useState({});

  // pop-up form states
  const popupRef = useRef(null);
  const categoryRef = useRef(null);
  const [formData, setFormData] = useState({});

  const editQuestion = async (question) => {
    if (adminDepartment) {
      const newQuestion = await updateQuestion(adminDepartment, question);

      // update table
      setQuestionsByCategory(pq => {
        const newQuestions = {...pq};
        let newCategory = newQuestions[newQuestion.category];
        newCategory = newCategory.map(q => q.id == newQuestion.id ? newQuestion : q);
        newQuestions[newQuestion.category] = newCategory;
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

      // if the category exists, add it, otherwise make a new array for the category
      newQuestions[formData.category] = !!newQuestions[formData.category] ? 
        [...newQuestions[formData.category], newQuestion] :
        [newQuestion];

      console.log(newQuestions);
      return newQuestions;
    });

    setFormData({}); // empty formData after call
  }

  const onOpen = (category) => {
    setFormData({category: category});
    popupRef.current.onOpen();
  }

  return (
    <View style={{display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
      <MenuBar/>
      <View style={{width: '100%', overflow: 'scroll', marginLeft: 10}}>
        <Accordion.Container allowMultiple>
          {Object.keys(questionsByCategory).sort().map(category => (
            <Accordion.Item key={category} value={category} style={{marginTop: 10}}>
              <Accordion.Trigger style={{backgroundColor: "#21314d", color: "white"}}>
                {category[0].toUpperCase() + category.slice(1)}
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

        <Button onClick={() => categoryRef.current.onOpen()} style={{width: "15%", display: "block", textAlign:"center", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>
          Add Category
        </Button>

        <PopupForm
          formData={formData}
          onChange={setFormData}
          onSubmit={onSubmit}
          formType="question"
          ref={popupRef}
        />
        <PopupForm
          formData={formData}
          onChange={setFormData}
          onSubmit={onSubmit}
          formType="category"
          ref={categoryRef}
        />
      </View>
    </View>
  )
}