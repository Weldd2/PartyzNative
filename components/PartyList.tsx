import { RootStackParamList } from '@/App';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import usePressEffects from '@/hooks/usePressEffects';
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
	const { getAnimationStyle, handlePressIn } = usePressEffects();
	const futureParties = parties
		.filter((party) => party.date && new Date(party.date) > new Date())
		.sort((a, b) => {
			if (a.date && b.date) {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			}
			return 0;
		});
	return (
		<View>
			<FlatList
				style={styles.list}
				data={futureParties}
				contentInset={{ bottom: futureParties.length * 13 }}
				scrollEnabled={false}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				renderItem={({ item }) => (
					<Pressable
						style={({ pressed }: { pressed: boolean }) => [
							getAnimationStyle(pressed),
							styles.listItem,
						]}
						onPressIn={handlePressIn}
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
							<ThemedText>
								{(() => {
									const daysLeft = Math.ceil(
										(new Date(item.date).getTime() -
											new Date().getTime()) /
											(1000 * 60 * 60 * 24)
									);
									return `J-${daysLeft} ${
										daysLeft > 7 ? '⌛' : '🔥'
									}`;
								})()}
							</ThemedText>
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
							<View style={styles.unreadContainer}>
								<ThemedText style={[styles.unread]}>
									4
								</ThemedText>
							</View>
						</View>
					</Pressable>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		list: {
			paddingBottom: 20,
		},
		listItem: {
			backgroundColor: colors.neutral100,
			borderRadius: 10,
			paddingHorizontal: 8,
			paddingVertical: 10,
		},
		unreadContainer: {
			borderRadius: 100,
			backgroundColor: colors.important700,
			padding: 10,
			position: 'relative',
		},
		unread: {
			position: 'absolute',
			alignSelf: 'center',
			color: colors.neutral100,
		},
	});
