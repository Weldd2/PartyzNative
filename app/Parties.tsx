import Header from '@/components/Header';
import PartyList from '@/components/PartyList';
import ThemedText from '@/components/ThemedText';
import { useParties } from '@/hooks/useParties';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
		flex: 1,
	},
});

export default function Parties() {
	const { parties, isLoading, error } = useParties();

	if (isLoading) {
		return (
			<SafeAreaView>
				<ThemedText>chargement...</ThemedText>
			</SafeAreaView>
		);
	}

	if (error) {
		console.error('Erreur lors du chargement des utilisateurs:', error);
	}

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={style.viewContainer}>
					<Header user={parties[0].members[0]} />
					<ThemedText variant="headline2">Soirées à venir</ThemedText>
					<PartyList data={parties} />
				</View>
			</SafeAreaView>
		</>
	);
}
