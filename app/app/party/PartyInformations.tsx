import AddressCard from '@/components/AddressCard';
import { Card } from '@/components/Card/Card';
import DateCard from '@/components/DateCard';
import MapScreen from '@/components/Map';
import ShoppingList from '@/components/ShoppingList';
import ThemedText from '@/components/ThemedText';
import UserList from '@/components/UserList';
import { useApi } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import {
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';

const style = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 300,
	},
	viewContainer: {
		paddingHorizontal: 15,
		gap: 20,
	},
	cardWrapper: {
		flex: 1,
		flexDirection: 'row',
		overflow: 'hidden',
		gap: 10,
	},
});

type Props = {
	partyId: number;
};

export default function PartyInformations({ partyId }: Props) {
	const colors = useThemeColors();
	const [party, isLoadingParty, errorParty] = useApi<PartyType>(
		`/parties/${partyId}`
	);

	if (isLoadingParty) {
		return (
			<SafeAreaView>
				<View style={style.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<ThemedText>Chargement des parties…</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	if (!party || errorParty) {
		return (
			<SafeAreaView>
				<View style={style.loadingContainer}>
					<ThemedText>
						Erreur lors du chargement de la partie
					</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<ScrollView>
			<View style={style.viewContainer}>
				<View style={style.cardWrapper}>
					<DateCard date={party.date} />
					<AddressCard address={party.address} />
				</View>
				<Card icon="person.2.fill">
					<Card.Header>
						Liste des participants (
						{party.members ? party.members.length : '0'})
					</Card.Header>
					<Card.Content>
						<UserList owner={party.owner} members={party.members} />
					</Card.Content>
					{/* <Card.SubHeader>
						En attente ({party.members.length})
					</Card.SubHeader>
					<Card.SubContent>
						<UserList data={party.members} variant="sub" />
					</Card.SubContent> */}
				</Card>
				<Card icon="cart">
					<Card.Header>Liste de course</Card.Header>
					<Card.Content>
						<ShoppingList data={party.shoppingList} />
					</Card.Content>
					{/* <Card.SubHeader>Au total, je ramène</Card.SubHeader>
					<Card.SubContent>
						<FlatList
							data={user.contributions}
							renderItem={({ item }) => <></>}
						/>
					</Card.SubContent> */}
				</Card>
				<MapScreen address={party.address} />
			</View>
		</ScrollView>
	);
}
