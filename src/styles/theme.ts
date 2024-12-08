const FONT = {
  regular: 'InterRegular',
  medium: 'InterMedium',
  bold: 'InterBold',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const LIGHT_THEME = {
  mainColor: '#333C4D',

  primary: '#333C4D',
  lightPrimary: '#64748b',
  secondary: '#367BFB',
  tertiary: '#FF7754',
  inverse: '#333C4D',

  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
  },

  text: {
    primary: '#333C4D',
    secondary: '#666666',
    tertiary: '#C1C0C8',
    inverse: '#FFFFFF',
  },

  border: {
    default: '#E5E7EB',
    secondary: '#E5E7EB',
    inverse: '#2A323C',
  },

  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
};

const DARK_THEME = {
  mainColor: '#333C4D',

  primary: '#64748b',
  lightPrimary: '#94A3B8',
  secondary: '#367BFB',
  tertiary: '#FF7754',
  inverse: '#A6ADBB',

  background: {
    primary: '#282828',
    secondary: '#121212',
  },

  text: {
    primary: '#f2f2f2',
    secondary: '#575757',
    inverse: '#1F2937',
    tertiary: '#575757',
  },

  border: {
    default: '#575757',
    secondary: '#282828',
    inverse: '#FFFFFF',
  },

  status: {
    success: '#00A96E',
    error: '#FF5761',
    warning: '#D97706',
    info: '#2563EB',
  },
};

const LIGHT_SHADOWS = {
  tiny: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1,
  },
};

// Dark theme shadows with higher opacity values but still using black
const DARK_SHADOWS = {
  tiny: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
};

// Theme interface for better type checking
const createTheme = (isDark = false) => ({
  ...(isDark ? DARK_THEME : LIGHT_THEME),
  font: FONT,
  sizes: SIZES,
  shadows: isDark ? DARK_SHADOWS : LIGHT_SHADOWS,
});

// Usage example:
const useTheme = (isDark = false) => {
  return createTheme(isDark);
};

export { useTheme, createTheme, LIGHT_THEME, DARK_THEME };
