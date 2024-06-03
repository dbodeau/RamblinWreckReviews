import React, { useState } from 'react';
import chevron_down from './images/chevron-down.png';
import edit from './images/edit.png';
import trash from './images/trash.png';
import plus from './images/plus.png';
import './css/Professor_ManageStudents.css'; // Import your CSS file
import MenuBar from './MenuBar';  // Import your MenuBar component
import DropZone from './DropZone';

//Student Object with name and 
class Student {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const students = [
  new Student("Mickey Mouse", "mmouse@example.com"),
  new Student("Donald Duck", "dduck@example.com"),
  new Student("Minnie Mouse", "minnie_mouse@example.com"),
  new Student("Daisy Duck", "daisy_duck@example.com"),
  new Student("Bugs Bunny", "bbunny@example.com"),
  new Student("Mickey Mouse", "mmouse@example.com"),
  new Student("Donald Duck", "dduck@example.com"),
  new Student("Minnie Mouse", "minnie_mouse@example.com"),
  new Student("Daisy Duck", "daisy_duck@example.com"),
  new Student("Bugs Bunny", "bbunny@example.com"),
];

//Gets data from AWS to put into 
function downloadStudentForSelectedSurvey(){
  //Add download logic here
}

function Professor_ManageStudents() {
  //Returns student viewable object on screen
  function loadStudent(studentList){
    downloadStudentForSelectedSurvey();
    return (
      <div className='professor-manage-students-student-list-body'>
        <div className='professor-manage-students-student-list-body-info'>
          <h4>{studentList.name}</h4>
          <h6><i>{studentList.email}</i></h6>
        </div>
        <button className='professor-manage-students-student-list-body-info-buttons-edit'><img src={edit}></img></button>
        <button className='professor-manage-students-student-list-body-info-buttons-trash'><img src={trash}></img></button>
      </div>
    );
  }


  const [isUploadVisible, setIsUploadVisible] = useState(false);
  function updateAddStudentViews(){
    setIsUploadVisible(!isUploadVisible);
  }

  return (
    <div className="professor-manage-students-body-frame">
      <div className="professor-manage-students-menu-bar-container">
        <MenuBar />
      </div>
      <div className="professor-manage-students-content-container">
        <div className="professor-manage-students-options-header">
          <div className="professor-manage-students-dropdown-container">
            <div className='professor-manage-students-dropdown-sub-container'>
              <button className="professor-manage-students-dropdown-button">Select Course<img src={chevron_down}/></button>
              <div className="professor-manage-students-dropdown-content" id='professor-manage-students-course-select-content'>
                <button className='professor-manage-students-dropdown-content-top-button'>CSCI 306</button>
                <button>CSCI 370</button>
                <button className='professor-manage-students-dropdown-content-lower-button'>CHGN 121</button>
              </div>
            </div>
            <div className='professor-manage-students-dropdown-sub-container'>
              <button className="professor-manage-students-dropdown-button">Select Survey<img src={chevron_down}/></button>
              <div className="professor-manage-students-dropdown-content" id='professor-manage-students-survey-select-content'>
                <button className='professor-manage-students-dropdown-content-top-button'>Intro Survey</button>
                <button>Peer Eval 1</button>
                <button className='professor-manage-students-dropdown-content-lower-button'>Peer Eval 2</button>
              </div>
            </div>
            <div className='professor-manage-students-dropdown-sub-container'>
              <button className="professor-manage-students-dropdown-button">Select Group<img src={chevron_down}/></button>
              <div className="professor-manage-students-dropdown-content" id='professor-manage-students-survey-select-content'>
                <button className='professor-manage-students-dropdown-content-top-button'>Group 1</button>
                <button>Group 2</button>
                <button className='professor-manage-students-dropdown-content-lower-button'>Group 3</button>
              </div>
            </div>
          </div>
        </div>
        {/* Student List */}
        <div className='professor-manage-students-main-content-container'>
          <div style={{display: isUploadVisible ? 'flex' : 'none'}} className='professor-manage-students-upload-container'>
            {/* Manual Add */}
            <div className='professor-manage-students-manual-upload-container'>
              <h2>Manually Add Students</h2>
              <div className='professor-manage-students-manual-upload-name-container'>
                <input className='professor-manage-students-manual-upload-input-name' type='text' placeholder='First Name'></input>
                <input className='professor-manage-students-manual-upload-input-name' type='text' placeholder='Last Name'></input>
              </div>
              <input className='professor-manage-students-manual-upload-input-other' type='text' placeholder='Email'></input>
              <button className='professor-manage-students-manual-upload-button'>Add Student</button>
            </div>
            <h2>OR</h2>
            {/* CSV File Upload */}
            <div class="professor-manage-students-csv-upload-container">
              <DropZone />
            </div>
          </div>
            <div className='professor-manage-students-student-list-container'>
              <div className='professor-manage-students-student-list-header'>
                <h2>Student Management Console</h2>
                <input type='search' placeholder='Search by name or email'></input>
                <button onClick={isUploadVisible ? updateAddStudentViews : updateAddStudentViews}><img src={plus}></img></button>
              </div>
              {students.map(students => loadStudent(students))} {/* Dynamically adds students tiles */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Professor_ManageStudents;
