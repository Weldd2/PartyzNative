import { RootStackParamList } from '@/App';
import PartyChat from '@/app/app/party/PartyChat';
import PartyGallery from '@/app/app/party/PartyGallery';
import PartyInformations from '@/app/app/party/PartyInformations';
import PartyHeader from '@/components/PartyHeader';
import TabBar from '@/components/TabBar';
import { queryClient } from '@/hooks/queryClient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

type Props = NativeStackScreenProps<RootStackParamList, 'Party'>;

export default function PartyLayout({ route }: Props) {
	const { party } = route.params;
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

	const renderScene = SceneMap({
		informations: () => <PartyInformations party={party} />,
		chat: () => <PartyChat party={party} />,
		gallery: () => <PartyGallery party={party} />,
	});

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaView style={{ flex: 1 }}>
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
		</QueryClientProvider>
	);
}
