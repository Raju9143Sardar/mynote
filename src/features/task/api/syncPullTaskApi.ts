import firestore from '@react-native-firebase/firestore';
import Realm from 'realm';
import { getRealm, dbName } from '../../../database/realm';


/** When Firestore task is changes then this api will sync to Realm
 * 1. Listen to Firestore task collection changes
 * 2. Sync Firestore data to Realm
 * @param userId 
 * @returns 
 */
export const syncPullTasks = async (userId: string) => {
  const realm = await getRealm();

  return firestore()
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .onSnapshot(snapshot => {
      // Sync Firestore data to Realm
      realm.write(() => {
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          // Create or update the task in Realm
          realm.create(
            dbName.task,{
              _id: doc.id,
              title: data.title,
              completed: data.completed,
              synced: true,
              updatedAt: data.updatedAt.toDate(),
            },
            Realm.UpdateMode.Modified,
          );
        });
      });
    });
};