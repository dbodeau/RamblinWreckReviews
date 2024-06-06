// displays feedback for every student
// By: Wesley Woo

import './css/Student_ViewFeedback.css';
import MenuBar from './MenuBar';

// function to display feedback
function displayFeedback(title = "Feedback Title", subtext="subtext", text="Here is what your peers said about you!") {
    return (
        <div className="student-view-feedback-question-wrapper">
            {/* title */}
            <div className="student-view-feedback-feedback-title">
                {title}
                <div className="student-view-feedback-orange-bar-feedback"></div>
            </div>
            {/* subtext */}
            <div className="student-view-feedback-subtext-wrapper">
                {subtext}
            </div>
            <div className="student-view-feedback-content-wrapper">
                {text}
            </div>
        </div>
    );
}

export default function Student_ViewFeedback() {
    return(
        <div className="student-view-feedback-horizontal-container">
            <MenuBar />
            <div className="student-view-feedback-vertical-container">
                {/* title for the survey */}
                <div className="student-view-feedback-survey-title">
                    <h1>Peer Eval 1</h1>
                    <div className="student-view-feedback-orange-bar"></div>
                </div>
                {/* call the displayFeedback function */}
                {/* Format: title, subtext, feedback */}
                {displayFeedback("This title can hold informaiton about individuals", "Some subtext", "This is your feedback. Your teammates can talk about you here.")}
                {displayFeedback("Your Feedback for <Title>", "Some subtext", "This is your feedback")}
                {displayFeedback("Your Feedback for <Title>", "Some subtext", "This is your feedback")}
                {displayFeedback("Your Feedback for <Title>", "Some subtext", "This is your feedback")}
            </div>
        </div>
    );
}