import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppScreens } from '../../navigation/AppScreens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type AddTaskScreenProps = {
    navigation: NativeStackNavigationProp<AppScreens, 'AddTask'>;
};

const AddTaskScreen = ({ navigation }: AddTaskScreenProps) => {
  return (
    <View>
      <Text>AddTaskScreen</Text>
    </View>
  )
}

export default AddTaskScreen

const styles = StyleSheet.create({})