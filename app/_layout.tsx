import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
     <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="(tabs)" />
  <Stack.Screen name="course/[id]" options={{ animation: 'slide_from_right' }} />
  <Stack.Screen name="scholarship/index" options={{ animation: 'slide_from_right' }} />
  <Stack.Screen name="scholarship/[id]" options={{ animation: 'slide_from_right' }} />
  <Stack.Screen name="scholarship/survey" options={{ animation: 'slide_from_right' }} />
  <Stack.Screen name="notifications" options={{ animation: 'slide_from_right' }} />
  <Stack.Screen
    name="comments"
    options={{
      presentation: 'transparentModal',
      animation: 'fade',
    }}
  />
  <Stack.Screen name="search" options={{ animation: 'fade' }} />
</Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}