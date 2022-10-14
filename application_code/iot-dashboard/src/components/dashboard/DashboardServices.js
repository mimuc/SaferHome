import { DataStore } from '@aws-amplify/datastore';
import { Dashboard, SlotType, Slot } from '../../models';
import { getUserHouseholdGroup } from '../AuthService';

/**
 * Fetch dashboards filter by ID.
 * @returns {Promise<[Dashboard]>}
 */
export const fetchDashboards = async () => {
  const household = await getUserHouseholdGroup();
  return DataStore.query(Dashboard, (c) => c.householdId('eq', household));
};

/**
 * Search dashboard by ID.
 * @param {String} id
 * @returns {Promise<[Dashboard]>}
 */
export const searchDashboardById = async (id) => {
  const household = await getUserHouseholdGroup();
  return DataStore.query(Dashboard, (c) => c.id('eq', id).householdId('eq', household));
};

/**
 * Delete a dashboard.
 * @param {String} id - Object id
 * @returns {Promise<void>}
 */
export const deleteDashboard = async (id) => {
  const modelToDelete = await DataStore.query(Dashboard, id);
  await DataStore.delete(modelToDelete);
};

/**
 * Create a dashboard Object.
 * @param {Dashboard} form - Number of slots horizontal on the board.
 * @return {Promise<Dashboard>}
 */
export const createDashboard = async (form) => {
  const household = await getUserHouseholdGroup();
  const data = [];
  const width = form.dashboardRow * form.boardRow;
  const height = form.dashboardCol * form.boardCol;
  const totalSum = width * height;

  for (let i = 0; i < totalSum; i++) {
    const slot = new Slot({
      slotType: SlotType.FLOOR,
      deviceId: null,
    });
    data.push(slot);
  }

  const dashboard = new Dashboard({
    ...form,
    householdId: household,
    data,
  });

  return DataStore.save(dashboard);
};

/**
 * Updates the slot with a new type.
 * @param {Dashboard} form
 * @return {Promise<Dashboard>}
 */
export const updateDashboard = async (form) => {
  const original = await DataStore.query(Dashboard, form.id);

  return DataStore.save(
    Dashboard.copyOf(original, (updated) => {
      updated.name = form.name;
      updated.data = form.data;
    }),
  );
};
