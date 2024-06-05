import { Link, Outlet } from 'react-router-dom';
import mineslogo from './images/mineslogo.png'; 
import './css/Wrapper.css';    
import currentUser from './CurrentUser';
import authStatus from './AuthStatusEnum'; 
import { signOut } from 'aws-amplify/auth';
import {withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';

async function doSignOut(){
  await signOut();
  window.location.href = '/login'
}

/*
  The wrapper houses the navigation bar that is displayed on top of every page
*/
function Wrapper() {

  function updateNavBarData(status){
    currentUser.setCurrentStatus(status);
  }

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
    // <Link className="wrapper-nav-bar-menu-link" onClick={() => {doSignOut}}> {/* Sign out user and redirect to login */}
    //   <button onClick={() => {doSignOut}} className="wrapper-nav-bar-menu-button" id="wrapper-nav-bar-menu-button-sign-out">Sign Out</button>
    // </Link>
  );

  return (
    <>
      <div className='wrapper-header'>
        <img style={{height: 50, width: 50, margin: 15}} src={mineslogo} alt="Mines Logo"/>
        <h1 className='wrapper-school-header'> Colorado School of Mines</h1>
        <h1 className="wrapper-website-title"> Ramblin' Wreck Reviews</h1>
        <div className='wrapper-nav-bar-menu'>
          {/* Displays correct links based on user access */}
          {currentUser.userStatuses.includes(authStatus.ADMIN) && currentUser.isSignedIn ? adminLink : null}
          {currentUser.userStatuses.includes(authStatus.SUPERUSER) && currentUser.isSignedIn ? professorLink : null}
          {currentUser.userStatuses.includes(authStatus.STUDENT) && currentUser.isSignedIn ? studentLink : null}
          {currentUser.isSignedIn ? signOutLink : null}
        </div>
      </div>
      <Outlet />
    </>
  );
}

const AuthOptions = {
  unauthRedirect: '/login',
};

export default withAuthenticator(Wrapper, AuthOptions);