import { getRealm, dbName } from '../../../database/realm';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/taskTypes';
import { scheduleTaskReminder, cancelTaskReminder, } from '../../../services/notificationService';


//================= add Task ====================
export const addTask = async (title: string, reminderDate: Date | null) => {
    const realm = await getRealm();
    // Create task object
    const task = {
        _id: uuidv4(),
        title,
        reminder: reminderDate,
        completed: false,
        synced: false,
        updatedAt: new Date(),
    };

    // Print object
    console.log('Task Object =>', task);

    realm.write(async () => {
        realm.create(dbName.task, task);

        // ====== # set schedule local notification # ======
        if (task.reminder) {
            await scheduleTaskReminder(
                task._id,
                task.title,
                task.reminder.toISOString(),
            );
        }
    });
};




//================= get Task List ====================
export const getTasks = async () => {
    const realm = await getRealm();
    return realm.objects(dbName.task).sorted('updatedAt', true);
};


//================= update Task ====================
export const updateTask = async (
    id: string,
    data: Partial<Task>
) => {
    const realm = await getRealm();

    realm.write(() => {
        const task = realm.objectForPrimaryKey<Task>(
            dbName.task,
            id
        );

        if (!task) return;

        const cleanData = Object.fromEntries(
            Object.entries(data).filter(
                ([_, value]) => value !== undefined
            )
        );

        Object.assign(task, cleanData, {
            updatedAt: new Date(),
        });
    });

    //======= # Cancel old notification #=======
    await cancelTaskReminder(id);

    //======# Schedule new notification if reminder is updated #======
    if (data.reminder) {
        await scheduleTaskReminder(
            id,
            data.title ?? '',
            data.reminder.toISOString(),
        );
    }
};


//================= delete Task ====================
export const deleteTask = async (id: string) => {
    const realm = await getRealm();
    realm.write(() => {
        const task = realm.objectForPrimaryKey(dbName.task, id);

        if (task) {
            realm.delete(task);
        }
    });

    //======# remove notification #======
    await cancelTaskReminder(id);
};