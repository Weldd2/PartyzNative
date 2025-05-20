import ConfettiSvg from '@/assets/images/confettis.svg';
import ThemedText from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { View } from 'react-native';

const getVariantStyle = (colors: typeof Colors.light) => ({
	normal: {
		logo: {
			paddingTop: 20,
			paddingHorizontal: 25,
		},
		confetti: {
			position: 'absolute' as const,
			top: 0,
			left: 0,
		},
		text: {
			fontSize: 36,
		},
	},
	big: {
		logo: {
			paddingTop: 20,
			paddingHorizontal: 25,
		},
		confetti: {
			position: 'absolute' as const,
			top: 0,
			left: 0,
		},
		text: {
			fontSize: 48,
			lineHeight: 52,
		},
	},
});

type Props = {
	variant?: keyof ReturnType<typeof getVariantStyle>;
};

export default function Logo({ variant = 'normal' }: Props) {
	const colors = useThemeColors();
	const variantStyles = getVariantStyle(colors);
	return (
		<View style={[variantStyles[variant].logo]}>
			<ThemedText variant="title" style={variantStyles[variant].text}>
				Partyz
			</ThemedText>
			<ConfettiSvg style={[variantStyles[variant].confetti]} />
		</View>
	);
}
