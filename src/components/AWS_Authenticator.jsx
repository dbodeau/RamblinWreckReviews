import React, { useState, useEffect } from 'react';
import Error401 from './pages/error/Error401';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserGroups } from '../redux/authSlice';
import { getCognitoUser, getCognitoUserGroups } from '../services/authService';

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
      const user = await getCognitoUser();
      const userGroups = await getCognitoUserGroups(user);
      dispatch(updateUser(user))
      dispatch(updateUserGroups(userGroups))
      setIsLoading(false);
    }
    catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  // get user and groups on page load
  useEffect(() => {
    getUserAndGroups();
  }, []);

  // check for access
  useEffect(() => {
  }, [role, userGroups])

  return (
      role == '' || userGroups.includes(role)
        ? <>{children}</>
        : isLoading 
          ? <p style={{width:'100vw', height:'100vh', textAlign:'center', alignContent:'center'}}>Loading...</p>
          : <Error401 />
  )
};

export default AWS_Authenticator;