import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission granted');
  } else {
    console.log('Permission denied');
  }
};