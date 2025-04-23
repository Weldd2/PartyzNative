import useThemeColors from '@/hooks/useThemeColors';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { queryClient } from '@/hooks/queryClient';

export default function RootLayout() {
  const Colors = useThemeColors();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor={Colors.greyWhite} />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
