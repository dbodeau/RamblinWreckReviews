import React, {} from 'react';
import "../css/Question.css";

// took most of this from Wesley Woo in Student_TakeSurvey.jsx
function BubbleQuestion({mcConfig, rowNames, isRequired, bubbleData, setBubbleData}) {
    const handleClick = (rowName, category, value) => {
        setBubbleData((pbd) => {
            const newbd = {...pbd};
            newbd[rowName] = `${category}-${value}`;
            return newbd;
        });
    }

    const bubbles = Array.from({ length: mcConfig.numBubbles }, (_, i) => i + 1);

    return (
        <div className="student-take-survey-slider-table">
            <div className="student-take-survey-slider-header">
                {/* empty div to space above names (lines up bubbles and categories) */}
                <div className="student-take-survey-slider-header-option" />
                {mcConfig.categories.map((category, index) => (
                    <div key={index} className="student-take-survey-slider-header-option">
                        {category}
                    </div>
                ))}
            </div>
            {rowNames.map((rowName, rowIndex) => (
                <div key={rowIndex} className="student-take-survey-slider-row">
                    <div className="student-take-survey-slider-row-name">
                        {rowName}
                    </div>
                    {mcConfig.categories.map((category, categoryIndex) => {
                        {return category.length > 0 ? // may be empty categories (don't want to display these)
                        <div key={categoryIndex} className="student-take-survey-slider-row-option">
                            {bubbles.map((value) => (
                                <button
                                    key={value}
                                    className={`student-take-survey-slider-button ${bubbleData[rowName] === `${category}-${value}` ? 'selected' : ''}`}
                                    onClick={() => handleClick(rowName, category, value)}
                                />
                            ))}
                        </div>
                        : null }})}
                </div>
            ))}
        </div>
    )
}

// Purely for viewing a preview when editing question weights
function PreviewBubbleQuestion({mcConfig, weightData, setWeightData}) {
    const [selectedBubble, setSelectedBubble] = React.useState("");
    const bubbles = Array.from({ length: mcConfig.numBubbles }, (_, i) => i + 1);

    const handleWeightChange = (categoryIndex, index, event) => {
        const value = parseInt(event.target.value ? event.target.value : 0); 

        setWeightData((pwd) => {
            const nwd = [...pwd.weights];
            nwd[categoryIndex][index-1] = value;
            return {...pwd, weights: nwd};
        })
    }

    return (
        <div className="student-take-survey-slider-table">
            <div className="student-take-survey-slider-header">
                {/* empty div to space above names (lines up bubbles and categories) */}
                <div className="student-take-survey-slider-header-option" />
                {mcConfig.categories.map((category, index) => {
                    {return category.length > 0 && // make sure it lines up properly on the preview
                    <div key={index} className="student-take-survey-slider-header-option">
                        {category}
                    </div>
                    }
            })}
            </div>

            <div className="student-take-survey-slider-row">
                <div className="student-take-survey-slider-row-name">
                   Example
                </div>
                {mcConfig.categories.map((category, categoryIndex) => {
                    {return category.length > 0 ? // may be empty categories (don't want to display these)
                    <div key={categoryIndex} className="student-take-survey-slider-row-option">
                        {bubbles.map((value) => (
                            <button
                                key={value}
                                className={`student-take-survey-slider-button ${selectedBubble === `${category}-${value}` ? 'selected' : ''}`}
                                onClick={() => setSelectedBubble(`${category}-${value}`)}
                            />
                        ))}
                    </div>
                    : null }})}
            </div>
            <div className="student-take-survey-slider-row">
                <div className="student-take-survey-slider-row-name">
                   Grade
                </div>
                {mcConfig.categories.map((category, categoryIndex) => {
                    {return category.length > 0 ?
                    <div key={categoryIndex} className="student-take-survey-slider-row-option">
                        {bubbles.map((value) => (
                            <input
                                key={value}
                                type='text'
                                value={weightData[categoryIndex][value-1]}
                                onChange={(e) => handleWeightChange(categoryIndex, value, e)}
                                className="student-take-survey-weight-input"
                            />
                        ))}
                    </div>
                    : null }})}
            </div>
        </div>
    )
}

function TextQuestion({ isRequired, textData, setTextData }) {
    const onChange = (e) => {
        setTextData(e.target.value);
    }

    return (
        <div className="student-take-survey-text-input-field">
            <textarea
                value={textData}
                onChange={onChange}
                placeholder="Type your answer here..."
                rows={6} // specify the number of rows
                cols={100} // specify the number of columns
            />
        </div>
    )
}

export default function Question({
    formData, 
    setFormData, 
    questionData = {
        question: "Example Question",
        subtext: "subtext",
        type: "bubble", // "text", "bubble", or "preview"
        mcConfig: {
            numBubbles: 3,
            categories: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
        },
        mcRows: ["Person1", "Person2", "Self"], // should this be included in mcConfig?
        isRequired: true
    },
    questionNumber = 1
    }) {
    
    let controlled = true;
    const [selfState, setSelfState] = React.useState(questionData.type === "bubble" ? {} : "");

    // if you don't want to control/get data from this form, it should still work as intended
    // both formData and setFormData need to be passed in as props to control
    if (!formData || !setFormData) { 
        controlled = false;
    }

    return (
        <div className="student-take-survey-question-wrapper">
            {/* title */}
            <div>
                <div className="student-take-survey-title-wrapper">
                    {questionNumber + ". " + questionData.question}
                    <div className='student-take-survey-orange-bar-question'></div>
                </div>
                <div className="student-take-survey-subtext-wrapper">
                    {questionData.subtext}
                </div>
            </div>
            {/* content of the question */}
            <div className="student-take-survey-question-field">
                {
                    questionData.type === "bubble" && 
                    <BubbleQuestion 
                        mcConfig={questionData.mcConfig}
                        isRequired={questionData.isRequired}
                        rowNames={questionData.mcRows}
                        // again for controlled forms
                        bubbleData={controlled ? formData : selfState}
                        setBubbleData={controlled ? setFormData : setSelfState}
                    /> ||
                    questionData.type === "text" && 
                    <TextQuestion 
                        textData={controlled ? formData : selfState}
                        setTextData={controlled ? setFormData : setSelfState}
                    /> ||
                    questionData.type === "preview" && 
                    <PreviewBubbleQuestion 
                        mcConfig={questionData.mcConfig}
                        weightData={controlled ? formData : selfState}
                        setWeightData={controlled ? setFormData : setSelfState}
                    />
                }
            </div>
        </div>
    );
}