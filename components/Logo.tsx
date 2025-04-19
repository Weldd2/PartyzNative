import { View, StyleSheet, Image } from 'react-native';
import ThemedText from './ThemedText';
import useThemeColors from '@/hooks/useThemeColors';

const createStyles = (colors: {
  white: string;
  primary: string;
  greyDark02: string;
  greyWhite: string;
}) =>
  StyleSheet.create({
    logo: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flex: 1,
    },
    confetti: {
      position: 'absolute',
      top: -10,
      left: -5,
      // transform: [{ translateX: -30 }],
    },
  });

export default function Logo() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <View style={styles.logo}>
      <ThemedText variant="title">Partyz</ThemedText>
      <Image
        source={require('@/assets/images/confettis.png')}
        style={styles.confetti}
      />
    </View>
  );
}
