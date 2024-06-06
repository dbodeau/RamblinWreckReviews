// frontend display of the survey
// By: Wesley Woo

import MenuBar from './MenuBar';
import './css/Student_TakeSurvey.css';
import React, { useState } from 'react';

// funciton for the new, better and improved bubble sliders
function MultipleChoiceSlider({ options, rowNames, numBubbles, onSelectionChange }) {
    // add an empty string to the beginning of the options array, to correctly space out the output
    const modifiedOptions = ["", ...options];
    const [selectedOptions, setSelectedOptions] = useState(
        rowNames.reduce((acc, rowName) => {
            acc[rowName] = null;
            return acc;
        }, {})
    );

    const handleOptionChange = (rowName, option) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [rowName]: option,
        }));
        onSelectionChange(rowName, option);
    };

    const bubbles = Array.from({ length: numBubbles }, (_, i) => i + 1);

    return (
        <div className="student-take-survey-slider-table">
            <div className="student-take-survey-slider-header">
                {modifiedOptions.map((option, index) => (
                    <div key={index} className="student-take-survey-slider-header-option">
                        {option}
                    </div>
                ))}
            </div>
            {rowNames.map((rowName, rowIndex) => (
                <div key={rowIndex} className="student-take-survey-slider-row">
                    <div className="student-take-survey-slider-row-name">
                        {rowName}
                    </div>
                    {options.map((option, optionIndex) => (
                        <div key={optionIndex} className="student-take-survey-slider-row-option">
                            {bubbles.map((value) => (
                                <button
                                    key={value}
                                    className={`student-take-survey-slider-button ${selectedOptions[rowName] === `${option}-${value}` ? 'selected' : ''}`}
                                    onClick={() => handleOptionChange(rowName, `${option}-${value}`)}
                                >
                                    {/* Blank bubble */}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// function for the new, better and improved grid of buttons
function MultipleChoiceButtons({ options, name, onSelectionChange }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        onSelectionChange(name, option);
    };

    return (
        <div>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`student-take-survey-button ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => handleOptionChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

// function to create a TextInputField component to handle text input
function TextInputField({ name, onTextChange }) {
    const [text, setText] = React.useState("");

    const handleChange = (event) => {
        setText(event.target.value);
        onTextChange(name, event.target.value);
    };

    return (
        <div className="student-take-survey-text-input-field">
            <textarea
                name={name}
                value={text}
                onChange={handleChange}
                placeholder="Type your answer here..."
                rows={6} // specify the number of rows
                cols={100} // specify the number of columns
            />
        </div>
    );
}

// function to display each question
function DisplayQuestions({question = "Your Question Here", subtext = "subtext", questionNumber = 1, type = "bubble", options = ["Excellent", "Good", "Average", "Poor", "Very Poor"], rowNames = ["Student 1", "Student 2", "Student 3", "Student 4"], numBubbles = 3}) {
    const handleAnswerChange = (question, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: answer,
        }));
    };

    return (
        <div className="student-take-survey-question-wrapper">
            {/* title */}
            <div>
                <div className="student-take-survey-title-wrapper">
                    {questionNumber + ". " + question}
                    <div className='student-take-survey-orange-bar-question'></div>
                </div>
                {/* subtext */}
                <div className="student-take-survey-subtext-wrapper">
                    {subtext}
                </div>
            </div>
            {/* content of the question; where students put their answer */}
            <div className="student-take-survey-question-field">
                {/* if statement to determine type passed in */}
                <div className='student-take-survey-bubble-field'>
                    {type === "selection" && (
                        <MultipleChoiceButtons options={options} name={`question-${questionNumber}`} onSelectionChange={handleAnswerChange} />
                    )}
                </div>
                <div className='student-take-survey-text-field'>
                    {type === "text" && (
                        <TextInputField name={`question-${questionNumber}`} onTextChange={handleAnswerChange} />
                    )}
                </div>
                <div className='student-take-survey-bubble-scale-field'>
                    {type === "bubble" && (
                    <div className="options-container">
                        <MultipleChoiceSlider options={options} rowNames={rowNames} numBubbles={numBubbles} onSelectionChange={handleAnswerChange} />
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Student_TakeSurveys() {
    // bits of code to handle getting the answers for the surveys
    const [answers, setAnswers] = useState({});

    const handleSubmit = () => {  // here all the answers are being logged to the console when you click submit
        // write answers to database here

        console.log("Submitted Answers:"); // TODO: pass a unique identifier to each MC grid, as the answers are currently coliding
        Object.keys(answers).forEach(key => {
            console.log(`${key}: ${answers[key]}`);
        });
        // redirects to the student home page
        // popup window can be added later
        <button onClick={window.location.href = '/student'}>Close</button>
    };

    return (
        // body of the webpage
        <div className='student-take-survey-entire-page'>
            <MenuBar />
            <div className="student-take-survey-horizontal-container">
                <div className='student-take-survey-vertical-container'>
                    {/* for the survey title */}
                    <div className='student-take-survey-title'>
                        <h1>Your survey title goes here</h1>
                        <div className='student-take-survey-orange-bar'></div>
                    </div>
                        {/* add your questions here */}
                        {/* Format: title, subtext, question number, type, options (for MC questions, what do you want to name the MC options), rowNames (for MC grid layout, put student names here), numBubbles (for MC grid, put [ex: 1-3])*/}
                        <DisplayQuestions questionNumber={1} />
                        <DisplayQuestions question="What is your favorite animal?" questionNumber={2} type="text" />
                        <DisplayQuestions question="What is your favorite class?" questionNumber={3} type="selection" />
                        <DisplayQuestions question="What is your favorite food?" questionNumber={4} type="bubble" />
                        <DisplayQuestions question="What is your favorite color?" questionNumber={5} type="text" />
                        <DisplayQuestions question="question content" questionNumber={6} type="selection" />
                        <DisplayQuestions question="question content" questionNumber={7} />
                        <DisplayQuestions question="question content" questionNumber={8} />
                        {/* submit button */}
                    <div>
                        <button className="student-take-survey-submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
