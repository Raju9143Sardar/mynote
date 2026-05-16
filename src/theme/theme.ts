import { MD3LightTheme as DefaultTheme, MD3Theme, configureFonts} from "react-native-paper";


// Custom Font Config (MD3)
const fontConfig = {
  displayLarge: {
    ...DefaultTheme.fonts.displayLarge,
    fontFamily: 'Roboto-Bold',
  },
  displayMedium: {
    ...DefaultTheme.fonts.displayMedium,
    fontFamily: 'Roboto-Bold',
  },
  displaySmall: {
    ...DefaultTheme.fonts.displaySmall,
    fontFamily: 'Roboto-Bold',
  },

  headlineLarge: {
    ...DefaultTheme.fonts.headlineLarge,
    fontFamily: 'Roboto-Bold',
  },
  headlineMedium: {
    ...DefaultTheme.fonts.headlineMedium,
    fontFamily: 'Roboto-Bold',
  },
  headlineSmall: {
    ...DefaultTheme.fonts.headlineSmall,
    fontFamily: 'Roboto-Medium',
  },

  titleLarge: {
    ...DefaultTheme.fonts.titleLarge,
    fontFamily: 'Roboto-Medium',
  },
  titleMedium: {
    ...DefaultTheme.fonts.titleMedium,
    fontFamily: 'Roboto-Medium',
  },
  titleSmall: {
    ...DefaultTheme.fonts.titleSmall,
    fontFamily: 'Roboto-Medium',
  },

  labelLarge: {
    ...DefaultTheme.fonts.labelLarge,
    fontFamily: 'Roboto-Medium',
  },
  labelMedium: {
    ...DefaultTheme.fonts.labelMedium,
    fontFamily: 'Roboto-Regular',
  },
  labelSmall: {
    ...DefaultTheme.fonts.labelSmall,
    fontFamily: 'Roboto-Regular',
  },

  bodyLarge: {
    ...DefaultTheme.fonts.bodyLarge,
    fontFamily: 'Roboto-Regular',
  },
  bodyMedium: {
    ...DefaultTheme.fonts.bodyMedium,
    fontFamily: 'Roboto-Regular',
  },
  bodySmall: {
    ...DefaultTheme.fonts.bodySmall,
    fontFamily: 'Roboto-Light',
  },
};


//create a custom theme based on the default MD3 theme
export const theme: MD3Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee',
        primaryContainer: '#d5bcfc', // 30% opacity for light theme
        secondary: '#03dac6',
        tertiary: '#353535',
        error: '#cf6679',
        background: '#f5f5f5',
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
