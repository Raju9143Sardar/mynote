import { MD3DarkTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

// Custom Font Config (MD3)
const fontConfig = {
  displayLarge: { fontFamily: 'Roboto-Bold' },
  displayMedium: { fontFamily: 'Roboto-Bold' },
  displaySmall: { fontFamily: 'Roboto-Bold' },

  headlineLarge: { fontFamily: 'Roboto-Bold' },
  headlineMedium: { fontFamily: 'Roboto-Bold' },
  headlineSmall: { fontFamily: 'Roboto-Medium' },

  titleLarge: { fontFamily: 'Roboto-Medium' },
  titleMedium: { fontFamily: 'Roboto-Medium' },
  titleSmall: { fontFamily: 'Roboto-Medium' },

  labelLarge: { fontFamily: 'Roboto-Medium' },
  labelMedium: { fontFamily: 'Roboto-Regular' },
  labelSmall: { fontFamily: 'Roboto-Regular' },

  bodyLarge: { fontFamily: 'Roboto-Regular' },
  bodyMedium: { fontFamily: 'Roboto-Regular' },
  bodySmall: { fontFamily: 'Roboto-Light' },
};


//create a custom theme based on the default MD3 theme
export const darkTheme: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#6200ee',
        primaryContainer: '#7345b3',
        secondary: '#03dac6',
        tertiary: '#bbb9b9',
        error: '#cf6679',
        background: '#121212',
        surface: '#ffffff',
        onSurface: '#000000',
    },
    roundness: 6,
    
    // ✅ Apply custom fonts
  fonts: configureFonts({ config: fontConfig }),


    animation: {
        scale: 1.0,
    },
};
