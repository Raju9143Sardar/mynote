/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets,} from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import { getApps } from '@react-native-firebase/app';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { darkTheme } from './src/theme/darkTheme';
import { theme } from './src/theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = isDarkMode ? darkTheme : theme;

  //============= check firebase connect or not ==============
  useEffect(() => {
    if (getApps().length > 0) {
      console.log("Firebase is connected to React Native!");
    } else {
      console.error("Firebase is NOT initialized.");
    }
  }, []);

  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <PaperProvider
        theme={isDarkMode ? darkTheme : theme}
        settings={{ icon: props => <MaterialIcons {...props} /> }}
      >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}  />
        <AppNavigator />
      </PaperProvider>
    </Provider>
  </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
