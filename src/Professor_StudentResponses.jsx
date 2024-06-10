
import './css/Professor_StudentResponses.css'
import React, { useState } from 'react';
import chevron_down from './images/chevron-down.png';
import chevron_right from './images/chevron-right.png'
import edit from './images/edit.png';
import trash from './images/trash.png';
import plus from './images/plus.png';
import MenuBar from './MenuBar'; 
import DropZone from './DropZone';
import AWS_Authenticator from './AWS_Authenticator';
import AuthStatusEnum from './AuthStatusEnum';

/*
This page is for professors to see their student's feedback in a tabular form
it is completely dynamic, meaning all that needs to be done is bring the information
into the const variables below

To get select course and select survey functionality i suggest just updating the data
I believe the rest of the page should update with it
sorry if it doesn't
*/

class Group {
    constructor(name, course, survey) {
      this.name = name;
      this.course = course;
      this.survey = survey;
    }
  }

class Student {
  constructor(name, personalGrade, groupGrade,group, responses){
      this.name = name;
      this.personalGrade = personalGrade;
      this.groupGrade = groupGrade;
      this.group = group;
      this.responses = responses;
  }
}

//holds a list of all of the groups with their names, course, and the survey that they belong to
//all that needs to be done is bring this information from the backend database
const groups = [
  new Group("Group 1", "CSCI 370", "Peer Eval 1"),
  new Group("Group 2", "ENDS 101", "Peer Eval 1"),
  new Group("Group 3", "PAGN 101", "Peer Eval 1"),
  new Group("Group 4", "ENDS 200", "Intro Survey"),
  new Group("Group 11", "CSCI 370", "Peer Eval 1"),
  new Group("Group 21", "ENDS 101", "Peer Eval 1"),
  new Group("Group 31", "PAGN 101", "Peer Eval 1"),
  new Group("Group 41", "ENDS 200", "Peer Eval 1"),
];

//holds a list of all the students with their names, grades from bubble questions, what group their in and all of their responses held in a 2d list
//all that needs to be done is bring in this information from backend database and calculate grades
const students = [
  new Student("Milly Bobby Brown", 94, 80, "Group 1", [["I did the most work","hotline bling sucked","kendrick won the rap battle","Belinda didn't even show up"],[],[],[],[]]),
  new Student("Drizzy Drake", 80, 90, "Group 1", [["Response 1","response 2","response 3","response4"],[],[],[],[]]),
  new Student("Kendrick", 89, 98, "Group 1", [["Response 1","response 2","response 3","response4"],[],[],[],[]]),
  new Student("Belinda Saxton", 90, 67, "Group 1", [["Response 1","response 2","response 3","response4"],[],[],[],[]]),
  new Student("Bella Hadid", 96, 82, "Group 2", [["Response 1","response 2","response 3"],[],[],[],[]]),
  new Student("Jojo Siwa", 97, 56, "Group 2", [["Response 1","response 2","response 3"],[],[],[],[]]),
  new Student("Brittany Howard", 48, 68, "Group 2", [["Response 1","response 2","response 3"],[],[],[],[]])
  
  ];

//this contains a list of all of the questions
//needs to change to be managed by course and survey
//could be done by an api call
const questions = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5"
]


  let studGroup = [];

function Professor_StudentResponses() {

  function loadStudent(student, group){
      //display student information in group
      if (group === student.group){
        studGroup.push(student);   
      }

  }

  function printStudents() {
    return (
      <div>
        <h4 className='professor-student-feedback-respondee'>Respondee</h4>
  
        <table className='professor-student-feedback-table'>
          {/* First row with student names */}
          <tr>
            <th key="respondee_label">Responder</th>
            {studGroup.map((student) => (
              <th key={student.name}>{student.name}</th>
            ))}
          </tr>
  
          {/* Subsequent rows with responses */}
          {studGroup.map((student) => (
            <tr key={student.name}>
              <th>{student.name}</th>
              {student.responses[0].map((response, index) => (
                <td key={index}>
                  {response}<br></br>
                  <input type="checkbox" id={`suppress-response-${index}`} />
                  <label htmlFor={`suppress-response-${index}`}>Suppress Content</label>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }

  function displayGrade(student, groupList) {
    if (student.group === groupList.name) {
      return (
        <tr>
          <th>{student.name}</th>
          <th>{student.personalGrade}</th>
          <th>{student.groupGrade}</th>
        </tr>
      );
    } else {
      return null; // Or an empty element if no match
    }
  }
  

  function displayQuestions(question, groupList) {
    studGroup = []; // Reset the array before each question
    return (
      <div>
        <h4>{question}</h4>
        {students.map(students => loadStudent(students, groupList.name))}
        {printStudents()}
        <br></br>
      </div>
    );
  }
  
  //Returns student viewable object on screen
  function LoadGroup(groupList){

      //boolean to display student content when clicked
      const [isUploadVisible, setIsUploadVisible] = useState(false);
      function ExpandGroup(){
        setIsUploadVisible(!isUploadVisible);
      }

      function FixBug(){
        setIsUploadVisible(isUploadVisible);
      }

      studGroup = [];

      return (
      <div className='professor-student-responses-student-list-body'  onClick={isUploadVisible ? ExpandGroup : ExpandGroup}>
          <div className='professor-student-responses-student-sublist-body'>
              <div className = 'professor-student-responses-student-list-body-content'>
                  <div className='professor-student-responses-student-list-body-info'>
                      <h4>{groupList.name}</h4>
                      <h6><i>{groupList.course} | {groupList.survey}</i></h6>
                  </div>
                  <div className='professor-student-responses-student-list-image'>
                      <img src={chevron_right} className='professor-student-responses-expand-chevron' ></img>
                  </div>
              </div>
              <div style={{display: isUploadVisible ? 'flex' : 'none'}} className='professor-student-responce-expand-container' onClick={FixBug}>
                <h2>Student Grades</h2>
                <table className='professor-student-responses-grade-table'>
                  <tr>
                    <th>Student</th>
                    <th>Grade with personal evaluation</th>
                    <th>Grade without personal evaluation</th>
                  </tr>
                  {students.map(studentGrade => displayGrade(studentGrade, groupList))}
                </table>
                <br></br>
                <h2>Student Responses</h2>
                  {questions.map(question => displayQuestions(question, groupList))}
              </div>
          </div>
      </div>
      );
  }

//main hub
  return (
    <div className="professor-student-responses-body-frame">
      <div className="professor-student-responses-menu-bar-container">
        <MenuBar />
      </div>
      <div className="professor-student-responses-content-container">
        <div className="professor-student-responses-options-header">
          <div className="professor-student-responses-dropdown-container">
            <div className='professor-student-responses-dropdown-sub-container'>
              <button className="professor-student-responses-dropdown-button">Select Course<img src={chevron_down}/></button>
              <div className="professor-student-responses-dropdown-content" id='professor-student-responses-course-select-content'>
                <button className='professor-student-responses-dropdown-content-top-button'>CSCI 306</button>
                <button>CSCI 370</button>
                <button className='professor-student-responses-dropdown-content-lower-button'>CHGN 121</button>
              </div>
            </div>
            <div className='professor-student-responses-dropdown-sub-container'>
              <button className="professor-student-responses-dropdown-button">Select Survey<img src={chevron_down}/></button>
              <div className="professor-student-responses-dropdown-content" id='professor-student-responses-survey-select-content'>
                <button className='professor-student-responses-dropdown-content-top-button'>Intro Survey</button>
                <button>Peer Eval 1</button>
                <button className='professor-student-responses-dropdown-content-lower-button'>Peer Eval 2</button>
              </div>
            </div>
          </div>
        </div>
        {/* Group List */}
            <div className='professor-student-responses-student-list-container'>
              <div className='professor-student-responses-student-list-header'>
                <h2>Survey Management Console</h2>
              </div>
              {/* Run through each group */}
              {groups.map(groups => LoadGroup(groups))} {/* Dynamically adds students tiles */}
            </div>
        </div>
      </div>
  );

}

export default AWS_Authenticator(Professor_StudentResponses, AuthStatusEnum.SUPERUSER);

