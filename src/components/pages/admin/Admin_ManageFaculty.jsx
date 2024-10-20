/* This is previous team code and our team did not touch this file logic*/
import "../../../css/Admin_ManageFaculty.css";
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Popup } from "reactjs-popup";
import MenuBar from '../../MenuBar';

export default function Admin_ManageFaculty() {
  //stores users under a selected department
  const [users, setUsers] = useState([]);
  //re-renders page without state change
  const [forceRender, setRender] = useState(0);
 
  //listens to re-render whenever the dependency array variables are updated
  useEffect(() => {
    console.log('Forced render', forceRender);
  },[forceRender])


  //holds user input for the invitation form
  const [inviteFormState, setInviteFormState] = useState({
    first: "",
    last: "",
    email: "",
    department: "",
    accessTag: "",
  });

  //holds what department the user chooses from the dropdown in the activity status form
  const [activationForm, setActivationForm] = useState({
    department: "",
  });

  //handles user input errors
  const [successPopup, setSucessPopup] = useState();
  const [errorPopup, setErrorPopup] = useState();

  //stores deptID so multiple API calls are not made
  const [deptID, setDeptID] = useState();

  

  //load in all the departments using API loader call through React. This is set up to be linked in index.js
  var departments = useLoaderData();

  //fired when invite faculty form is submitted
  const handleInviteFormSubmit = async (event) => {
    event.preventDefault(); //prevent page from reloading

    //handle form error for adding a new user
    if (
      inviteFormState.first === "" ||
      inviteFormState.last === "" ||
      inviteFormState.email === "" ||
      inviteFormState.accessTag === "" ||
      inviteFormState.department === ""
    ) {
      setSucessPopup(false);
      setErrorPopup(true);
    }

    //get the departmentID to be added to
    let deptID = await fetchDepartmentID(inviteFormState.department);

    //create body of post
    let body = {
      first: inviteFormState.first,
      last: inviteFormState.last,
      email: inviteFormState.email,
      role: inviteFormState.accessTag,
    };

    //otherwise post the user
    postUser(deptID, body);

    //success message
    setSucessPopup(true);
    setErrorPopup(false);
  };

  //Updates form state when radio button is selected for access tags for the new faculty form
  const handleRadioButtons = (event) => {
    event.preventDefault();
    setInviteFormState({ ...inviteFormState, accessTag: event.target.id });
  };

  //updates the category the user selects from the dropdown for inviting a member
  const updateDepartment = async (event) => {
    event.preventDefault();

    //if the person choose '--Choose--', set to empty string for error handling
    if (event.target.value === "--Choose--") {
      setInviteFormState({ ...inviteFormState, department: "" });
      return;
    }

    //otherwise set the department value to what the user chose
    setInviteFormState({
      ...inviteFormState,
      department: event.target.value,
    });
  };

  //get all users under a department to populate the activity status table
  const retrieveUsers = async (event) => {
    event.preventDefault();

    //if the person choose '--Choose--', set to empty string for error handling
    if (event.target.value === "--Choose--") {
      setActivationForm({ ...activationForm, department: "" });
      return;
    }

    //otherwise set the department value to what the user chose
    setActivationForm({ ...activationForm, department: event.target.value });

    //get department ID
    let deptID = await fetchDepartmentID(event.target.value);

    //save the department ID
    setDeptID(deptID);

    let users = await getUsersUnderDepartment(deptID);
    setUsers(users);
  };

  //displays if a user is active or not
  const displayStatus = (isActive) => {
    if (isActive === "true") {
      return <p className="admin-manage-faculty-active-flag">Active</p>;
    } else {
      return <p className="admin-manage-faculty-inactive-flag">Inactive</p>;
    }
  };

  //toggle the status of a user
  const toggleStatus = async (userID, isActive) => {
    //toggle active tag
    isActive = !isActive;
    let response = await updateUserStatus(deptID, userID, isActive);

    let userCopy = users;
    //if toggle was successful, update the UI
    if (response.status === 201) {
      //update user array
      for (let i = 0; i < userCopy.length; i++) {
        let user = userCopy[i];
     
        if (user.id === userID) {
          //set new active tag
          user.active = isActive;
        }
      }

      //update state
      setUsers(userCopy);
    }
    let render = forceRender + 1;
    setRender(render);
  };

  return (
    <>
      {/* create admin menu bar */}
      <div className='admin-manage-faculty-content-container'>
        {<MenuBar />}
        {/* Draws the section that displays the 'Preview Questions by Category' Box */}
        <div className="admin-manage-faculty-background-admin">
          <div className="admin-manage-faculty-card-content">
            <h3 className="admin-manage-faculty-form-title">Invite Faculty Member</h3>
            {/* Draws the section that allows the admin to enter the question content and add the question to a category */}
            <div>
              <div className="admin-manage-faculty-add-faculty-form">
                  <form onSubmit={handleInviteFormSubmit}>
                  {/* First and Last Names for Form */}
                  <div className="admin-manage-faculty-div-name">
                    <span className="admin-manage-faculty-span-name">
                      <h3 className="admin-manage-faculty-form-subheaders">First:</h3>
                      <input
                        className="admin-manage-faculty-input-name"
                        value={inviteFormState.first}
                        onChange={(e) =>
                          setInviteFormState({
                            ...inviteFormState,
                            first: e.target.value,
                          })
                        }
                      ></input>
                    </span>

                    <span className="admin-manage-faculty-span-name">
                      <h3 className="admin-manage-faculty-form-subheaders">Last:</h3>
                      <input
                        className="admin-manage-faculty-input-name"
                        value={inviteFormState.last}
                        onChange={(e) =>
                          setInviteFormState({
                            ...inviteFormState,
                            last: e.target.value,
                          })
                        }
                      ></input>
                    </span>
                  </div>

                  {/* Email input for form */}
                  <h3 className="admin-manage-faculty-form-subheaders">Email:</h3>
                  <input
                    className="admin-manage-faculty-input"
                    value={inviteFormState.email}
                    onChange={(e) =>
                      setInviteFormState({
                        ...inviteFormState,
                        email: e.target.value,
                      })
                    }
                  ></input>

                  {/* Dropdown menu for all the departments */}
                  <span className="admin-manage-faculty-faculty-span">
                    <h3 className="admin-manage-faculty-form-subheaders">Department:</h3>
                    <select
                      className="admin-manage-faculty-department-dropdown"
                      onChange={updateDepartment}
                    >
                      <option key={0}>--Choose--</option>
                      {departments?.map((dept) => (
                        <option key={dept.id}>{dept.abbreviation}</option>
                      ))}
                    </select>
                  </span>
                  {/* Radio buttons for selecting faculty access */}
                  <span className="admin-manage-faculty-faculty-span">
                    <h3 className="admin-manage-faculty-form-subheaders">Access:</h3>
                    <div className="admin-manage-faculty-access-selection">
                      <input
                        onChange={handleRadioButtons}
                        name="access"
                        id="professor"
                        type="radio"
                      ></input>
                      <label htmlFor="professor">Professor</label>
                      <input
                        onChange={handleRadioButtons}
                        name="access"
                        id="admin"
                        type="radio"
                      ></input>
                      <label htmlFor="admin">Admin</label>
                    </div>
                  </span>
                  <button className="admin-manage-faculty-invite-button">Invite</button>
                </form>
                {/* Button to invite faculty member */}
              </div>
            </div>
          </div>
          {/* Success message for adding an user */}
          <Popup
            open={successPopup}
            onClose={() => setSucessPopup(false)}
            position="right center"
          >
            <div className="admin-manage-faculty-content-box-success">
              <p className="admin-manage-faculty-content-text">Successfully invited faculty member.</p>
              <button
                onClick={() => setSucessPopup(false)}
                className="admin-manage-faculty-popup-button"
              >
                Close
              </button>
            </div>
          </Popup>
          {/* Error message */}
          <Popup
            open={errorPopup}
            onClose={() => setErrorPopup(false)}
            position="right center"
          >
            <div className="admin-manage-faculty-content-box-error">
              <p className="admin-manage-faculty-content-text">
                Oops! Something went wrong. Please ensure that all sections of the
                form are filled out.
              </p>
              <button
                onClick={() => setErrorPopup(false)}
                className="admin-manage-faculty-popup-button"
              >
                Close
              </button>
            </div>
          </Popup>

          <div className="admin-manage-faculty-card-content">
            <h3 className="admin-manage-faculty-form-title">Manage Faculty Member Access</h3>
            <div>
              <div className="admin-manage-faculty-add-faculty-form">
                {/* Dropdown menu for all the departments */}
                <span className="admin-manage-faculty-faculty-span">
                  <h3 className="admin-manage-faculty-form-subheaders">Department:</h3>
                  <select
                    className="admin-manage-faculty-department-dropdown"
                    onChange={retrieveUsers}
                  >
                    <option key={0}>--Choose--</option>
                    {departments?.map((dept) => (
                      <option key={dept.id}>{dept.abbreviation}</option>
                    ))}
                  </select>
                </span>

                {/* Admin Section of Users */}
                <h3>Admins</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>First</th>
                      <th>Last</th>
                      <th>Email</th>
                      <th>Current Status</th>
                      <th>Toggle Status</th>
                    </tr>
                    {users?.map((user) => {
                      // if the tag is admin, display in this table
                      if (user.access_tags === "admin") {
                        return (
                          <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{displayStatus(user.active.toString())}</td>
                            <td>
                              <button className="admin-manage-faculty-table-button"  onClick={()=> {toggleStatus(user.id, user.active)}}>Toggle</button>
                            </td>
                          </tr>
                        );
                      }
                      return <></>;
                    })}
                  </tbody>
                </table>

                {/* Professor Section of Users */}
                <h3>Professors</h3>
                <table>
                  <tbody>
                    <tr>
                      <th className="admin-manage-faculty-th-first">First</th>
                      <th className="admin-manage-faculty-th-last">Last</th>
                      <th className="admin-manage-faculty-th-email">Email</th>
                      <th className="admin-manage-faculty-th-status">Current Status</th>
                      <th className="admin-manage-faculty-th-toggle status">Toggle Status</th>
                    </tr>
                    {users?.map((user) => {
                      // if the tag is admin, display in this table
                      if (user.access_tags === "professor") {
                        return (
                          <tr key={user.id}>
                            <td className="admin-manage-faculty-td-first">{user.first_name}</td>
                            <td className="admin-manage-faculty-td-last">{user.last_name}</td>
                            <td className="admin-manage-faculty-td-email">{user.email}</td>
                            <td className="admin-manage-faculty-td-toggle-status">
                              {displayStatus(user.active.toString())}
                            </td>
                            <td>
                              <button className="admin-manage-faculty-table-button" onClick={()=> {toggleStatus(user.id, user.active)}}>Toggle</button>
                            </td>
                          </tr>
                        );
                      }
                      return <></>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}