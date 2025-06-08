import { Colors } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { Text } from 'react-native';

const getVariantStyle = (colors: typeof Colors.light) => ({
	body3: {
		fontSize: 18,
		lineHeight: 20,
		fontFamily: 'HossRound',
		flexShrink: 1,
	},
	title: {
		fontSize: 34,
		lineHeight: 36,
		marginBottom: 10,
		fontFamily: 'HossRoundBlack',
		color: colors.primary700,
	},
	headline1: {
		fontSize: 24,
		lineHeight: 24,
		marginBottom: 10,
		fontFamily: 'HossRoundBlack',
		color: colors.primary700,
	},
	headline2: {
		fontSize: 24,
		lineHeight: 28,
		marginBottom: 10,
		fontFamily: 'HossRound',
		color: colors.primary700,
	},
	headline3: {
		fontSize: 18,
		marginBottom: 10,
		lineHeight: 20,
		fontFamily: 'HossRound',
		color: colors.primary700,
	},
	global: {
		color: colors.neutral900,
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
				styles.global,
				styles[variant],
				color ? { color: colors[color] } : null,
				rest.style,
			]}
		/>
	);
}
