import Realm from 'realm';
import {TaskSchema} from './schemas/TaskSchema';

export const dbName = {
    task: 'Task',
}

export const realmConfig: Realm.Configuration = {
    schema: [TaskSchema],
    schemaVersion: 1,
};

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (!realmInstance || realmInstance.isClosed) {
    realmInstance = await Realm.open(realmConfig);
  }

  return realmInstance;
};


export const closeRealm = () => {
  if (realmInstance && !realmInstance.isClosed) {
    realmInstance.close();
    realmInstance = null;
  }
};