import { IconSymbol } from '@/components/Icon/IconSymbol';
import Logo from '@/components/Logo';
import useThemeColors from '@/hooks/useThemeColors';
import { Pressable, StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
});

export default function Header() {
	const colors = useThemeColors();

	return (
		<View style={styles.header}>
			<View>
				<IconSymbol
					name="person.crop.circle"
					size={35}
					color={colors.primary}
				/>
			</View>
			<Logo />
			<Pressable>
				<IconSymbol
					name="ellipsis.circle"
					size={35}
					color={colors.primary}
				/>
			</Pressable>
		</View>
	);
}
