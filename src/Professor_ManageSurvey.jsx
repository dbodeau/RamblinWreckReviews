/* This is previous team code and our team did not touch this file. This page allows professors to create suverys */
import './css/Professor_ManageSurvey.css'
import SurveyQuestions from './SurveyQuestions'
// import FileUpload from './FileUpload';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import { Popup } from 'reactjs-popup';
import AWS_Authenticator from './AWS_Authenticator';
import AuthStatusEnum from './AuthStatusEnum';

function Professor_ManageSurvey() {
  //use state allows React to re-render when it detects a change in this variable
  const [formState, setFormState] = useState({ content: '', is_mandatory: false, question_type: '', question_category: '', department: '', new_category: '' });
  //question categories that are all from one department
  const [questionCategories, setCategories] = useState([]);
  //records the users currently selected category
  // const [currentCategory, setCurrentCategory] = useState('');
  //all the questions under a category
  const [questions, setQuestions] = useState([])
  //saves departmentID
  const [deptID, setDeptID] = useState();
  //handles success popup
  const [successPopup, setSucessPopup] = useState();
  //error popup
  const [errorPopup, setErrorPopup] = useState();

  // const [files] = useState();

  //load in all the data for the dropdowns using API loader call through React. This is set up to be linked in index.js
  var departments = useLoaderData();
  //const departments = params.departments; 
  //const questions = [{}];
  //is fired when the question content form is submitted
  const handleFormSubmit = async (event) => {
    event.preventDefault(); //prevent page from reloading

    //check if form had any invalid input
    if (formState.department === '' || formState.question_category === '' || formState.question_type === '' || formState.content === '') {
      //if invalid, show error popup
      setSucessPopup(false);
      setErrorPopup(true);
    }
    //otherwise error

    //pass ID of department and the body of the question to the post question API call
    // let body = {
    //   content: formState.content,
    //   is_mandatory: formState.is_mandatory,
    //   question_type: formState.question_type,
    //   question_category: formState.question_category
    // }
    //makes API call to post question
    // let response = await postQuestion(deptID, body)

    //TODO: NOT WORKING YET
    //update the questions array to reflect the new question being added to the page
    // let q = await getQuestionsByCategory(deptID, formState.question_category)
    // setQuestions(q);

    //show success popup otherwise
    setSucessPopup(true);
    setErrorPopup(false);
  };

  //Updates form state when radio button is selected
  // const handleRadioButtons = (event) => {
  //   event.preventDefault();
  //   setFormState({ ...formState, question_type: event.target.id })
  // };

  //tracks if a new category is being added in the form
  // const handleNewCategory = (event) => {
  //   event.preventDefault();
  //   //only update the new category if user makes change
  //   setFormState({ ...formState, question_category: event.target.value, new_category: event.target.value })

  // }

  //updates the category the user selects from the dropdown
  const updateCategory = async (event) => {
    event.preventDefault();

    //if the person choose '--Choose--', set to empty string for error handling
    if (event.target.value === '--Choose--') {
      setFormState({ ...formState, question_category: '', })
      return
    }

    //update form given the selection of the category
    setFormState({
      ...formState, question_category: event.target.value,
    })

    //set the current category selected
    // setCurrentCategory(event.target.value)

    //get the questions given the selection of the category
    let q = await getQuestionsByCategory(deptID, event.target.value);

    //set the questions for the page
    setQuestions(q)
  }

  //updates the department an user selects
  const updateDepartment = async (event) => {
    event.preventDefault();

    //if the person choose '--Choose--', set to empty string for error handling
    if (event.target.value === '--Choose--') {
      setFormState({ ...formState, department: '', });
      return;
    }

    //set the state for what department is chosen
    setFormState({ ...formState, department: event.target.value })
    //get department ID
    let deptID = await fetchDepartmentID(event.target.value);

    //save the department ID
    setDeptID(deptID)

    //fetch categories given department ID
    let categories = await fetchQuestionCategories(deptID);
    setCategories(categories);

    //const q = questions.filter((question)=> question.is_mandatory === true)
  }

  const filterQuestionsRequired = (questions) => {
    let q = questions.filter((question) => question.is_mandatory === true);
    if (questions) {
      return (<SurveyQuestions questions={q} deptID={deptID} setQuestions={setQuestions} />)
    }
  }

  const filterQuestionsChoice = (question) => {
    let q = questions.filter((question) => question.is_mandatory === false);
    if (questions) {
      return (<SurveyQuestions questions={q} deptID={deptID} setQuestions={setQuestions} />)
    }
  }

  // TODO: This whole file needs to be able to create a new survey and store it. It will also need to be able to update 
  // the survey and query the questions that already exist in the survey.

  return (
    <>
      {/* Draws the section that displays the 'Preview Questions by Category' Box */}
      <div className="professor-manage-survey-background-admin">
        <div className="professor-manage-survey-card-question-content">

          {/* Department dropdown, should later be removed when user authorization is added*/}
          <span className="professor-manage-survey-category-span">
            <h3 className="professor-manage-survey-form-subheaders">Survey Department:</h3>
            <select
              className="professor-manage-survey-preview-question-dropdown"
              onChange={updateDepartment}
            >
              <option key={0}>--Choose--</option>
              {departments?.map((dept) => (
                <option key={dept.id}>{dept.abbreviation}</option>
              ))}
            </select>

            {/* Dropdown menu for all the question categories for the department */}
            {/* TODO: Get list of class codes for professor to create survey */}
            <h3 className="professor-manage-survey-form-subheaders">Question Category:</h3>
            <select
              className="professor-manage-survey-preview-question-dropdown"
              // TODO: Need API call for class code from this line to end of select
              onChange={updateCategory}
            >
              <option key={0}>--Choose--</option>
              {questionCategories?.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </span>

          {/* Draws the section that allows the admin to enter the question content and add the question to a category */}
          <div>
            <h3 className="professor-manage-survey-add-question-title">
              Create Survey
            </h3>
            <div id="form" className="professor-manage-survey-add-question-form">
              <form onSubmit={handleFormSubmit}>
                <h3 className="professor-manage-survey-form-subheaders">Survey Title:</h3>
                {/* Field to type in question content */}
                <textarea
                  className="professor-manage-survey-survey-input"
                  placeholder="Title"
                  value={formState.content}
                  onChange={(e) =>
                    setFormState({ ...formState, content: e.target.value })
                  }
                ></textarea>
                <span className="professor-manage-survey-date-span">
                  <h3>Start:</h3>
                    <input className="professor-manage-survey-date-size" type="date" id="start" value="2023-11-03" min="2012-01-01" max="2025-01-01" />
                  <h3>End:</h3>
                    <input className="professor-manage-survey-date-size" type="date" id="start" value="2023-11-03" min="2012-01-01" max="2025-01-01" />
                </span>
                <h3 className="professor-manage-survey-form-subheaders">Required Questions:</h3>
                {/* List required questions below */}
                <div className='professor-manage-survey-required-question-card'>
                  {/* Calls filterQuestionsRequired to display the required questions */}
                  {filterQuestionsRequired(questions)}
                </div>
                {/* This needs to query the questions based on category */}
                <span>
                  <h3 className="professor-manage-survey-form-subheaders">Optional Questions:</h3>
                </span>

                {/* List questions by category for professor to add*/}
                <div className='professor-manage-survey-required-question-card'>
                  {/* TODO: query questions by category to list them here */}
                  {/* This should display squestions based on the category chosen */}
                  {filterQuestionsChoice(questions)}
                </div>
                <h3 className='professor-manage-survey-form-subheaders'>Class CSV</h3>
                <div className='professor-manage-survey-upload-csv'>
                  {/* {fileUpload(files)} */}
                </div>
                <div>
                  {/* TODO: Needs to query questions added to the survey to determine current length */}
                  <h3 className="professor-manage-survey-question-number-title">
                    Number of Questions in Survey: {questions?.length}
                  </h3>
                </div>

                {/* Button to create a survey from selected questions */}
                <button className="professor-manage-survey-form-button">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Success message */}
      <Popup open={successPopup} onClose={() => setSucessPopup(false)} position="right center">
        <div className='professor-manage-survey-content-box-success' >
          <p className='professor-manage-survey-content-text'>Success! Your question was added to the selected category. Refresh category to see it again</p>
          <button onClick={() => setSucessPopup(false)} className='professor-manage-survey-popup-button'>Close</button>
        </div>
      </Popup>
      {/* Error message */}
      <Popup open={errorPopup} onClose={() => setErrorPopup(false)} position="right center">
        <div className='professor-manage-survey-content-box-error' >
          <p className='professor-manage-survey-content-text'>Oops! Something went wrong. Please ensure that all sections of the form are filled out along with the
            department and category.</p>
          <button onClick={() => setErrorPopup(false)} className='professor-manage-survey-popup-button'>Close</button>
        </div>
      </Popup>
    </>
  );
}

export default AWS_Authenticator(Professor_ManageSurvey, AuthStatusEnum.SUPERUSER);