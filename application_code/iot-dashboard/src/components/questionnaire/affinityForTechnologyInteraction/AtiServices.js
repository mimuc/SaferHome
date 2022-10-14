import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Questionnaire } from '../../../models';
import { getUserHouseholdGroup } from '../../AuthService';

/**
 * Delete a questionnaire.
 * @param {String} id - Object id
 * @returns {Promise<void>}
 */
export const deleteAtiQuestionnaire = async (id) => {
  const modelToDelete = await DataStore.query(Questionnaire, id);
  await DataStore.delete(modelToDelete);
};

/**
 * Fetch questionnaire filter by the userId.
 * @returns {Promise<[Questionnaire]>}
 */
export const fetchAtiQuestionnaires = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  return DataStore.query(Questionnaire, (c) => c.userId('eq', cognitoUser.username));
};

/**
 * Crete new Questionnaire and save it to the backend.
 * @param {Questionnaire} questionnaire
 * @returns {Promise<Questionnaire>}
 */
export const createAtiQuestionnaire = async (questionnaire) => {
  const household = await getUserHouseholdGroup();
  const cognitoUser = await Auth.currentAuthenticatedUser();

  const obj = new Questionnaire({
    ...questionnaire,
    householdId: household,
    userId: cognitoUser.username,
  });

  return DataStore.save(obj);
};
