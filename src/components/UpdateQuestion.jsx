/* This is previous team code and our team did not touch this file. Unknown purpose*/
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/UpdateQuestion.css";
import { updateQuestion } from "./api/admin.api";
import { Popup } from "reactjs-popup";
import AWS_Authenticator from './AWS_Authenticator';


//takes in the question that was clicked on as the params and department id
function UpdateQuestion() {
  //find data from the browser router
  const location = useLocation();
  const props = location.state;

  //unwrap question and department id
  const question = props[0];
  const deptID = props[1];

  //handles success popup
  const [successPopup, setSucessPopup] = useState();

  //handles changes that user makes to form
  const [formState, setFormState] = useState({
    content: question.content,
    is_mandatory: question.is_mandatory,
    question_type: question.question_type,
    question_category: question.question_category,
    departmentID: deptID,
  });

  //Event that is fired when the button to submit the question is clicked
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //body for API call
    let body = {
      content: formState.content,
      is_mandatory: formState.is_mandatory,
      question_type: formState.question_type,
      question_category: formState.question_category,
    };

    updateQuestion(deptID, question.id, body);
    //show success popup
    setSucessPopup(true);
  };

  return (
    <>
      {/* Draws the section that allows the admin to enter the question content and add the question to a category */}
      <div>
        <h3 className="update-question-add-question-title">Update Question Content</h3>
        <div id="form" className="update-question-add-question-form">
          <form onSubmit={handleFormSubmit}>
            <h3 className="update-question-form-subheaders">Edit Content:</h3>
            {/* Field to edit question content */}
            <textarea
              className="update-question-input"
              placeholder="Enter question content"
              value={formState.content}
              onChange={(e) =>
                setFormState({ ...formState, content: e.target.value })
              }
            ></textarea>
            <span className="update-question-preview-question-span">
              <h3 className="update-question-form-subheaders">Is Required:</h3>
              {/* Checkbox if question is required on not */}
              <input
                className="update-question-checkbox"
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

            <h3 className="update-question-form-subheaders">
              Question Type: {question.question_type}
            </h3>
            <h5 className="update-question-form-info-header">
              Note question type cannot be changed from when the question was created. If the type needs to be updated, 
              please make a new question.
            </h5>

            {/* Button to click when question is updated */}
            <button className="update-question-form-button">Update</button>
          </form>
        </div>
      </div>
       {/* Success message */}
       <Popup open={successPopup} onClose={() => setSucessPopup(false)} position="right center">
        <div className='update-question-content-box-success' >
            <p className='update-question-content-text'>Success! Your question was updated.</p>
            <button onClick={() => setSucessPopup(false)} className='update-question-popup-button'>Close</button>
          </div>
        </Popup>
    </>
  );
}

export default AWS_Authenticator(updateQuestion);
