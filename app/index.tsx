import { StyleSheet, View } from 'react-native';
import useThemeColors from '@/hooks/useThemeColors';
import { useFonts } from 'expo-font';
import Home from './Home';

export default function Index() {
  const colors = useThemeColors();
  const [loaded] = useFonts({
    HossRound: require('../assets/fonts/Hoss Round-Medium.otf'),
    HossRoundBlack: require('../assets/fonts/Hoss Round-Black.otf'),
  });
  if (!loaded) return null;
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
