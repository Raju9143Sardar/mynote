import NetInfo from '@react-native-community/netinfo';
import { syncPushTasks } from '../features/task/api/syncPushTaskApi';
import { syncPullTasks } from '../features/task/api/syncPullTaskApi';


export const startNetworkListener = (userId: string) => {
  NetInfo.addEventListener(async state => {
    if (state.isConnected) {
    //==  Sync tasks when network is back ==
      await syncPushTasks(userId);  // Push local changes to Firestore

      await syncPullTasks(userId); // Pull Firestore changes to Realm
    }
  });
};