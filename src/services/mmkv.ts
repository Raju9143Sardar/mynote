import { createMMKV, } from 'react-native-mmkv';

export const storage = createMMKV();


export const setToken = (token: string) => {
  storage.set('userToken', token);
};

export const getToken = () => {
  return storage.getString('userToken');
};

export const removeToken = () => {
  storage.remove('userToken');
};