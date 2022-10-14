import { Auth } from 'aws-amplify';

/**
 * Check if user is member of the group.
 * @param {String} group
 * @return {Promise<Boolean>}
 */
export const checkUserIsGroupMemberOf = async (group) => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  const groups = cognitoUser.signInUserSession.accessToken.payload['cognito:groups'];
  return groups.includes(group);
};

/**
 * Get the users houshold group.
 * Returns the first element found.
 * @param {String} group
 * @return {Promise<String>} household Id
 */
export const getUserHouseholdGroup = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  const groups = cognitoUser.signInUserSession.accessToken.payload['cognito:groups'];
  const regEx = new RegExp('household_');
  return groups.find((element) => regEx.test(element));
};

/**
 * Get the AWS user ID.
 * @returns {Promise<Object>}
 */
export const getUserID = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  return cognitoUser;
};
