import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import usePressEffects from '@/hooks/usePressEffects';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedModal } from './CustomModal/CustomModal';

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
	const { handlePressIn } = usePressEffects();

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
			<ThemedModal>
				<ThemedModal.Button>
					<Pressable onPressIn={handlePressIn}>
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
