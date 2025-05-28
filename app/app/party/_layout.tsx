import { RootStackParamList } from '@/App';
import PartyChat from '@/app/app/party/PartyChat';
import PartyGallery from '@/app/app/party/PartyGallery';
import PartyInformations from '@/app/app/party/PartyInformations';
import PartyHeader from '@/components/PartyHeader';
import TabBar from '@/components/TabBar';
import ThemedText from '@/components/ThemedText';
import { useUserContext } from '@/context/userContext';
import useThemeColors from '@/hooks/useThemeColors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

type Props = NativeStackScreenProps<RootStackParamList, 'Party'>;

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 300,
	},
});

export default function PartyLayout({ route }: Props) {
	const { party } = route.params;
	const colors = useThemeColors();
	const {
		user,
		isLoading: isLoadingUser,
		error: errorUser,
	} = useUserContext();
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState([
		{
			key: 'informations',
			title: 'Informations',
			icon: 'info.circle',
		},
		{ key: 'chat', title: 'Chat', icon: 'message' },
		{ key: 'gallery', title: 'Galerie', icon: 'photo.on.rectangle' },
	]);

	if (isLoadingUser) {
		return (
			<SafeAreaView>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<ThemedText>Chargement des parties…</ThemedText>
				</View>
			</SafeAreaView>
		);
	}

	if (errorUser || !user) {
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

	const renderScene = SceneMap({
		informations: () => (
			<PartyInformations userId={user.id} partyId={party.id} />
		),
		chat: () => <PartyChat party={party} />,
		gallery: () => <PartyGallery party={party} />,
	});

	return (
		<SafeAreaView style={{ flex: 1, gap: 10 }}>
			<PartyHeader party={party} />
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				renderTabBar={() => (
					<TabBar
						routes={routes}
						index={index}
						onIndexChange={setIndex}
					/>
				)}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				swipeEnabled={true}
			/>
		</SafeAreaView>
	);
}
