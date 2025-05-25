import { Card } from '@/components/Card/Card';
import UserList from '@/components/UserList';
import { PartyType } from '@/types/PartyType';
import { ScrollView, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
	},
});

type Props = {
	party: PartyType;
};

export default function PartyInformations({ party }: Props) {
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
