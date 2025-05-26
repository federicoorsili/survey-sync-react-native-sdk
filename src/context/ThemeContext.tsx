import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { useTheme } from '../styles/theme';

type FontFamily = 'default' | 'poppins' | 'inter';

const ThemeContext = createContext({
  isDark: false,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  theme: useTheme(false),
  toggleTheme: () => {},
  fontFamily: 'default' as FontFamily,
  setFontFamily: (_fontFamily: FontFamily) => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: 'dark' | 'light';
  initialFontFamily?: FontFamily;
}

export const ThemeProvider = ({
  children,
  customTheme,
  initialFontFamily = 'default',
}: ThemeProviderProps) => {
  const deviceTheme = useColorScheme();

  const initialIsDark =
    customTheme === 'dark'
      ? true
      : customTheme === 'light'
        ? false
        : deviceTheme === 'dark';

  const [isDark, setIsDark] = useState(initialIsDark);
  const [fontFamily, setFontFamily] = useState<FontFamily>(initialFontFamily);

  const theme = useTheme(isDark, fontFamily);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleSetFontFamily = useCallback((newFontFamily: FontFamily) => {
    setFontFamily(newFontFamily);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme,
        toggleTheme,
        fontFamily,
        setFontFamily: handleSetFontFamily,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
