// frontend display of the survey
// By: Wesley Woo

import MenuBar from './MenuBar';
import './css/Student_TakeSurvey.css';
import React, { useState } from 'react';

// funciton for the new, better and improved bubble sliders
function MultipleChoiceSlider({ options, rowNames, numBubbles, onSelectionChange }) {
    // ddd an empty string to the beginning of the options array, to correctly space out the output
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




// function for the new, better and improved buttons
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
function DisplayQuestions({question = "Your Question Here", subtext = "subtext", questionNumber = 1, type = "bubble", onAnswerChange }) {
    // adding more options here will add more buttons
    const options = ["Excellent", "Good", "Average", "Poor", "Very Poor"]; // defines all the options for the bubbles 'names'
    const rowNames = ["Student 1", "Student 2", "Student 3", "Student 4"]; // defines all students in each group

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
                        <MultipleChoiceButtons options={options} name={`question-${questionNumber}`} onSelectionChange={onAnswerChange} />
                    )}
                </div>
                <div className='student-take-survey-text-field'>
                    {type === "text" && (
                        <TextInputField name={`question-${questionNumber}`} onTextChange={onAnswerChange} />
                    )}
                </div>
                <div className='student-take-survey-bubble-scale-field'>
                    {type === "bubble" && (
                    <div className="options-container">
                        <MultipleChoiceSlider options={options} rowNames={rowNames} numBubbles={3} onSelectionChange={onAnswerChange} />
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

    const handleAnswerChange = (question, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: answer,
        }));
    };

    const handleSubmit = () => {  // here all the answers are being logged to the console when you click submit
        console.log("Submitted Answers:");
        Object.keys(answers).forEach(key => {
            console.log(`${key}: ${answers[key]}`);
        });
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
                        {/* format: title, subtext, question number, type, */}
                        <DisplayQuestions questionNumber={1} onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="What is your favorite animal?" questionNumber={2} type="text" onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="What is your favorite class?" questionNumber={3} type="selection" onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="What is your favorite food?" questionNumber={4} type="bubble" onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="What is your favorite color?" questionNumber={5} type="text" onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="question content" questionNumber={6} type="selection" onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="question content" questionNumber={7} onAnswerChange={handleAnswerChange} />
                        <DisplayQuestions question="question content" questionNumber={8} onAnswerChange={handleAnswerChange} />
                        {/* submit button */}
                    <div>
                        <button className="student-take-survey-submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
