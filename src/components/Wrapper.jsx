import { Link, Outlet, useNavigate } from 'react-router-dom';
import mineslogo from '../assets/images/mineslogo.png';
import '../css/Wrapper.css';
import AuthStatusEnum from '../types/AuthStatusEnum';
import { signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import AWS_Authenticator from './AWS_Authenticator';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/authSlice';

/*
  The wrapper houses the navigation bar that is displayed on top of every page
*/
function Wrapper() {
  const [role, setRole] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const userGroups = useSelector((state => state.auth.userGroups));
  const currentUser = useSelector((state => state.auth.user));
  const dispatch = useDispatch();

  const doSignOut = async () => {
    await signOut();
    dispatch(clearUser());
    navigate('/login');
  }

  useEffect(() => {
    if (location.pathname.includes('admin')) {
      setRole(AuthStatusEnum.ADMIN);
    }
    else if (location.pathname.includes('professor')) {
      setRole(AuthStatusEnum.SUPERUSER);
    }
    else if (location.pathname.includes('student')) {
      setRole(AuthStatusEnum.STUDENT);
    }
    else {
      setRole('');
    }
  }, [location]);

  function updateNavBarData(newAuthStatus) {
    localStorage.setItem('AWS_signedInUserCurrentGroupStatus', newAuthStatus);
  }

  const adminLink = (
    <Link to="/admin" className="wrapper-nav-bar-menu-link" onClick={() => updateNavBarData(AuthStatusEnum.ADMIN)}>
      <button className="wrapper-nav-bar-menu-button">Admin</button>
    </Link>
  );

  const professorLink = (
    <Link to="/professor" className="wrapper-nav-bar-menu-link" onClick={() => updateNavBarData(AuthStatusEnum.SUPERUSER)}>
      <button className="wrapper-nav-bar-menu-button">Professor</button>
    </Link>
  );

  const studentLink = (
    <Link to="/student" className="wrapper-nav-bar-menu-link" onClick={() => updateNavBarData(AuthStatusEnum.STUDENT)}>
      <button className="wrapper-nav-bar-menu-button">Student</button>
    </Link>
  );

  const signOutLink = (
    <button onClick={doSignOut} className="wrapper-nav-bar-menu-button" id="wrapper-nav-bar-menu-button-sign-out">Sign Out</button>
  );

  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <div className='wrapper-header'>
        <img style={{ height: 50, width: 50, margin: 15 }} src={mineslogo} alt="Mines Logo" />
        <h1 className='wrapper-school-header'>Colorado School of Mines</h1>
        <h1 className="wrapper-website-title">Ramblin' Wreck Reviews</h1>
        <div className='wrapper-nav-bar-menu'>
          {/* Displays correct links based on user access */}
          {userGroups.includes(AuthStatusEnum.ADMIN) ? adminLink : null}
          {userGroups.includes(AuthStatusEnum.SUPERUSER) ? professorLink : null}
          {userGroups.includes(AuthStatusEnum.STUDENT) ? studentLink : null}
          {currentUser ? signOutLink: null}
        </div>
      </div>
      <AWS_Authenticator role={role}>
        <Outlet />
      </AWS_Authenticator>
    </div>
  );
}

export default Wrapper;