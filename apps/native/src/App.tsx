import * as React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuthState, useAuth } from 'modules/auth';
import { NativeBaseProvider, extendTheme, theme as nbTheme, Text } from 'native-base';
import { SignInScreen } from 'screens/auth/SignIn';
import { HomeScreen } from 'screens/Home';
import { ProfileScreen } from 'screens/Profile';

// SplashScreen.preventAutoHideAsync();

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const scheme = useColorScheme();

  const [authState, dispatch] = useAuthState();

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  React.useEffect(() => {
    if (authState.isLoading === false) {
      setAppIsReady(true);
    }
  }, [authState]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider
      theme={nbTheme}
      colorModeManager={{ get: () => Promise.resolve(scheme), set: () => undefined }}
    >
      <NavigationContainer
        theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        onReady={onLayoutRootView}
      >
        <AuthProvider dispatch={dispatch}>
          <MainStack.Navigator>
            {authState.userToken ? (
              <MainStack.Group>
                <MainStack.Screen name="MainTabs" options={{ headerShown: false }}>
                  {() => (
                    <Tabs.Navigator>
                      <Tabs.Screen name="Home" component={HomeScreen} />
                      <Tabs.Screen name="Profile" component={ProfileScreen} />
                    </Tabs.Navigator>
                  )}
                </MainStack.Screen>
              </MainStack.Group>
            ) : (
              <MainStack.Group
                screenOptions={{
                  presentation: 'modal',
                  headerShown: false,
                  animationEnabled: false,
                }}
              >
                <MainStack.Screen name="SignIn" component={SignInScreen} />
              </MainStack.Group>
            )}
          </MainStack.Navigator>
        </AuthProvider>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

registerRootComponent(App);
