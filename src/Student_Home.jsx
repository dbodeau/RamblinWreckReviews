// frontend display for the student home page
// By: Wesley Woo

import './css/Student_Home.css';
import MenuBar from "./MenuBar";
import React, { useState } from 'react';

export default function Student_Home() {
  // state to manage which dropdown menus are open
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (index) => {
    setOpenMenus(prev => {
      const newOpenMenus = [...prev];
      newOpenMenus[index] = !newOpenMenus[index];
      return newOpenMenus;
    });
  }

  // function to create the ... dropdown menu
  function displayDropDownMenu(index = 0, components = "View Feedback") {
    const isMenuOpen = openMenus[index] || false;

    return (
      <div // allows for hover functionality
        className="student-home-dropdown-container"
        onMouseEnter={() => toggleMenu(index)}
        onMouseLeave={() => toggleMenu(index)}
      > 
        {/* creates the ... button */}
        <div className='student-home-dropdown-menu-top'>
          <button onClick={() => toggleMenu(index)} className="student-home-dropdown-button">...</button>
        </div>
        {isMenuOpen && (
          <div className="student-home-dropdown-menu">
            <p className="student-home-menu-color">{components}</p>
          </div>
        )}
      </div>
    );
  }

  // function that creates bubbles for each survey
  function displaySurvey(index, surveyName = "default survey", professorName = "Professor", statusCode = "not-available") {
    let cssStatusClass = "student-home-status-code-not-available"
    /* status code: "not-available" */
    if (statusCode === 'not-available'){
      cssStatusClass = "student-home-status-code-not-available";
    }
    /* status code: "taken" */
    if (statusCode === 'taken'){
      cssStatusClass = "student-home-status-code-taken"
    }
    /* status code: "not-taken" */
    if (statusCode === 'not-taken'){
      cssStatusClass = "student-home-status-code-not-taken"
    }
    /* status code: "taken-with-feedback" */
    if (statusCode === 'taken-with-feedback'){
      cssStatusClass = "student-home-status-code-taken-with-feedback"
    }
    
    return (
      <>
        <div className={`student-home-survey-button ${cssStatusClass}`} key={index}>
          <div className="student-home-status-bar">
            {statusCode === "not-available" && (<span>Not Available</span>)} {/* status code: "not-available" */}
            {statusCode === "taken" && (<span>Survey Taken</span>)} {/* status code: "taken" */}
            {statusCode === "not-taken" && (<span>Survey Not Taken</span>)} {/* status code: "not-taken" */}
            {statusCode === "taken-with-feedback" && (<span>Feedback Available</span>)} {/* status code: "taken-with-feedback" */}
          </div>
          <div className="student-home-survey-name" onClick={() => { window.location.href = '/student/take-survey';}}>
            <div className='student-home-orange-bar-survey-horizontal-container'>
              <div className="student-home-title-center">{surveyName}</div>
              <div className='student-home-orange-bar-survey'></div>
            </div>
          </div>
          <div className="student-home-survey-footer">
            <div className="student-home-professor-name" onClick={() => { window.location.href = '/student/take-survey';}}>{professorName}</div>
            <div className="student-home-dropdown-wrapper" div onClick={() => { window.location.href = '/student/view-feedback';}}>
              {displayDropDownMenu(index)}
            </div>
          </div>
        </div>
      </>
    );
  }

  // body of the webpage
  return (
    <div className="student-home-horizontal-container">
      <MenuBar />
      <div className="student-home-vertical-container">
        <div className="student-home-title">
          <h1>Your Surveys</h1>
          <div className="student-home-orange-bar"></div>
        </div>
        {/* create the survey bubbles */}
        {/* format: index(usually starting with 0), survey title, professor name/subtext, status */}
        {/* possible status codes: "not-available", "taken", "not-taken", "taken-with-feedback" */}
        {displaySurvey(0, "Peer Eval 1", "CSCI:200 Professor Jane Smith", "not-available")}
        {displaySurvey(1, "Peer Eval 2", "HASS: 410 Professor John Doe", "taken")}
        {displaySurvey(2, "Peer Eval 3", "MEGN 100: Professor James", "not-taken")}
        {displaySurvey(3, "Peer Eval 4", "CSCI 100: Professor Maxwell", "taken-with-feedback")}
        {displaySurvey(4)}
        {displaySurvey(5, "survey 1", "CSCI:200 Professor Jane Smith")}
        {displaySurvey(6, "survey 2", "HASS: 410 Professor John Doe")}
        {displaySurvey(7, "survey 3")}
        {displaySurvey(8)}
      </div>
    </div>
  );
}
