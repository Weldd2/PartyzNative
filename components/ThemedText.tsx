import useThemeColors from '@/hooks/useThemeColors';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

const getVariantStyle = (colors: typeof Colors.light) => ({
  body3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'HossRound',
    color: colors.greyDark,
  },
  sub: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'HossRound',
    color: colors.greyLight,
  },
  headline: {
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 10,
    fontFamily: 'HossRound',
    color: colors.primary,
  },
  headline2: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'HossRound',
    color: colors.primary,
  },
});

type Props = React.ComponentProps<typeof Text> & {
  variant?: keyof ReturnType<typeof getVariantStyle>;
  color?: keyof typeof Colors.light;
};

export default function ThemedText({
  variant = 'body3',
  color,
  ...rest
}: Props) {
  const colors = useThemeColors();
  const styles = getVariantStyle(colors);
  return (
    <Text
      {...rest}
      style={[
        styles[variant],
        color ? { color: colors[color] } : null,
        rest.style,
      ]}
    />
  );
}
