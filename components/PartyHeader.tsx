import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import { useBottomSheetContext } from '@/context/BottomSheetContext';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ThemedButton from './ThemedButton';

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		viewContainer: {
			flex: 1,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 15,
		},
		bottomSheet: {},
	});

type Props = {
	party: PartyType;
};

export default function PartyHeader({ party }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [isOpen, setIsOpen] = useState(false);
	const { open, close } = useBottomSheetContext();

	const handleMenuPress = useCallback(() => {
		open(
			<View style={styles.bottomSheet}>
				<ThemedButton variant="primary" text="Modifier" />
				<ThemedButton variant="secondary" text="Partager" />
				<ThemedButton variant="primary2" text="Supprimer" />
			</View>
		);
		if (isOpen) {
			close();
		}
		setIsOpen((prev) => !prev);
	}, [styles, open, close, isOpen]);

	return (
		<View style={styles.header}>
			<View>
				<IconSymbol
					name="person.crop.circle"
					size={35}
					color={colors.primary}
				/>
			</View>
			<ThemedText variant="headline1" style={{ marginBottom: 0 }}>
				{party.title}
			</ThemedText>
			<Pressable onPress={handleMenuPress}>
				<IconSymbol
					name="ellipsis.circle"
					size={35}
					color={colors.primary}
				/>
			</Pressable>
		</View>
	);
}
