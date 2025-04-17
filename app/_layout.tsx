import useThemeColors from '@/hooks/useThemeColors';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  const Colors = useThemeColors();
  return (
    <>
      <StatusBar backgroundColor={Colors.greyWhite} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
