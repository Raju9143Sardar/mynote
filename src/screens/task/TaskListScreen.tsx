import React, { useCallback } from 'react';
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

type TaskListScreenProps = {
  navigation: NativeStackNavigationProp<AppScreens, 'TaskList'>;
};

const TaskListScreen = ({ navigation }: TaskListScreenProps) => {
  // Access theme if needed
  const { colors, fonts } = useTheme();

  const { logout } = useAuthViewModel();


  // =========================# Appbar Setup with Redux #=========================
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setAppbar({
          title: "Task List",
          showBackButton: false,
          actions: [{ icon: "logout", actionKey: "logout"}],
        })
      )
    }, [])
  );

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
      backgroundColor: colors.card,
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
        {/* {dataNotFound && (
          <DataNotFoundPaper
            source={require('../../asssts/animation/no_data_found.json')}
            loop={false}
          />
        )} */}
        {/* ======================== Student Data List ============================= */}
        {/* <FlatList
          data={students}
          keyExtractor={(item) => item.firebaseKey!}
          refreshing={refeshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Student }) => (
            console.log("Rendering item: ", item), // Debug log to check item rendering
            <List.Item
              style={styles.item}
              title={item.name}
              description={
                item.email + ", "
                + item.gender + ", "
                + (item.college ? item.college : "No College") + ", "
              }
              left={(props) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <List.Icon {...props} icon="person" />
                </View>
              )}
              right={(props) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 80, justifyContent: 'space-between' }}>
                  <IconButton icon="mode-edit" onPress={() => { }} />
                  <IconButton
                    {...props}
                    icon="delete"
                    iconColor="red"
                    onPress={() => deleteUserDataFirebase(item.firebaseKey!)}
                  />
                </View>
              )}
            />
          )}
        /> */}

        {/* ======================== Add Student Fab ============================= */}
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