import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function useThemeColors() {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme];
}
