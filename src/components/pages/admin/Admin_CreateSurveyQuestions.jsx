/* This is previous team code and our team did not touch this file*/
// Group 7 here... We just made a different file to match the rest of our lists/managers updated with auth
import Questions from '../../Questions';
import React, {useState} from 'react';
import {useLoaderData} from 'react-router-dom';
import {Popup} from 'reactjs-popup';
import '../../../css/Admin_CreateSurveyQuestions.css';
import MenuBar from '../../MenuBar';

export default function Admin_CreateSurveyQuestions() {
    //use state allows React to re-render when it detects a change in this variable
    const [formState, setFormState] = useState( {content: '', is_mandatory: false, question_type: '', question_category: '', department: '', new_category: ''});
    //question categories that are all from one department
    const [questionCategories, setCategories] = useState([]);
    //records the users currently selected category
    const [currentCategory, setCurrentCategory] = useState('');
    //all the questions under a category
    const [questions, setQuestions] = useState([])
    //saves departmentID
    const [deptID, setDeptID] = useState();
    //handles success popup
    const [successPopup, setSucessPopup] = useState();
    //error popup
    const [errorPopup, setErrorPopup] = useState();


    //load in all the data for the dropdowns using API loader call through React. This is set up to be linked in index.js
    var departments = useLoaderData();

    //is fired when the question content form is submitted
    const handleFormSubmit = async (event) => {
      event.preventDefault(); //prevent page from reloading

      //check if form had any invalid input
      if (formState.department === '' || formState.question_category === '' || formState.question_type === '' || formState.content === '') {
        //if invalid, show error popup
        setSucessPopup(false);
        setErrorPopup(true);
        return console.log("Form error");
      }
      //otherwise error

      //pass ID of department and the body of the question to the post question API call
      let body = {
        content: formState.content,
        is_mandatory: formState.is_mandatory,
        question_type: formState.question_type,
        question_category: formState.question_category
      }
      //makes API call to post question
      let response = await postQuestion(deptID, body)
      console.log(response);

      //TODO: NOT WORKING YET
      //update the questions array to reflect the new question being added to the page
      // let q = await getQuestionsByCategory(deptID, formState.question_category)
      // setQuestions(q);

      //show success popup otherwise
      setSucessPopup(true);
      setErrorPopup(false);
    };

    //Updates form state when radio button is selected
    const handleRadioButtons = (event) => {
      event.preventDefault();
      setFormState({...formState, question_type: event.target.id})
    };

    //tracks if a new category is being added in the form
    const handleNewCategory = (event) => {
      event.preventDefault();
      //only update the new category if user makes change
      setFormState({ ...formState, question_category: event.target.value, new_category: event.target.value })
      
    }

    //updates the category the user selects from the dropdown
    const updateCategory = async (event) => {
      event.preventDefault();

      //if the person choose '--Choose--', set to empty string for error handling
      if(event.target.value === '--Choose--') {
        setFormState({...formState, question_category: '',})
        return
      }

      //update form given the selection of the category
      setFormState({...formState, question_category: event.target.value,
      })

      //set the current category selected
      setCurrentCategory(event.target.value)

      //get the questions given the selection of the category
      let q = await getQuestionsByCategory(deptID, event.target.value);

      //set the questions for the page
      setQuestions(q)
    }

    //updates the department an user selects
    const updateDepartment = async (event) => {
      event.preventDefault();

      //if the person choose '--Choose--', set to empty string for error handling
      if(event.target.value === '--Choose--') {
        setFormState({...formState, department: '',});
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
    }
  
    return (
      <>
        {/* create admin menu bar */}
        <div className='admin-create-survey-questions-content-container'>
          {<MenuBar />}
          {/* Draws the section that displays the 'Preview Questions by Category' Box */}
          <div className="admin-create-survey-questions-background-admin">
            <div className="admin-create-survey-questions-card-question-content">
              <span className="admin-create-survey-questions-preview-question-span">
                <h3 className="admin-create-survey-questions-preview-question-title">
                  Preview Questions by Category
                </h3>
              </span>

              {/* Department dropdown, should later be removed when user authorization is added*/}
              <span className="admin-create-survey-questions-category-span">
                <h3 className="admin-create-survey-questions-form-subheaders">Question Department:</h3>
                <select
                  className="admin-create-survey-questions-preview-question-dropdown"
                  onChange={updateDepartment}
                >
                  <option key={0}>--Choose--</option>
                  {departments?.map((dept) => (
                    <option key={dept.id}>{dept.abbreviation}</option>
                  ))}
                </select>

                {/* Dropdown menu for all the question categories for the department */}
                <h3 className="admin-create-survey-questions-form-subheaders">Question Category:</h3>
                <select
                  className="admin-create-survey-questions-preview-question-dropdown"
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
                <h3 className="admin-create-survey-questions-add-question-title">
                  Add Question To Selected Category
                </h3>
                <div id="form" className="admin-create-survey-questions-add-question-form">
                  <form onSubmit={handleFormSubmit}>
                    <h3 className="admin-create-survey-questions-form-subheaders">Question Content:</h3>
                    {/* Field to type in question content */}
                    <textarea
                      className="admin-create-survey-questions-question-input"
                      placeholder="Enter question content"
                      value={formState.content}
                      onChange={(e) =>
                        setFormState({ ...formState, content: e.target.value })
                      }
                    ></textarea>
                    <span className="admin-create-survey-questions-preview-question-span">
                      <h3 className="admin-create-survey-questions-form-subheaders">Is Required:</h3>
                      {/* Checkbox if question is required on not */}
                      <input
                        className="admin-create-survey-questions-checkbox"
                        type="checkbox"
                        defaultChecked={formState.is_mandatory}
                        onClick={(e) =>
                          setFormState({
                            ...formState,
                            is_mandatory: e.target.checked,
                          })
                        }
                      ></input>
                    </span>

                    <h3 className="admin-create-survey-questions-form-subheaders">Question Type:</h3>
                    {/* Pick if question is a text or bubble question*/}
                    <div className="admin-create-survey-questions-access-selection">
                      <input
                        onChange={handleRadioButtons}
                        name="type"
                        id="text"
                        type="radio"
                      ></input>
                      <label htmlFor="text">Text</label>
                      <input
                        onChange={handleRadioButtons}
                        name="type"
                        id="bubble"
                        type="radio"
                      ></input>
                      <label htmlFor="bubble">Bubble</label>
                    </div>

                    {/* Option for admin to add a new category*/}
                    <span>
                      <h3 className="admin-create-survey-questions-form-subheaders">
                        Add New Question Category (Optional):
                      </h3>
                      <input
                        className="admin-create-survey-questions-category-input"
                        placeholder="Leave blank if not adding new category"
                        value={formState.new_category}
                        onChange={handleNewCategory}
                      ></input>
                    </span>

                    {/* Button to add question to a category */}
                    <button className="admin-create-survey-questions-form-button">Add</button>
                  </form>
                </div>
              </div>
            </div>

            {/* Displays all the questions under a certain category */}
            <div className="admin-create-survey-questions-card-all-questions">
              <h3 className="admin-create-survey-questions-question-title">
                Questions by Category: {currentCategory}
              </h3>
              <h3 className="admin-create-survey-questions-question-number-title">
                Number of Questions: {questions?.length}
              </h3>
              <Questions questions={questions} deptID={deptID} setQuestions={setQuestions}/>
            </div>
          </div>
          {/* Success message */}
          <Popup open={successPopup} onClose={() => setSucessPopup(false)} position="right center">
          <div className='admin-create-survey-questions-content-box-success' >
              <p className='admin-create-survey-questions-content-text'>Success! Your question was added to the selected category. Refresh category to see it again</p>
              <button onClick={() => setSucessPopup(false)} className='admin-create-survey-questions-popup-button'>Close</button>
            </div>
          </Popup>
          {/* Error message */}
          <Popup open={errorPopup} onClose={() => setErrorPopup(false)} position="right center">
            <div className='admin-create-survey-questions-content-box-error' >
              <p className='admin-create-survey-questions-content-text'>Oops! Something went wrong. Please ensure that all sections of the form are filled out along with the 
              department and category.</p>
              <button onClick={() => setErrorPopup(false)} className='admin-create-survey-questions-popup-button'>Close</button>
            </div>
          </Popup>
        </div>
      </>
    );
  }