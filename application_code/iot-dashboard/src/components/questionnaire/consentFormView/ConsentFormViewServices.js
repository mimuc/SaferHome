import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { ConsentForm } from '../../../models';

/**
 * Delete a ConsentForm.
 * @param {String} id - Object id
 * @returns {Promise<void>}
 */
export const deleteConsentForm = async (id) => {
  const modelToDelete = await DataStore.query(ConsentForm, id);
  await DataStore.delete(modelToDelete);
};

/**
 * Fetch ConsentForm filter by the userId.
 * @returns {Promise<[Questionnaire]>}
 */
export const fetchConsentForm = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  return DataStore.query(ConsentForm, (c) => c.userId('eq', cognitoUser.username));
};

/**
 * Crete new ConsentForm and save it to the backend.
 * @param {ConsentForm} consentForm
 * @returns {Promise<ConsentForm>}
 */
export const createConsentForm = async (consentForm) => {
  const cognitoUser = await Auth.currentAuthenticatedUser();

  const obj = new ConsentForm({
    ...consentForm,
    userId: cognitoUser.username,
  });

  return DataStore.save(obj);
};
