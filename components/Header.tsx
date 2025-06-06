import { IconSymbol } from '@/components/Icon/IconSymbol';
import Logo from '@/components/Logo';
import ThemedButton from '@/components/ThemedButton';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedModal } from './CustomModal/CustomModal';

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

	const setContent = () => {
		return (
			<View style={{ gap: 5 }}>
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
			<ThemedModal>
				<ThemedModal.Button>
					<Pressable>
						<IconSymbol
							name="ellipsis.circle"
							size={35}
							color={colors.primary}
						/>
					</Pressable>
				</ThemedModal.Button>
				<ThemedModal.Modal>{setContent()}</ThemedModal.Modal>
			</ThemedModal>
		</View>
	);
}
