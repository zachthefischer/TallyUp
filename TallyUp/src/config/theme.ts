import { DefaultTheme } from 'react-native-paper';

// Color palette inspired by modern finance apps like Robinhood, Stripe, Mercury
export const colors = {
  primary: '#6200EE',      // Primary brand color
  secondary: '#03DAC6',    // Secondary brand color
  background: '#FFFFFF',   // Main background
  surface: '#F8F9FA',      // Card/surface background
  error: '#B00020',        // Error state
  text: '#212121',         // Primary text
  textSecondary: '#757575', // Secondary text
  border: '#E0E0E0',       // Border color
  success: '#4CAF50',      // Success state
  warning: '#FFC107',      // Warning state
  info: '#2196F3',         // Info state
  
  // Finance-specific colors
  positive: '#00C853',     // Positive numbers/growth
  negative: '#D32F2F',     // Negative numbers/loss
  neutral: '#9E9E9E',      // Neutral indicators
  
  // UI element colors
  card: '#FFFFFF',
  divider: '#EEEEEE',
  disabled: '#BDBDBD',
  placeholder: '#9E9E9E',
};

// Font configuration
export const fonts = {
  regular: {
    fontFamily: 'System',
    fontWeight: 'normal' as const,
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
  },
  light: {
    fontFamily: 'System',
    fontWeight: '300' as const,
  },
  thin: {
    fontFamily: 'System',
    fontWeight: '100' as const,
  },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Create the theme
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
    text: colors.text,
    disabled: colors.disabled,
    placeholder: colors.placeholder,
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: colors.primary,
  },
  fonts,
  borderRadius,
  spacing,
  shadows,
};

export default theme;