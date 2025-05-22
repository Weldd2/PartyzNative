import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

type Props = {
	data: PartyType[];
};

export default function PartyList({ data }: Props) {
	const colors = useThemeColors();
	const navigation = useNavigation();
	const styles = createStyles(colors);
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={styles.list}
				data={data}
				scrollEnabled={true}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				renderItem={({ item }) => (
					<Pressable
						style={[styles.listItem]}
						onPress={() =>
							navigation.navigate('Party Detail', {
								party: item,
							})
						}
					>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<ThemedText style={{ flex: 1 }}>
								{item.title}
							</ThemedText>
							<ThemedText>J - 8 🔥</ThemedText>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<ThemedText style={{ flex: 1 }}>
								{item.date.toLocaleDateString('fr-FR', {
									day: 'numeric',
									month: 'long',
								})}
							</ThemedText>
							<ThemedText style={[styles.unread]}>4</ThemedText>
						</View>
					</Pressable>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}

const createStyles = (colors: {
	white: string;
	primary: string;
	third: string;
	greyDark02: string;
	greyWhite: string;
}) =>
	StyleSheet.create({
		list: {},
		listItem: {
			backgroundColor: colors.white,
			borderRadius: 10,
			paddingHorizontal: 8,
			paddingVertical: 10,
		},
		unread: {
			borderRadius: 100,
			padding: 5,
			backgroundColor: colors.third,
		},
	});
