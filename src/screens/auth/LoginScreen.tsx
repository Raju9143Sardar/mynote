import React, { useCallback, useState } from 'react';
import { View, TextInput, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useAuthViewModel } from '../../features/auth/viewmodel/authViewModel';
import { Text, useTheme } from 'react-native-paper';
import { AppScreens } from '../../navigation/AppScreens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setAppbar } from '../../components/app_bar/slice/appbarSlice';
import GlobalAppbar from '../../components/app_bar/GlobalAppbar';
import { useFocusEffect } from '@react-navigation/native';
import { ButtonPaper, FullScreenLoaderPaper, InputPasswordPaper, InputTextPaper, SnackbarPaper, SpacerPaper } from '../../components/material/materialComponents';




type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AppScreens, 'Login'>;
};


const LoginScreen = ({ navigation }: LoginScreenProps) => {
  // Access theme if needed
  const { colors, fonts } = useTheme();
  // loader
  const [loading, setLoading] = useState(false);
  // field state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // Snackbar state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');


  const { login } = useAuthViewModel();

  //=====================# App Bar #====================
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setAppbar({
          title: "Login",
          showBackButton: false,
          actions: [],
        })
      )
    }, [])
  );


  // =========================# Form Validation #=========================
  const validateForm = () => {
    let valid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }

    return valid;
  };

  // =========================# Add Item Handler #=========================
  const handleAddItem = async () => {
    if (!validateForm()) return;

    setLoading(true);


    const result = await login(email, password);
    if (result.success) {
      setSnackbarMsg('Signup successfully!');
      setSnackbarType('success');

      setEmail(''); // Clear input after adding
      setPassword(''); // Clear input after adding
    } else {
      setSnackbarMsg(result.message);
      setSnackbarType('error');
    }

    setLoading(false);
    setSnackbarVisible(true);

  };


  /* ######################### All styles for the HomeScreen component #########################
    ########################################################################################### */

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      color: colors.primary,
      fontSize: fonts.titleLarge.fontSize,
      fontWeight: '200',
      marginBottom: 10,
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 16,
    },
    subtext: {
      color: colors.outline,
      fontSize: fonts.bodyLarge.fontSize,
      marginBottom: 10,
      alignItems: 'center'
    }
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
        keyboardShouldPersistTaps="handled">
        {/* ============================== Student Form ================================ */}
        <SpacerPaper size={30} />
        <Text style={styles.title}>Student Form</Text>
        <SpacerPaper size={15} />

        {/* Email */}
        <InputTextPaper
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          error={emailError}
        />

        {/* Password */}
        <InputPasswordPaper
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
        />


        <SpacerPaper size={30} />
        {/* Add Login Button */}
        <ButtonPaper
          title="Login"
          onPress={handleAddItem}
        />

        <SpacerPaper size={30} />
        {/* Login Text */}

        <Text
          style={styles.subtext}
          onPress={() => navigation.navigate('SignUp')}
        >Create an account? SignUp</Text>

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

    // <View style={{ padding: 20 }}>
    //   <TextInput
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //   />

    //   <TextInput
    //     placeholder="Password"
    //     value={password}
    //     secureTextEntry
    //     onChangeText={setPassword}
    //   />

    //   <Button
    //     title="Login"
    //     onPress={() =>
    //       login(email, password)
    //     }
    //   />
    // </View>
  );
};

export default LoginScreen;