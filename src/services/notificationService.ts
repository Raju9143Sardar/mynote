import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';




export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'task-reminder',
    name: 'Task Reminder',
    importance: AndroidImportance.HIGH,
  });
};




export const scheduleTaskReminder = async (
  taskId: string,
  task: string,
  reminderDate: string,
) => {
  try {
    const triggerDate = new Date(reminderDate);

    // Prevent past notification error
    if (triggerDate.getTime() < Date.now()) {
      console.log('Reminder date already passed');
      return;
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerDate.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        id: taskId,
        title: `Reminder for task`,
        body: `${task}`,
        android: {
          channelId: 'task-reminder',
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );

    console.log('Notification Scheduled');
  } catch (error) {
    console.log('Notification Error:', error);
  }
};

export const cancelTaskReminder = async (taskId: string) => {
  await notifee.cancelNotification(taskId);
};