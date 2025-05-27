import { RootStackParamList } from '@/App';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

type Props = {
	parties: PartyType[];
};

type PartiesNavProp = NativeStackNavigationProp<RootStackParamList, 'App'>;

export default function PartyList({ parties }: Props) {
	const colors = useThemeColors();
	const navigation = useNavigation<PartiesNavProp>();
	const styles = createStyles(colors);
	return (
		<View>
			<FlatList
				style={styles.list}
				data={parties}
				contentInset={{ bottom: parties.length * 13 }}
				scrollEnabled={true}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				renderItem={({ item }) => (
					<Pressable
						style={[styles.listItem]}
						onPress={() =>
							navigation.navigate('Party', {
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
								{item.date &&
								!isNaN(new Date(item.date).getTime())
									? new Date(item.date).toLocaleDateString(
											'fr-FR',
											{
												day: 'numeric',
												month: 'long',
											}
									  )
									: 'Date non disponible'}
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
		list: {
			paddingBottom: 20,
		},
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
