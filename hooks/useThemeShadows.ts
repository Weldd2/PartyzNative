import { Shadows } from '@/constants/Shadows';
import { useColorScheme } from 'react-native';

export default function useThemeShadows() {
  const theme = useColorScheme() ?? 'light';
  return Shadows[theme];
}
