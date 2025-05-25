import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconSymbol } from './IconSymbol';
import ThemedText from './ThemedText';

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
