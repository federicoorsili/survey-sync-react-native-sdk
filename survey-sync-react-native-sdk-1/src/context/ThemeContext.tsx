import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { useTheme } from '../styles/theme';

const ThemeContext = createContext({
  isDark: false,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  theme: useTheme(false),
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: 'dark' | 'light';
}

export const ThemeProvider = ({
  children,
  customTheme,
}: ThemeProviderProps) => {
  const deviceTheme = useColorScheme();

  const initialIsDark =
    customTheme === 'dark'
      ? true
      : customTheme === 'light'
        ? false
        : deviceTheme === 'dark';

  const [isDark, setIsDark] = useState(initialIsDark);

  const theme = useTheme(isDark);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
