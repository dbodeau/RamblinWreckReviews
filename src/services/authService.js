import { getCurrentUser } from "@aws-amplify/auth";

export async function getCognitoUser() {
  try {
    return await getCurrentUser();
  }
  catch (error) {
    console.error(`Error when fetching current user:`, error);
    throw error;
  }
}

export async function getCognitoUserGroups(user) {
  // return empty array is no current user or no username property is present
  if (!user || !user.username) {
    console.error(`Cannot fetch groups for null user`);
    return [];
  }

  const requestData = {
    username: user.username,
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
    console.error(`Error when fetching groups for user ${user.username}:`, error);
    throw error;
  }
}
