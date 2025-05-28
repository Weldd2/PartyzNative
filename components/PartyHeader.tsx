import { IconSymbol } from '@/components/Icon/IconSymbol';
import PartyMenuContent from '@/components/PartyMenuContent';
import ThemedText from '@/components/ThemedText';
import { useBottomSheet } from '@/context/BottomSheetContext';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { Pressable, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
});

type Props = {
	party: PartyType;
};

export default function PartyHeader({ party }: Props) {
	const colors = useThemeColors();
	const { openMenu } = useBottomSheet();

	const handleOpenPartyMenu = () => {
		openMenu(<PartyMenuContent party={party} />, ['30%']);
	};

	return (
		<View style={style.header}>
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
			<Pressable onPress={handleOpenPartyMenu}>
				<IconSymbol
					name="ellipsis.circle"
					size={35}
					color={colors.primary}
				/>
			</Pressable>
		</View>
	);
}
