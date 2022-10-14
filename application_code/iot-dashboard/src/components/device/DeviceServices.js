import { DataStore } from '@aws-amplify/datastore';
import { Device } from '../../models';
import { getUserHouseholdGroup } from '../AuthService';

/**
 * Create Device.
 * @param {Device} form
 * @returns {Promise<Device>}
 */
export const createDevice = async (form) => {
  const household = await getUserHouseholdGroup();
  const obj = new Device({
    ...form,
    householdId: household,
  });

  return DataStore.save(obj);
};

/**
 * Update Device.
 * @param {Device} form
 * @returns {Promise<Device>}
 */
export const updateDevice = async (form) => {
  const original = await DataStore.query(Device, form.id);

  return DataStore.save(
    Device.copyOf(original, (updated) => {
      updated.name = form.name;
      updated.information = form.information;
      updated.category = form.category;
      updated.technologyResponsibility = form.technologyResponsibility;
      updated.ECD3 = form.ECD3;
      updated.ECD4 = form.ECD4;
      updated.ECD5 = form.ECD5;
    }),
  );
};

/**
 * Fetch devices filter by the housholdId.
 * @returns {Promise<[Device]>}
 */
export const fetchDevices = async () => {
  const household = await getUserHouseholdGroup();
  return DataStore.query(Device, (c) => c.householdId('eq', household));
};

/**
 * Fetch devices filter by Id.
 * @param {String} id
 * @returns {Promise<[Device]>}
 */
export const fetchDevicesById = async (id) => DataStore.query(Device, (c) => c.id('eq', id));

/**
 * Delete a device.
 * @param {String} id - Object id
 * @returns {Promise<void>}
 */
export const deleteDevice = async (id) => {
  const modelToDelete = await DataStore.query(Device, id);
  await DataStore.delete(modelToDelete);
};
