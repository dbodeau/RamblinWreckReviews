import React, { useState, useEffect } from 'react';
import Error401 from './pages/error/Error401';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserGroups } from '../redux/authSlice';
import { getCognitoUser } from '../services/authService';

/*
  Currently, user/role list is only retrieved on component load.
  Children can force a user refetch by calling updateUser (for login/logout purposes).
  role is handled in the parent component by looking at page address.
*/

const AWS_Authenticator = ({role, children}) => { 
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [userHasAccess, setUserHasAccess] = useState(false);
  
  const userGroups = useSelector((state => state.auth.userGroups));
  const dispatch = useDispatch();

  const getUserAndGroups = async () => {
    try {
      const user = await getCognitoUser();
      const userGroups = await getCognitoUserGroups(user);
      dispatch(updateUserGroups(user))
      dispatch(updateUserGroups(userGroups))
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getUserAccess = () => {
    console.log(role);
    if(role == '') {
      return true;
    }
    else if (isLoading) {
      return false;
    }
    else {
      return userGroups.includes(role);
    }
  }

  // get user and groups on page load
  useEffect(() => {
    getUserAndGroups()
    setUserHasAccess(getUserAccess);
  }, []);

  // check for access
  useEffect(() => {
    setUserHasAccess(getUserAccess);
  }, [role, userGroups])

  return (
      userHasAccess
        ? <>{children}</>
        : isLoading 
          ? <p style={{width:'100vw', height:'100vh', textAlign:'center', alignContent:'center'}}>Loading...</p>
          : <Error401 />
  )
};

export default AWS_Authenticator;