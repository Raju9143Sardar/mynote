import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '../../../services/firebase';

export const signupApi = async (
  email: string,
  password: string,
) => {
   //console.log(`email: ${email}, Password: ${password}`);
  return await auth.createUserWithEmailAndPassword(
    email,
    password,
  );
};

export const loginApi = async (
  email: string,
  password: string,
) => {
  return await auth.signInWithEmailAndPassword(
    email,
    password,
  );
};

export const logoutApi = async () => {
  return await auth.signOut();
};