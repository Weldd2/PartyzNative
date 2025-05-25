import { PartyStackParamList } from '@/app/app/party/_layout';
import { Card } from '@/components/Card/Card';
import UserList from '@/components/UserList';
import { RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
	},
});

type Props = {
	route: RouteProp<PartyStackParamList, 'PartyInformations'>;
};

export default function PartyInformations({ route }: Props) {
	const { party } = route.params;
	return (
		<ScrollView>
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
	);
}
