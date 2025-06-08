import { Colors } from '@/constants/Colors';
import usePressEffects from '@/hooks/usePressEffects';
import useThemeColors from '@/hooks/useThemeColors';
import { Pressable, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 10,
		alignSelf: 'stretch',
	},
	disabled: { opacity: 0.8 },
});

const getVariantStyle = (colors: typeof Colors.light) => ({
	primary: {
		btn: {
			backgroundColor: colors.primary700,
			borderColor: colors.primary700,
			borderWidth: 1,
		},
		textStyle: { color: colors.neutral100 },
	},
	secondary: {
		btn: {
			backgroundColor: colors.neutral100,
			borderColor: colors.primary800,
			borderWidth: 1,
		},
		textStyle: { color: colors.primary800 },
	},
	primary2: {
		btn: {
			backgroundColor: colors.neutral100,
			borderColor: colors.primary700,
			borderWidth: 1,
		},
		textStyle: { color: colors.primary700 },
	},
});

type Props = React.ComponentProps<typeof Pressable> & {
	variant?: keyof ReturnType<typeof getVariantStyle>;
	color?: keyof typeof Colors.light;
	onPress?: Function;
	text?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	onPressAnimation?: boolean;
	onPressHaptic?: boolean;
};

export default function ThemedButton({
	text,
	children,
	onPress,
	variant = 'primary',
	disabled = false,
	onPressAnimation = true,
	onPressHaptic = true,
	...rest
}: Props) {
	const colors = useThemeColors();
	const variantStyles = getVariantStyle(colors);
	const { getAnimationStyle, handlePressIn } = usePressEffects({
		enableAnimation: onPressAnimation,
		enableHaptic: onPressHaptic,
	});

	return (
		<Pressable
			{...rest}
			style={({ pressed }: { pressed: boolean }) => [
				styles.btn,
				variantStyles[variant].btn,
				getAnimationStyle(pressed),
				{
					opacity: pressed ? 0.9 : 1,
				},
				disabled ? styles.disabled : undefined,
				rest.style as any,
			]}
			onPressIn={handlePressIn}
			onPress={disabled ? undefined : onPress}
			disabled={disabled}
		>
			{text ? (
				<ThemedText style={[variantStyles[variant].textStyle]}>
					{text}
				</ThemedText>
			) : (
				children
			)}
		</Pressable>
	);
}
