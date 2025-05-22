import { Card } from '@/components/Card/Card';
import { IconSymbol } from '@/components/IconSymbol';
import NavigationBar from '@/components/NavigationBar';
import ThemedText from '@/components/ThemedText';
import UserList from '@/components/UserList';
import useThemeColors from '@/hooks/useThemeColors';
import {
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
});

export default function PartiesDetail({ route }) {
	const { party } = route.params;
	const colors = useThemeColors();
	console.log(party);
	return (
		<>
			<SafeAreaView>
				<ScrollView>
					<View style={style.header}>
						<View>
							<IconSymbol
								name="person.crop.circle"
								size={35}
								color={colors.primary}
							/>
						</View>
						<ThemedText
							variant="headline1"
							style={{ marginBottom: 0 }}
						>
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
					<NavigationBar />
					<View style={style.viewContainer}>
						<Card icon="person.2.fill">
							<Card.Header>
								Liste des participants ({party.members.length})
							</Card.Header>
							<Card.Content>
								<UserList data={party.members} />
							</Card.Content>

							<Card.SubHeader>
								En attente ({party.members.length})
							</Card.SubHeader>
							<Card.SubContent>
								<UserList data={party.members} variant="sub" />
							</Card.SubContent>
						</Card>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}
