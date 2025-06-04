import ThemedBottomSheet from '@/components/BottomSheet/ThemedBottomSheet';
import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

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
			<Pressable onPress={toggleModal}>
				<IconSymbol
					name="ellipsis.circle"
					size={35}
					color={colors.primary}
				/>

				<ThemedBottomSheet
					toggleModal={toggleModal}
					content={setContent()}
					isOpen={isOpen}
				/>
			</Pressable>
		</View>
	);
}
