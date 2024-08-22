import React, { useState } from 'react';
import chevron_right from '../assets/images/chevron-right.png';
import chevron_down from '../assets/images/chevron-down.png';
import plus from '../assets/images/plus.png';
import plusDark from '../assets/images/plus-black.png';
import person3 from '../assets/images/person-3.png';
import person3Dark from '../assets/images/person-3-black.png';
import edit from '../assets/images/edit.png';
import editDark from '../assets/images/edit-black.png';
import '../css/MenuBar.css';
import authStatus from '../types/AuthStatusEnum';
import AWS_Authenticator from './AWS_Authenticator';

function MenuBar() {
  const [imageUrl, setImageUrl] = useState(chevron_down); // State to track image viewed
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility
  const [isPlusHovered, setIsPlusHovered] = useState(false); 
  const [isPersonHovered, setIsPersonHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);

  const switchMenuBarVisibility = () => {
    setImageUrl(imageUrl === chevron_down ? chevron_right : chevron_down); // Toggle image viewed on button
    setIsOpen(!isOpen); // Toggle menu visibility on click
  };

  const menuItemImages = {
    plus: { light: plus, dark: plusDark },
    person3: { light: person3, dark: person3Dark },
    edit: { light: edit, dark: editDark },
  };

  const adminMenu = (
    <div className='menu-bar-menu-item-container'>
      <button onClick={() => { window.location.href = "/admin/create-survey-questions"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsPlusHovered(true)} onMouseLeave={() => setIsPlusHovered(false)}>
        <img
          src={isPlusHovered ? menuItemImages.plus.dark : menuItemImages.plus.light}
          alt="Create Survey Questions"
        />
        Create Survey Questions
      </button>
      <button onClick={() => { window.location.href = "/admin/manage-faculty"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsPersonHovered(true)} onMouseLeave={() => setIsPersonHovered(false)}>
        <img
          src={isPersonHovered ? menuItemImages.person3.dark : menuItemImages.person3.light}
          alt="Manage Faculty Access"
        />
        Manage Faculty Access
      </button>
      <button onClick={() => { window.location.href = "/admin/edit-question-weights"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
        <img
          src={isEditHovered ? menuItemImages.edit.dark : menuItemImages.edit.light}
          alt="Edit Question Weights"
        />
        Edit Question Weights
      </button>
    </div>
  );

  const professorMenu = (
    <div className='menu-bar-menu-item-container'>
      <button onClick={() => { window.location.href = "/professor/create-course"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsPlusHovered(true)} onMouseLeave={() => setIsPlusHovered(false)}>
        <img
          src={isPlusHovered ? menuItemImages.plus.dark : menuItemImages.plus.light}
          alt="Create Course icon"
        />
        Create Course
      </button>
      <button onClick={() => { window.location.href = "/professor/manage-survey"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsPersonHovered(true)} onMouseLeave={() => setIsPersonHovered(false)}>
        <img
          src={isPersonHovered ? menuItemImages.person3.dark : menuItemImages.person3.light}
          alt="Manage Surveys icon"
        />
        Manage Surveys
      </button>
      <button onClick={() => { window.location.href = "/professor/manage-students"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
        <img
          src={isEditHovered ? menuItemImages.edit.dark : menuItemImages.edit.light}
          alt="Manage Students icon"
        />
        Manage Students
      </button>
      <button onClick={() => { window.location.href = "/professor/student-responses"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
        <img
          src={isEditHovered ? menuItemImages.edit.dark : menuItemImages.edit.light}
          alt="Student Responses icon"
        />
        Student Responses
      </button>
      <button onClick={() => { window.location.href = "/professor/email-notifications"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
        <img
          src={isEditHovered ? menuItemImages.edit.dark : menuItemImages.edit.light}
          alt="Email Notifications icon"
        />
        Email Notifications
      </button>
    </div>
  );

  const studentMenu = (
    <div className='menu-bar-menu-item-container'>
      <button onClick={() => { window.location.href = "/student/take-survey"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
        <img
          src={isEditHovered ? menuItemImages.edit.dark : menuItemImages.edit.light}
          alt="Take Survey icon"
        />
        Take Survey
      </button>
      <button onClick={() => { window.location.href = "/student/view-feedback"; }} className="menu-bar-menu-item" onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
        <img
          src={isEditHovered ? menuItemImages.edit.dark : menuItemImages.edit.light}
          alt="View Feedback icon"
        />
        View Feedback
      </button>
    </div>
  );

  return (
    <>
      <body>
        <div className="menu-bar-vertical-bar-container" onMouseLeave={switchMenuBarVisibility}>
          <button className="menu-bar-button" onMouseEnter={switchMenuBarVisibility}>
            <img src={imageUrl} alt='dropdown button' />
          </button>
          {isOpen && (
            <div className="menu-bar-menu-content">
              <div className="menu-bar-menu-title-container">
                <h2>Menu</h2>
              </div>
              {localStorage.getItem('AWS_signedInUserCurrentGroupStatus') !== null && localStorage.getItem('AWS_signedInUserCurrentGroupStatus') === authStatus.ADMIN ? adminMenu : null}
              {localStorage.getItem('AWS_signedInUserCurrentGroupStatus') !== null && localStorage.getItem('AWS_signedInUserCurrentGroupStatus') === authStatus.SUPERUSER ? professorMenu : null}
              {localStorage.getItem('AWS_signedInUserCurrentGroupStatus') !== null && localStorage.getItem('AWS_signedInUserCurrentGroupStatus') === authStatus.STUDENT ? studentMenu : null}
            </div>
          )}
        </div>
      </body>
    </>
  );
}

export default AWS_Authenticator(MenuBar);
