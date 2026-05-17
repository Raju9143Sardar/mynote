import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { AppScreens } from '../../navigation/AppScreens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { setAppbar } from '../../components/app_bar/slice/appbarSlice';
import { useDispatch } from 'react-redux';
import {
  ButtonPaper,
  DatePickerPaper,
  FullScreenLoaderPaper,
  InputTextPaper,
  SnackbarPaper,
  SpacerPaper,
  TimePickerPaper,
} from '../../components/material/materialComponents';
import GlobalAppbar from '../../components/app_bar/GlobalAppbar';
import useTaskViewModel from '../../features/task/viewmodel/useTaskViewModel';

type EditTaskScreenProps = {
  navigation: NativeStackNavigationProp<AppScreens, 'EditTask'>;
};

type EditTaskRouteProp = RouteProp<AppScreens, 'EditTask'>;

const EditTaskScreen = ({ navigation }: EditTaskScreenProps) => {
  // =========================# Theme #=========================
  const { colors, fonts } = useTheme();

  // =========================# Route Params #=========================
  const route = useRoute<EditTaskRouteProp>();
  const { taskItem } = route.params;

  // =========================# Loader State #=========================
  const [loading, setLoading] = useState(false);

  // =========================# Form State #=========================
  const [task, setTask] = useState('');
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [reminderTime, setReminderTime] = useState<Date | null>(null);

  // =========================# Error State #=========================
  const [taskError, setTaskError] = useState('');
  const [reminderDateError, setReminderDateError] = useState('');
  const [reminderTimeError, setReminderTimeError] = useState('');

  // =========================# Snackbar State #=========================
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarType, setSnackbarType] = useState<
    'success' | 'error'
  >('success');

  // =========================# ViewModel #=========================
  const { onUpdateTask } = useTaskViewModel();

  // =========================# Redux Dispatch #=========================
  const dispatch = useDispatch();

  // =========================# Appbar Setup #=========================
  useFocusEffect(
    useCallback(() => {
      dispatch(
        setAppbar({
          title: 'Edit Task',
          showBackButton: true,
          actions: [],
        }),
      );
    }, []),
  );

  // =========================# Set Existing Data #=========================
  useEffect(() => {
    if (taskItem) {
      setTask(taskItem.title);

      if (taskItem.reminder) {
        const reminder = new Date(taskItem.reminder);

        setReminderDate(reminder);
        setReminderTime(reminder);
      }
    }
  }, [taskItem]);

  // =========================# Form Validation #=========================
  const validateForm = () => {
    let valid = true;

    // Task validation
    if (!task.trim()) {
      setTaskError('Task is required');
      valid = false;
    } else if (task.trim().length < 3) {
      setTaskError('Task must be at least 3 characters');
      valid = false;
    } else {
      setTaskError('');
    }

    // Date validation
    if (!reminderDate) {
      setReminderDateError('Reminder date is required');
      valid = false;
    } else {
      setReminderDateError('');
    }

    // Time validation
    if (!reminderTime) {
      setReminderTimeError('Reminder time is required');
      valid = false;
    } else {
      setReminderTimeError('');
    }

    return valid;
  };

  // =========================# Combine Date & Time #=========================
  const getReminderDateTime = () => {
    if (!reminderDate || !reminderTime) return null;

    const combinedDateTime = new Date(reminderDate);

    combinedDateTime.setHours(
      reminderTime.getHours(),
      reminderTime.getMinutes(),
      0,
      0,
    );

    return combinedDateTime;
  };

  // =========================# Update Task Handler #=========================
  const handleUpdateTask = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const reminder = getReminderDateTime();

      await onUpdateTask({
        id: taskItem._id,
        title: task,
        reminder: reminder,
      });

      setSnackbarMsg('Task updated successfully!');
      setSnackbarType('success');
      setSnackbarVisible(true);

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      console.log('Update Task Error:', error);

      setSnackbarMsg('Failed to update task');
      setSnackbarType('error');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // =========================# Styles #=========================
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
  });

  // =========================# UI #=========================
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      
      {/* Appbar */}
      <GlobalAppbar />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">

        <SpacerPaper size={30} />

        <Text style={styles.title}>**Edit Your Task**
Update your task details, change reminders, and keep your schedule up to date easily.
</Text>

        <SpacerPaper size={15} />

        {/* Task Input */}
        <InputTextPaper
          label="Task"
          placeholder="Enter Your Task"
          value={task}
          onChangeText={setTask}
          error={taskError}
        />

        <SpacerPaper size={15} />

        {/* Reminder Date */}
        <DatePickerPaper
          label="Reminder Date"
          value={reminderDate}
          onChange={setReminderDate}
          placeholder="Select date"
          error={reminderDateError}
        />

        <SpacerPaper size={15} />

        {/* Reminder Time */}
        <TimePickerPaper
          label="Reminder Time"
          value={reminderTime}
          onChange={setReminderTime}
          placeholder="Select time"
          error={reminderTimeError}
        />

        <SpacerPaper size={40} />

        {/* Update Button */}
        <ButtonPaper
          title="Update Task"
          onPress={handleUpdateTask}
        />

        <SpacerPaper size={10} />

        {/* Loader */}
        <FullScreenLoaderPaper
          visible={loading}
          size="small"
        />

        {/* Snackbar */}
        <SnackbarPaper
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          message={snackbarMsg}
          type={snackbarType}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditTaskScreen;