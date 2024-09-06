import React, { useState, useEffect, Children } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import Error401 from './pages/error/Error401';

Amplify.configure(awsconfig);

/*
  Currently, user/role list is only retrieved on component load.
  Children can force a user refetch by calling updateUser (for login/logout purposes).
  role is handled in the parent component by looking at page address.
*/

const AWS_Authenticator = (role) => { 
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState(null);

  const getCurrentUserGroupAccess = async (currentUser) => {
    // return empty array is no current user or no username property is present
    if (!!currentUser || !!currentUser.username) {
      return []
    }

    const requestData = {
      username: currentUser?.username,
    };

    // TODO: replace with a call from services when merged properly.
    try {
      const response = await fetch('https://0wr74dgf99.execute-api.us-east-2.amazonaws.com/get-users-cognito-groups-stage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.body; // Assuming data.body contains user groups
    } catch (error) {
      console.error(`Error when fetching groups for user ${currentUser?.username}:`, error);
      return []; // Return empty array on error
    }
  };

  const getUserAndGroups = async () => {
    const currentUser = await getCurrentUser();
    const currentUserGroups = await getCurrentUserGroupAccess(currentUser); // Assuming getCurrentUserGroupAccess returns user groups

    setUser(currentUser);
    setUserGroups(currentUserGroups);
    setIsLoading(false);
  }

  const userHasAccess = () => {
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
  useEffect(getUserAndGroups, []);

  return (
      isLoading
        ? <p style={{width:'100vw', height:'100vh', textAlign:'center', alignContent:'center'}}>Loading...</p>
        : userHasAccess() 
          ? <Children refetchUser={getUserAndGroups}/> 
          : <Error401 />
  )
};

export default AWS_Authenticator;