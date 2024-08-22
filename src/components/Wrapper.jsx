import { Link, Outlet } from 'react-router-dom';
import mineslogo from './images/mineslogo.png'; 
import './css/Wrapper.css';    
import authStatus from './AuthStatusEnum'; 
import { signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

async function doSignOut(){
  await signOut();
  localStorage.setItem('AWS_signedInUserGroupStatuses', [""]);
  window.location.href = '/login'
}

let currentUser;

/*
Fetches current user group access from Cognito
*/
async function getCurrentUserGroupAccess(){
  currentUser = await getCurrentUser(); //Get currently signed in user
  
  const requestData = {
    username: currentUser.username,
  };

  try {
    const response = await fetch('https://0wr74dgf99.execute-api.us-east-2.amazonaws.com/get-users-cognito-groups-stage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })
    .then(async response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('AWS_signedInUserGroupStatuses', data.body);
      return data;
    })
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

/*
  The wrapper houses the navigation bar that is displayed on top of every page
*/
function Wrapper() {
  const [isLoading, setIsLoading] = useState(true);

  function updateNavBarData(newAuthStatus){
    localStorage.setItem('AWS_signedInUserCurrentGroupStatus', newAuthStatus);
  }
  
  useEffect(() => {
    async function fetchData() {
      await getCurrentUserGroupAccess();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const adminLink = (
    <Link to="/admin" className="wrapper-nav-bar-menu-link" onClick={() => updateNavBarData(authStatus.ADMIN)}>
      <button className="wrapper-nav-bar-menu-button">Admin</button>
    </Link>
  );

  const professorLink = (
    <Link to="/professor" className="wrapper-nav-bar-menu-link" onClick={() => updateNavBarData(authStatus.SUPERUSER)}>
      <button className="wrapper-nav-bar-menu-button">Professor</button>
    </Link>
  );

  const studentLink = (
    <Link to="/student" className="wrapper-nav-bar-menu-link" onClick={() => updateNavBarData(authStatus.STUDENT)}>
      <button className="wrapper-nav-bar-menu-button">Student</button>
    </Link>
  );

  const signOutLink = (
    <button onClick={doSignOut} className="wrapper-nav-bar-menu-button" id="wrapper-nav-bar-menu-button-sign-out">Sign Out</button>
  );

  return (
    <>
      <div className='wrapper-header'>
        <img style={{height: 50, width: 50, margin: 15}} src={mineslogo} alt="Mines Logo"/>
        <h1 className='wrapper-school-header'>Colorado School of Mines</h1>
        <h1 className="wrapper-website-title">Ramblin' Wreck Reviews</h1>
        <div className='wrapper-nav-bar-menu'>
          {/* Displays correct links based on user access */}
          {localStorage.getItem('AWS_signedInUserGroupStatuses') !== null && localStorage.getItem('AWS_signedInUserGroupStatuses').includes(authStatus.ADMIN) ? adminLink : null}
          {localStorage.getItem('AWS_signedInUserGroupStatuses') !== null && localStorage.getItem('AWS_signedInUserGroupStatuses').includes(authStatus.SUPERUSER) ? professorLink : null}
          {localStorage.getItem('AWS_signedInUserGroupStatuses') !== null && localStorage.getItem('AWS_signedInUserGroupStatuses').includes(authStatus.STUDENT) ? studentLink : null}
          {localStorage.getItem('AWS_signedInUserGroupStatuses') !== null && !currentUser ? null : signOutLink} {/* Always shows up on nav bar as redirects to login */}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Wrapper;