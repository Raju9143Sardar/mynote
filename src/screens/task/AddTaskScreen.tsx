import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { AppScreens } from '../../navigation/AppScreens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { setAppbar } from '../../components/app_bar/slice/appbarSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ButtonPaper, DatePickerPaper, FullScreenLoaderPaper, InputTextPaper, SnackbarPaper, SpacerPaper, TimePickerPaper } from '../../components/material/materialComponents';
import GlobalAppbar from '../../components/app_bar/GlobalAppbar';
import useTaskViewModel from '../../features/task/viewmodel/useTaskViewModel';
import { scheduleTaskReminder } from '../../services/notificationService';


type AddTaskScreenProps = {
  navigation: NativeStackNavigationProp<AppScreens, 'AddTask'>;
};

const AddTaskScreen = ({ navigation }: AddTaskScreenProps) => {
  // Access theme if needed
  const { colors, fonts } = useTheme();
  // Loader state
  const [loading, setLoading] = useState(false);
  // Form State
  const [task, setTask] = useState('');
  const [reminderDate, setreminderDate] = useState<Date | null>(null);
  const [reminderTime, setreminderTime] = useState<Date | null>(null);
  //error state
  const [taskError, setTaskError] = useState('');
  const [reminderDateError, setreminderDateError] = useState('');
  const [reminderTimeError, setreminderTimeError] = useState('');
  // Snackbar state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

  // ViewModel for Task
  const { onAddTask } = useTaskViewModel();

  // =========================# Appbar Setup with Redux #=========================
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setAppbar({
          title: "Add Task",
          showBackButton: true,
          actions: [],
        })
      )
    }, [])
  );


  // =========================# Form Validation #=========================
  const validateForm = () => {
    let valid = true;

    // Task validation
    if (!task.trim()) {
      setTaskError('Task is required');
      valid = false;
    } else if (task.length < 3) {
      setTaskError('Task must be at least 3 characters');
      valid = false;
    } else {
      setTaskError('');
    }

    // reminderDate validation
    if (!reminderDate) {
      setreminderDateError('reminderDate is required');
      valid = false;
    } else {
      setreminderDateError('');
    }

    // reminderTime validation
    if (!reminderTime) {
      setreminderTimeError('reminderTime is required');
      valid = false;
    } else {
      setreminderTimeError('');
    }

    return valid;
  };

  // Combine reminderDate and reminderTime into a single Date object
    const getReminderDateTime = () => {
      if (!reminderDate || !reminderTime) return null;

      const combinedDateTime = new Date(reminderDate);

      combinedDateTime.setHours(
        reminderTime.getHours(),
        reminderTime.getMinutes(),
        0,
        0
      );

      return combinedDateTime;
    };

  // =========================# Add Item Handler #=========================
  const handleAddTask = async () => {
    if (!validateForm()) return;

    try {
      const reminder = getReminderDateTime();

      await onAddTask(task, reminder);


      setSnackbarMsg('Task added successfully!');
      setSnackbarType('success');
      setTask('');
      setreminderDate(null);
      setreminderTime(null);
      setSnackbarVisible(true);

      // Pause 3 seconds then go back
      setTimeout(() => {
        navigation.goBack();
      }, 3000);

    } catch (error: any) {
      console.error('Error adding task:', error);
      setSnackbarMsg('Failed to add task. Please try again.');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }

  };




  /* ###################### All styles for the AddTaskScreen component ######################
  ########################################################################################### */

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      color: colors.primary,
      fontSize: fonts.bodyMedium.fontSize,
      fontWeight: '400',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 16,
    },
  });




  /* #################################### Screen Design ########################################
     ########################################################################################### */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* ============== appbar ============= */}
      <GlobalAppbar />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        >
        {/* ============================== Task Form ================================ */}
        <SpacerPaper size={30} />
        <Text style={styles.title}>Create and manage your daily tasks easily. Set reminders, track progress, and stay organized on time.</Text>
        <SpacerPaper size={15} />

        {/* Task */}
        <InputTextPaper
          label="Task"
          placeholder="Enter Your Task"
          value={task}
          onChangeText={setTask}
          error={taskError}
        />
        <SpacerPaper size={15} />

        {/* reminderDate */}
        <DatePickerPaper
          label="Reminder Date"
          value={reminderDate}
          onChange={setreminderDate}
          placeholder="Select date"
          error={reminderDateError}
        />

        <SpacerPaper size={15} />

        {/* reminderTime */}
        <TimePickerPaper
          label="Reminder Time"
          value={reminderTime}
          onChange={setreminderTime}
          placeholder="Select time"
          error={reminderTimeError}
        />

        <SpacerPaper size={40} />

        {/* Add Task Button */}
        <ButtonPaper
          title="Add Task"
          onPress={handleAddTask}
        />

        <SpacerPaper size={10} />

        <FullScreenLoaderPaper
          visible={loading}
          size='small'
        />
        {/* Snackbar for feedback */}
        <SnackbarPaper
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          message={snackbarMsg}
          type={snackbarType}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddTaskScreen