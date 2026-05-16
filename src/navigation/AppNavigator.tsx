import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import TaskListScreen from '../screens/task/TaskListScreen';
import AddTaskScreen from '../screens/task/AddTaskScreen';
import { useAppSelector } from '../hooks/hooks';
import { AppScreens } from './AppScreens';



const Stack = createNativeStackNavigator<AppScreens>();

export default function AppNavigator() {
  const { isLoggedIn } =
    useAppSelector(
      state => state.auth,
    );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
          />
          <Stack.Screen
             name="AddTask"
            component={AddTaskScreen}
          />
          
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            
            <Stack.Screen
                name="SignUp"
                component={SignupScreen}
            />            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}