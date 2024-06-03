import MenuBar from './MenuBar';
import Error401 from './Error401';
import './css/Admin_Home.css';
import React, { useEffect, useState } from 'react';
import AuthStatusEnum from './AuthStatusEnum';

export default function Admin_Home() {
  const [authorized, setAuthorized] = useState(false); //Authorization Status to see this page

  /*
  Fetches current user group access from Cognito
  */
  async function getCurrentUserGroupAccess(){
    //Replace this with logic to get/verify current user to pass to cogito-group-api
    const passwordInput = "NewPassword1$";
    const usernameInput = "cnash@mines.edu";
    const requestData = {
      username: usernameInput,
      password: passwordInput
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
        setAuthorized(data.body.includes(AuthStatusEnum.ADMIN));
        return data;
      })
    } catch (error) {
      console.error('Error: ', error);
      return null;
    }
  }
  
  useEffect(() => {
    try{
      getCurrentUserGroupAccess();
    }
    catch (error){
      console.error('Error: ', error);
    }
  }, []);

  return (
    <div>
      {authorized === null ? (  // Check for null state while fetching
      <div>Loading...</div>
    ) : authorized ? (
        // Display your protected content here
        <>
        <link rel="stylesheet" href="style.css" />
        <body>
          <div className='admin-home-content-container'>
            {<MenuBar />}
            <div className="admin-home-welcomeText"><h1>Welcome to the admin home page</h1></div>
          </div>
        </body>
        </>
      ) : (
        <Error401 />
      )}
    </div>
  );
}