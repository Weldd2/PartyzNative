import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { IconSymbol } from '@/components/Icon/IconSymbol';
import Logo from '@/components/Logo';
import { ColorsType } from '@/constants/Colors';
import { useBottomSheetContext } from '@/context/BottomSheetContext';
import useThemeColors from '@/hooks/useThemeColors';
import ThemedButton from './ThemedButton';

const createStyle = (colors: ColorsType) =>
	StyleSheet.create({
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 15,
		},
		bottomSheet: {},
	});

export default function Header() {
	const colors = useThemeColors();
	const [isOpen, setIsOpen] = useState(false);
	const styles = createStyle(colors);
	const { open, close } = useBottomSheetContext();

	const handleMenuPress = useCallback(() => {
		open(
			<View style={styles.bottomSheet}>
				<ThemedButton text="Nouvelle Partyz" />
			</View>
		);
		if (isOpen) {
			close();
		}
		setIsOpen((prev) => !prev);
	}, [styles, open, close, isOpen]);

	return (
		<View style={styles.header}>
			<IconSymbol
				name="person.crop.circle"
				size={35}
				color={colors.primary}
			/>
			<Logo />
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
