import { Pressable, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { Colors } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 5,
    borderRadius: 10,
  },
});

const getVariantStyle = (colors: typeof Colors.light) => ({
  primary: {
    btn: {
      backgroundColor: colors.primary,
    },
    textStyle: { color: colors.greyWhite },
  },
  secondary: {
    btn: {
      backgroundColor: colors.secondary,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    textStyle: { color: colors.primary },
  },
  primary2: {
    btn: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    textStyle: { color: colors.primary },
  },
});

type Props = React.ComponentProps<typeof Pressable> & {
  variant?: keyof ReturnType<typeof getVariantStyle>;
  color?: keyof typeof Colors.light;
  onPress?: Function;
  text: string;
};

export default function ThemedButton({
  text,
  onPress,
  variant = 'primary',
}: Props) {
  const colors = useThemeColors();
  const variantStyles = getVariantStyle(colors);

  return (
    <Pressable
      style={[styles.btn, variantStyles[variant].btn]}
      onPress={onPress}
    >
      <ThemedText style={[variantStyles[variant].textStyle]}>{text}</ThemedText>
    </Pressable>
  );
}
