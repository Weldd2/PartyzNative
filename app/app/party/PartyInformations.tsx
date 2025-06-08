import AddressCard from '@/components/AddressCard';
import { Card } from '@/components/Card/Card';
import { ThemedModal } from '@/components/CustomModal/CustomModal';
import DateCard from '@/components/DateCard';
import ShoppingList from '@/components/ShoppingList';
import ShoppingListEdit from '@/components/ShoppingListEdit';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import UserList from '@/components/UserList';
import { useApi } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { ShoppingListContribution } from '@/types/ShoppingListContribution';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
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
	const [userContributions, isLoadingContributions, errorContributions] =
		useApi<ShoppingListContribution[]>(
			`/users/${userId}/contributions?shoppingListItem.party.id=${partyId}`
		);
	const [
		shoppingListItems,
		isLoadingShoppingListItems,
		errorShoppingListItems,
	] = useApi<ShoppingListItem[]>(`/parties/${partyId}/shopping_list_items`);
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			// Invalide la cache pour la requête "party" et relance un refetch
			await queryClient.invalidateQueries({
				queryKey: [`/parties/${partyId}`],
			});
			await queryClient.invalidateQueries({
				queryKey: [`/parties/${partyId}/shopping_list_items`],
			});
			// Invalide la cache pour la requête "contributions" et relance un refetch
			await queryClient.invalidateQueries({
				queryKey: [
					`/users/${userId}/contributions?shoppingListItem.party.id=${partyId}`,
				],
			});
		} catch (err) {
			console.error('Erreur lors du rafraîchissement :', err);
		} finally {
			setRefreshing(false);
		}
	}, [queryClient, partyId, userId]);

	if (
		isLoadingParty ||
		isLoadingContributions ||
		isLoadingShoppingListItems
	) {
		return (
			<SafeAreaView>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary700} />
					<ThemedText>Chargement des parties…</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	if (
		!party ||
		!userContributions ||
		!shoppingListItems ||
		errorParty ||
		errorContributions ||
		errorShoppingListItems
	) {
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
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={
						refreshing || isLoadingParty || isLoadingContributions
					}
					onRefresh={onRefresh}
					tintColor={colors.primary700}
					colors={[colors.primary700]}
				/>
			}
		>
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
				{shoppingListItems && shoppingListItems.length > 0 ? (
					<Card icon="cart">
						<Card.Header>Liste de courses</Card.Header>
						<Card.Content>
							<ShoppingList
								items={shoppingListItems}
								userContributions={userContributions}
							/>
						</Card.Content>
						{userContributions.length > 0 ? (
							<>
								<Card.SubHeader>Je ramène</Card.SubHeader>
								<Card.SubContent>
									<FlatList
										data={userContributions}
										scrollEnabled={false}
										keyExtractor={(item) =>
											item.id.toString()
										}
										renderItem={({ item }) => (
											<View
												style={{
													flexDirection: 'row',
												}}
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
						) : null}
						<ThemedModal onClose={onRefresh}>
							<ThemedModal.Button>
								<ThemedButton
									text="Modifier"
									style={{ marginTop: 10 }}
								/>
							</ThemedModal.Button>
							<ThemedModal.Modal variant="fullPage">
								<ShoppingListEdit data={shoppingListItems} />
							</ThemedModal.Modal>
						</ThemedModal>
					</Card>
				) : null}
			</View>
		</ScrollView>
	);
}
