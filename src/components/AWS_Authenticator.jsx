import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import Error401 from './pages/error/Error401';

Amplify.configure(awsconfig);

let isAuthenticated = false; //Determines auth status both signed in user and page access

const AWS_Authenticator = (WrappedComponent, pageAccessType) => { 
  return (props) => {
    const [isLoading, setIsLoading] = useState(true); // Initial loading state

    const checkAuthStatus = async () => {
      try {
        const currentUser = await getCurrentUser();
        const userGroups = await getCurrentUserGroupAccess(currentUser); // Assuming getCurrentUserGroupAccess returns user groups

        if (userGroups.includes(pageAccessType)) {
          isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Set loading to false after all operations
      }
    };

    const getCurrentUserGroupAccess = async (currentUser) => {
      const requestData = {
        username: currentUser.username,
      };

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
        console.error('Error:', error);
        return []; // Return empty array on error
      }
    };

    useEffect(() => {
      checkAuthStatus();
    }, []);

    if (isLoading) {
      return <p style={{width:'100vw', height:'100vh', textAlign:'center', alignContent:'center'}}>Loading...</p>; // Display loading indicator while checking
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : <Error401 />;
  };

  return AuthenticatorWrapper;
};

export default AWS_Authenticator;