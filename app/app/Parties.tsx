import Header from '@/components/Header';
import PartyList from '@/components/PartyList';
import ThemedText from '@/components/ThemedText';
import { useParties } from '@/hooks/useParties';
import useThemeColors from '@/hooks/useThemeColors';
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
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
	const { parties, isLoading, error } = useParties();
	const colors = useThemeColors();
	if (isLoading) {
		return (
			<SafeAreaView>
				<View style={style.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<ThemedText>Chargement des parties…</ThemedText>
				</View>
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
					<Header />
					<ThemedText variant="headline2">Soirées à venir</ThemedText>
					<PartyList data={parties} />
				</View>
			</SafeAreaView>
		</>
	);
}
