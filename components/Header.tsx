import { IconSymbol } from '@/components/Icon/IconSymbol';
import Logo from '@/components/Logo';
import { useBottomSheet } from '@/context/BottomSheetContext';
import useThemeColors from '@/hooks/useThemeColors';
import { Pressable, StyleSheet, View } from 'react-native';
import PartiesMenuContent from './PartiesMenuContent';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
});

export default function Header() {
	const { openMenu } = useBottomSheet();
	const colors = useThemeColors();

	const handleOpenPartiesMenu = () => {
		openMenu(<PartiesMenuContent />, ['30%']);
	};
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
			<Pressable onPress={handleOpenPartiesMenu}>
				<IconSymbol
					name="ellipsis.circle"
					size={35}
					color={colors.primary}
				/>
			</Pressable>
		</View>
	);
}
