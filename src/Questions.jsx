/* This is previous team code and our team did not touch this file.*/

import "./css/Questions.css";
import { Link } from "react-router-dom";

//setQuestions updates the state of the parent
export default function Questions({ questions, deptID, setQuestions }) {
  return (
    <>
      {/* Container for all the questions in a category */}
      <div className="question-container" key="0">
        {questions?.map((question, index) => (
          //container for each question
          <div className="question-card" key={question.id}>
            <h3>Question {index + 1}</h3>
            <h4 className="question-subtitle">
              Question type: {question.question_type}
            </h4>
            <p>Content: {question.content}</p>
            <p>Mandatory by Department: {checkIsRequired(question.is_mandatory)}</p>
            {/* Button to delete/update each question */}
            <span className="question-button-span">
              <button
                onClick={() => deleteQuestionButton(question.id)}
                className="question-delete-button"
              >
                Delete
              </button>
              <Link
                to="/update-question"
                state={[question, deptID]}
              >
                <button
                  className="question-update-button"
                >
                  Update
                </button>
              </Link>
            </span>
          </div>
        ))}
      </div>
    </>
  );

  // deletes a question given its ID
  function deleteQuestionButton(questionID) {
    //delete from backend
    deleteQuestion(deptID, questionID);

    //delete from frontend
    let q = questions.filter((question) => question.id !== questionID);

    //calls the parent state function to update the list of questions
    setQuestions(q);
  }

  //returns the display text for if a question is mandatory or not
  function checkIsRequired(isMandatory) {
    //if a question is mandatory, return "Yes"
    if(isMandatory === true) {
      return "Yes"
    //otherwise, "No"
    } else {
      return "No"
    }
  }
}
