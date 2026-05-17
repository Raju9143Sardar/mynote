import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, FlatList } from 'react-native';
import { useAuthViewModel } from '../../features/auth/viewmodel/authViewModel';
import { AppScreens } from '../../navigation/AppScreens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IconButton, List, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { setAppbar } from '../../components/app_bar/slice/appbarSlice';
import { DataNotFoundPaper, FabPaper } from '../../components/material/materialComponents';
import GlobalAppbar from '../../components/app_bar/GlobalAppbar';
import useTaskViewModel from '../../features/task/viewmodel/useTaskViewModel';
import { Task } from '../../features/task/types/taskTypes';
import TaskItem from '../../components/items/TaskItem';
import { startNetworkListener } from '../../services/networkService';
import { auth } from '../../services/firebase';
import { useAppSelector } from '../../hooks/hooks';
import { AppDispatch } from '../../store/store';





type TaskListScreenProps = {
  navigation: NativeStackNavigationProp<AppScreens, 'TaskList'>;
};



const TaskListScreen = ({ navigation }: TaskListScreenProps) => {
  // Access theme if needed
  const { colors, fonts } = useTheme();
  // ViewModel for Task
  const { tasks, loading, removeTask, loadTasks } = useTaskViewModel();
  // for task list refreshing
  const [refeshing, setRefreshing] = React.useState(true);
  // for data not found state
  const [dataNotFound, setDataNotFound] = React.useState(true);


  // refreshing task list when pull to refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadTasks();
    // simulate refresh animation
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);


  // Update dataNotFound state when tasks change
  useEffect(() => {
    setDataNotFound(tasks.length === 0);
    if (refeshing) {
      setRefreshing(false); // stop when tasks updated
    }
  }, [tasks]);


  // =========================# Appbar Setup with Redux #=========================
  const dispatch = useDispatch<AppDispatch>();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setAppbar({
          title: "Task List",
          showBackButton: false,
          actions: [{ icon: "logout", actionKey: "logout" }],
        })
      )
    }, [])
  );

  // ================== # Network changes for the current user # ==================
  const { isLoggedIn } = useAppSelector(state => state.auth) as { isLoggedIn: boolean };

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    console.log("Network listener setup: isLoggedIn=", isLoggedIn, " userId=", userId);

    if (isLoggedIn && userId) {
      startNetworkListener(userId);
    }
  }, [isLoggedIn]);

 
  /* ######################### All styles for all components this screen #########################
    ########################################################################################### */

  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      alignItems: 'center',
    },
    item: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
      //backgroundColor: colors.card,
      marginBottom: 3,
      borderRadius: 6
    },
    item_b1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
    },
    item_b2: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })



  return (
    <View style={{ flex: 1 }}>
      {/* ============== appbar ============= */}
      <GlobalAppbar />
      <View style={{ flex: 1, padding: 10 }}>
        {dataNotFound && (
          <DataNotFoundPaper
            source={require('../../asssts/animation/no_data_found.json')}
            loop={false}
          />
        )}
        {/* ======================== Task Data List ============================= */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id!}
          refreshing={loading}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Task }) => (
            console.log("Rendering item: ", item), // Debug log to check item rendering
            <TaskItem
              item={item}
              onEdit={() =>
                navigation.navigate('EditTask', { taskItem: item })
              }
              onDelete={() => removeTask(item._id) }
            />
          )}
        />

        {/* ======================== Add Task Fab ============================= */}
        <FabPaper
          icon="add"
          onPress={() => navigation.navigate('AddTask')}
          label="Add Task"
        />
      </View>
    </View>
  );
};

export default TaskListScreen;