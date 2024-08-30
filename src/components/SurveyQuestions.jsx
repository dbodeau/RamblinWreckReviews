/* This is previous team code and our team did not touch this file. Unknown purpose*/

import "../css/SurveyQuestion.css";
import AWS_Authenticator from './AWS_Authenticator';


//setQuestions updates the state of the parent
function SurveyQuestions({ questions, deptID, setQuestions }) {
  return (
    <>
      {/* Container for all the questions in a category */}
      <div className="survey-question-container" key="0">
        {questions?.map((question, index) => (
          //container for each question
          <div className="survey-question-card" key={question.id}>
            <h3>Question {index + 1}</h3>
            <h4 className="survey-question-subtitle">
              Question type: {question.question_type}
            </h4>
            <p>Content: {question.content}</p>
            {/* Button to add each question to survey */}
            <span className="survey-question-button-span-add">
              {!question.is_mandatory &&
              <button
                // onClick={() => addQuestionButton(question.id)}
                className="survey-question-delete-button"
              >
                Add
              </button>}
            </span>
          </div>
        ))}
      </div>
    </>
  );

    // deletes a question given its ID
    // function addQuestionButton(questionID) {
    //   //delete from backend
    //   // addQuestion(deptID, questionID);
  
    //   //delete from frontend
    //   let q = questions.filter((question) => question.id !== questionID);
  
    //   //calls the parent state function to update the list of questions
    //   setQuestions(q);
    // }
}

export default AWS_Authenticator(SurveyQuestions);
