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
