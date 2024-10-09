import React, { useState, useEffect } from 'react';
import Error401 from './pages/error/Error401';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserGroups } from '../redux/authSlice';
import { getCognitoUser } from '../services/authService';
import { getCurrentUser } from '../services/service';
import AuthStatusEnum from '../types/AuthStatusEnum';
import { redirect } from 'react-router-dom';

/*
  Currently, user/role list is only retrieved on component load.
  role is handled in the parent component by looking at page address.
*/

const AWS_Authenticator = ({role, children}) => { 
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  
  const userGroups = useSelector((state => state.auth.userGroups));
  const dispatch = useDispatch();

  const getUserAndGroups = async () => {
    try {
      const cUser = await getCognitoUser();
    }
    catch (err) {
      console.log("User not logged in");
      setIsLoading(false);
      redirect('/login');
    }
    try{
      const user = await getCurrentUser();
      dispatch(updateUser(user));
      const groups = rolesToUserGroups(user);
      dispatch(updateUserGroups(groups))
      setIsLoading(false);
    }
    catch (error) {
      dispatch(updateUserGroups([]))
      console.error(error);
      setIsLoading(false);
    }
  }

  const rolesToUserGroups = (user) => {
    const roles = user.roles.map(role => role.user_type);
    const groups = [];
    if(roles.includes('admin')) {
      groups.push(AuthStatusEnum.ADMIN);
      groups.push(AuthStatusEnum.SUPERUSER)
    }
    else if (roles.includes('prof') || roles.includes('ta')) {
      groups.push(AuthStatusEnum.SUPERUSER)
    }
    if (roles.includes('student')) {
      groups.push(AuthStatusEnum.STUDENT)
    }
    return groups;
  }

  // get user and groups on page load
  useEffect(() => {
    getUserAndGroups();
  }, []);

  return (
      role == '' || userGroups.includes(role)
        ? <>{children}</>
        : isLoading 
          ? <p style={{width:'100vw', height:'100vh', textAlign:'center', alignContent:'center'}}>Loading...</p>
          : <Error401 />
  )
};

export default AWS_Authenticator;