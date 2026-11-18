import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { setupNotifications } from '../utils/notifications';
import { colors } from '../utils/theme';

export default function RootLayout() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bgTop },
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: colors.bgBottom },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="new-task" options={{ title: 'Nueva tarea', presentation: 'modal' }} />
      </Stack>
    </>
  );
}
