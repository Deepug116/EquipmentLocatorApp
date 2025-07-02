import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProviderCustom, useThemeCustom } from '../components/ThemeContext';

// AuthContext and Provider
const AuthContext = createContext({
  userToken: null as string | null,
  setUserToken: (_: string | null) => {},
  isLoading: true,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token on app start
    (async () => {
      const token = await SecureStore.getItemAsync('userToken');
      setUserToken(token);
      setIsLoading(false);
    })();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
  };

  if (!loaded || isLoading) {
    // Show splash/loading
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, isLoading, logout }}>
      <ThemeProviderCustom>
        <ThemeConsumerApp userToken={userToken} />
      </ThemeProviderCustom>
    </AuthContext.Provider>
  );
}

function ThemeConsumerApp({ userToken }: { userToken: string | null }) {
  const { theme } = useThemeCustom();
  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack key={userToken ? 'app' : 'auth'}>
        {userToken ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="AuthScreen" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
