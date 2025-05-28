import Header from '@/components/Header';
import PartyList from '@/components/PartyList';
import ThemedText from '@/components/ThemedText';
import { useUserContext } from '@/context/userContext';
import { useApi } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';

const styles = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
		gap: 10,
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 300,
	},
});

export default function Parties() {
	const {
		user,
		isLoading: isLoadingUser,
		error: errorUser,
	} = useUserContext();
	const [parties, isLoadingParties, errorParties] = useApi<PartyType[]>(
		`/users/${user?.id}/parties`
	);
	const [partiesAsOwner, isLoadingPartiesAsOwner, errorPartiesAsOwner] =
		useApi<PartyType[]>(`/users/${user?.id}/partiesAsOwner`);

	const colors = useThemeColors();
	if (isLoadingUser || isLoadingParties || isLoadingPartiesAsOwner) {
		return (
			<SafeAreaView>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<ThemedText>Chargement des parties…</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	if (
		!parties ||
		!user ||
		!partiesAsOwner ||
		errorUser ||
		errorParties ||
		errorPartiesAsOwner
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
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.viewContainer}>
					<Header />
					<ThemedText variant="headline2">Vos soirées</ThemedText>
					<PartyList parties={partiesAsOwner} />
					<ThemedText variant="headline2">Soirées à venir</ThemedText>
					<PartyList parties={parties} />
				</View>
			</SafeAreaView>
		</>
	);
}
