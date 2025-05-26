import AddressCard from '@/components/AddressCard';
import { Card } from '@/components/Card/Card';
import DateCard from '@/components/DateCard';
import MapScreen from '@/components/Map';
import UserList from '@/components/UserList';
import { PartyType } from '@/types/PartyType';
import { ScrollView, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
	},
	cardWrapper: {
		flex: 1,
		flexDirection: 'row',
		overflow: 'hidden',
		gap: 10,
	},
});

type Props = {
	party: PartyType;
};

export default function PartyInformations({ party }: Props) {
	return (
		<ScrollView style={style.viewContainer}>
			<View style={style.cardWrapper}>
				<DateCard date={party.date} />
				<AddressCard address={party.address} />
			</View>
			<Card icon="person.2.fill" style={{ marginBottom: 20 }}>
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
			<MapScreen address={party.address} />
		</ScrollView>
	);
}
