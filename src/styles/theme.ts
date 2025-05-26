// Default font family (Montserrat)
const FONT = {
  regular: 'MontserratRegular',
  medium: 'MontserratMedium',
  semiBold: 'MontserratSemiBold',
  bold: 'MontserratBold',
};

// Alternative font family (Poppins)
const POPPINS_FONT = {
  regular: 'PoppinsRegular',
  medium: 'PoppinsMedium',
  semiBold: 'PoppinsSemiBold',
  bold: 'PoppinsBold',
};

// Legacy font family (Inter)
const INTER_FONT = {
  regular: 'InterRegular',
  medium: 'InterMedium',
  semiBold: 'InterBold',
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

const THEME = {
  mainColor: '#333C4D',
  primaryColor: '#036F3A',
  primaryColorOpacity60: '#036F3A99',

  primary: '#64748b',
  lightPrimary: 'red',
  secondary: '#367BFB',
  tertiary: '#FF7754',
  inverse: 'red',

  background: {
    primary: '#ffffff0D', //to set transparent (background of the survey)
    secondary: 'black', //to set transparent (background of the app)
  },

  text: {
    primary: '#ffffff', // '#f2f2f2', // white text also used as bg in selected options
    primaryOpacity60: '#ffffff99', // '#f2f2f2', // white text also used as bg in selected options
    secondary: '#575757',
    inverse: '#1F2937',
    tertiary: '#575757',
    myMarchePrimary: '#036F3A',
  },

  border: {
    default: 'transparent', // transparent for survey background
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

const SHADOWS = {
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
const createTheme = (fontFamily = 'default') => {
  let fontToUse = FONT; // Default Montserrat

  if (fontFamily === 'poppins') {
    fontToUse = POPPINS_FONT;
  } else if (fontFamily === 'inter') {
    fontToUse = INTER_FONT;
  }

  return {
    ...THEME,
    font: fontToUse,
    fonts: {
      default: FONT,
      poppins: POPPINS_FONT,
      inter: INTER_FONT,
    },
    sizes: SIZES,
    shadows: SHADOWS,
  };
};

// Usage example:
const useTheme = (_isDark = false, fontFamily = 'default') => {
  return createTheme(fontFamily);
};

export { useTheme, createTheme, THEME, FONT, POPPINS_FONT, INTER_FONT };
