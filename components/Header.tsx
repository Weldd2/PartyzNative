import ThemedBottomSheet from '@/components/BottomSheet/ThemedBottomSheet';
import { IconSymbol } from '@/components/Icon/IconSymbol';
import Logo from '@/components/Logo';
import ThemedButton from '@/components/ThemedButton';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const createStyle = (colors: ColorsType) =>
	StyleSheet.create({
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 15,
		},
	});

export default function Header() {
	const colors = useThemeColors();
	const styles = createStyle(colors);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const setContent = () => {
		return (
			<View>
				<ThemedButton text="Nouvelle Party" />
				<ThemedButton text="Supprimer Party" />
				<ThemedButton text="Modifier Party" />
			</View>
		);
	};

	return (
		<View style={styles.header}>
			<IconSymbol
				name="person.crop.circle"
				size={35}
				color={colors.primary}
			/>
			<Logo />
			<Pressable onPress={toggleModal}>
				<IconSymbol
					name="ellipsis.circle"
					size={35}
					color={colors.primary}
				/>
			</Pressable>
			<ThemedBottomSheet
				toggleModal={toggleModal}
				content={setContent()}
				isOpen={isOpen}
			/>
		</View>
	);
}
