import { Stack } from 'expo-router';
import useThemeColors from '@/hooks/useThemeColors';

export default function AuthLayout() {
  const Colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.greyWhite },
      }}
    />
  );
}
