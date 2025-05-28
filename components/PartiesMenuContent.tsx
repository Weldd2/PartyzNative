import { useBottomSheet } from '@/context/BottomSheetContext';
import useThemeColors from '@/hooks/useThemeColors';
import { StyleSheet, View } from 'react-native';
import ThemedButton from './ThemedButton';

const style = StyleSheet.create({
	menuContainer: {},
	menuItem: {
		flexDirection: 'row',
	},
	menuItemText: {},
});

export default function PartiesMenuContent() {
	const colors = useThemeColors();
	const { closeMenu } = useBottomSheet();

	const handleEdit = () => {
		closeMenu();
	};

	const handleShare = () => {
		closeMenu();
	};

	const handleDelete = () => {
		closeMenu();
	};

	return (
		<View style={style.menuContainer}>
			<ThemedButton
				variant="primary"
				text="Modifier"
				style={style.menuItem}
				onPress={handleEdit}
			/>
			<ThemedButton
				variant="secondary"
				text="Supprimer"
				style={style.menuItem}
				onPress={handleDelete}
			/>
			<ThemedButton
				variant="primary2"
				text="Partager"
				style={style.menuItem}
				onPress={handleShare}
			/>
		</View>
	);
}
