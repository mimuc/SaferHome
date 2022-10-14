import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum SlotType {
  WALL = "WALL",
  FLOOR = "FLOOR",
  IOTSENSOR = "IOTSENSOR",
  DOOR = "DOOR"
}

export enum CategoryType {
  VOICEASSISTENT = "VOICEASSISTENT",
  TEMPERATURESENSOR = "TEMPERATURESENSOR",
  OTHER = "OTHER",
  LIGHTSENSOR = "LIGHTSENSOR"
}

export declare class Rating {
  readonly userId?: string;
  readonly scale?: number;
  readonly phase?: number;
  constructor(init: ModelInit<Rating>);
}

export declare class Slot {
  readonly deviceId?: string;
  readonly slotType: SlotType | keyof typeof SlotType;
  constructor(init: ModelInit<Slot>);
}

export declare class ConsentForm {
  readonly id: string;
  readonly userId: string;
  readonly accepted: boolean;
  constructor(init: ModelInit<ConsentForm>);
  static copyOf(source: ConsentForm, mutator: (draft: MutableModel<ConsentForm>) => MutableModel<ConsentForm> | void): ConsentForm;
}

export declare class Questionnaire {
  readonly id: string;
  readonly householdId: string;
  readonly userId: string;
  readonly gender?: string;
  readonly age?: number;
  readonly professionalBackground?: string;
  readonly ATI1?: number;
  readonly ATI2?: number;
  readonly ATI3?: number;
  readonly ATI4?: number;
  readonly ATI5?: number;
  readonly ATI6?: number;
  readonly ATI7?: number;
  readonly ATI8?: number;
  readonly ATI9?: number;
  constructor(init: ModelInit<Questionnaire>);
  static copyOf(source: Questionnaire, mutator: (draft: MutableModel<Questionnaire>) => MutableModel<Questionnaire> | void): Questionnaire;
}

export declare class Device {
  readonly id: string;
  readonly householdId: string;
  readonly name: string;
  readonly information?: string;
  readonly category: CategoryType | keyof typeof CategoryType;
  readonly privacyLevel?: number;
  readonly securityLevel?: number;
  readonly message?: string;
  readonly technologyResponsibility?: (Rating | null)[];
  readonly ECD3?: (Rating | null)[];
  readonly ECD4?: (Rating | null)[];
  readonly ECD5?: (Rating | null)[];
  constructor(init: ModelInit<Device>);
  static copyOf(source: Device, mutator: (draft: MutableModel<Device>) => MutableModel<Device> | void): Device;
}

export declare class Dashboard {
  readonly id: string;
  readonly householdId: string;
  readonly name?: string;
  readonly dashboardRow?: number;
  readonly dashboardCol?: number;
  readonly boardRow?: number;
  readonly boardCol?: number;
  readonly data?: (Slot | null)[];
  constructor(init: ModelInit<Dashboard>);
  static copyOf(source: Dashboard, mutator: (draft: MutableModel<Dashboard>) => MutableModel<Dashboard> | void): Dashboard;
}