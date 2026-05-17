import { getRealm, dbName } from '../../../database/realm';
import firestore from '@react-native-firebase/firestore';

/** 
 * Pushes unsynced tasks from Realm to Firestore
 * 
 * @param userId 
 * @returns 
 */
export const syncPushTasks = async (userId: string) => {
  const realm = await getRealm();

  try {
    // 1. Get unsynced tasks
    const unsyncedTasks = realm
      .objects(dbName.task)
      .filtered('synced == false');

    if (unsyncedTasks.length === 0) {
      console.log('No unsynced tasks');
      return;
    }

    // Convert Realm objects to plain JS array
    const tasks = Array.from(unsyncedTasks).map(task => ({
      _id: task._id,
      title: task.title,
      reminder: task.reminder || null,
      completed: task.completed,
      updatedAt: task.updatedAt,
    }));

    // 2. Firestore batch
    const batch = firestore().batch();

    for (const task of tasks) {
      const docRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(String(task._id));

      batch.set(docRef, {
        ...task,
        synced: true,
      });
    }

    // 3. Upload to Firestore
    await batch.commit();

    // 4. Update Realm after successful sync
    realm.write(() => {
      for (const task of unsyncedTasks) {
        task.synced = true;
      }
    });

    console.log(`Successfully synced ${tasks.length} tasks`);
  } catch (error) {
    console.log('SYNC ERROR:', error);
  }
};