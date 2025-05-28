import AddressCard from '@/components/AddressCard';
import { Card } from '@/components/Card/Card';
import DateCard from '@/components/DateCard';
import ShoppingList from '@/components/ShoppingList';
import ThemedText from '@/components/ThemedText';
import UserList from '@/components/UserList';
import { useApi } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { ShoppingListContribution } from '@/types/ShoppingListContribution';
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';

const styles = StyleSheet.create({
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
	userId: number;
};

export default function PartyInformations({ partyId, userId }: Props) {
	const colors = useThemeColors();
	const [party, isLoadingParty, errorParty] = useApi<PartyType>(
		`/parties/${partyId}`
	);
	const [contributions, isLoadingContributions, errorContributions] = useApi<
		ShoppingListContribution[]
	>(`/users/${userId}/contributions?shoppingListItem.party.id=${partyId}`);

	if (isLoadingParty || isLoadingContributions) {
		return (
			<SafeAreaView>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<ThemedText>Chargement des parties…</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	if (!party || !contributions || errorParty || errorContributions) {
		return (
			<SafeAreaView>
				<View style={styles.loadingContainer}>
					<ThemedText>
						Erreur lors du chargement de la partie
					</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<ScrollView>
			<View style={styles.viewContainer}>
				<View style={styles.cardWrapper}>
					<DateCard party={party} />
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
				</Card>
				{party.shoppingList && party.shoppingList.length > 0 ? (
					<Card icon="cart">
						<Card.Header>Liste de courses</Card.Header>
						<Card.Content>
							<ShoppingList items={party.shoppingList} />
						</Card.Content>
						{contributions.length > 0 ? (
							<>
								<Card.SubHeader>Je ramène</Card.SubHeader>
								<Card.SubContent>
									<FlatList
										data={contributions}
										keyExtractor={(item) =>
											item.id.toString()
										}
										renderItem={({ item }) => (
											<View
												style={{ flexDirection: 'row' }}
											>
												<ThemedText
													variant="body3"
													style={{ flex: 1 }}
												>
													{item.shoppingListItem.name}
												</ThemedText>
												<ThemedText>
													x{item.quantity}
												</ThemedText>
											</View>
										)}
									/>
								</Card.SubContent>
							</>
						) : (
							<></>
						)}
					</Card>
				) : (
					<></>
				)}
			</View>
		</ScrollView>
	);
}
