import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { triggerAction } from '../app_bar/slice/appbarSlice';

const GlobalAppbar = () => {
  const { colors, fonts } = useTheme(); // Access theme if needed

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { title, showBackButton, actions } = useSelector(
    (state: any) => state.appbar
  );

  return (
    <Appbar.Header
      mode="center-aligned"   //  Material 3 style
      //elevated               //  shadow (optional)
      //style={{ backgroundColor: colors.background }}  // use theme color
    >
      {showBackButton && <Appbar.BackAction onPress={() => navigation.goBack()}  color={colors.tertiary}/>}

      <Appbar.Content title={title}  color={colors.primary} titleStyle = {{ fontSize: fonts.headlineSmall.fontSize, fontWeight: 'bold' }} />

      {actions.map((item: any, index: number) => (
        <Appbar.Action
          key={index}
          icon={item.icon}
          color={colors.tertiary}
          onPress={() => dispatch(triggerAction(item.actionKey))} // middleware handles
        />
      ))}
    </Appbar.Header>
  );
};

export default GlobalAppbar;