import { Colors } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { Pressable, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 10,
		marginTop: 5,
		borderRadius: 10,
		alignSelf: 'stretch',
	},
	disabled: { opacity: 0.8 },
});

const getVariantStyle = (colors: typeof Colors.light) => ({
	primary: {
		btn: {
			backgroundColor: colors.primary,
			borderColor: colors.primary,
			borderWidth: 1,
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
	disabled?: boolean;
};

export default function ThemedButton({
	text,
	onPress,
	variant = 'primary',
	disabled = false,
	...rest
}: Props) {
	const colors = useThemeColors();
	const variantStyles = getVariantStyle(colors);

	return (
		<Pressable
			{...rest}
			style={[
				styles.btn,
				disabled ? styles.disabled : undefined,
				variantStyles[variant].btn,
				rest.style,
			]}
			onPress={disabled ? undefined : onPress}
			disabled={disabled}
		>
			<ThemedText style={[variantStyles[variant].textStyle]}>
				{text}
			</ThemedText>
		</Pressable>
	);
}
