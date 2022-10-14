// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SlotType = {
  "WALL": "WALL",
  "FLOOR": "FLOOR",
  "IOTSENSOR": "IOTSENSOR",
  "DOOR": "DOOR"
};

const CategoryType = {
  "VOICEASSISTENT": "VOICEASSISTENT",
  "TEMPERATURESENSOR": "TEMPERATURESENSOR",
  "OTHER": "OTHER",
  "LIGHTSENSOR": "LIGHTSENSOR"
};

const { ConsentForm, Questionnaire, Device, Dashboard, Rating, Slot } = initSchema(schema);

export {
  ConsentForm,
  Questionnaire,
  Device,
  Dashboard,
  SlotType,
  CategoryType,
  Rating,
  Slot
};