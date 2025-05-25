import { RootStackParamList } from '@/App';
import PartyInformations from '@/app/app/party/PartyInformations';
import PartyHeader from '@/components/PartyHeader';
import { queryClient } from '@/hooks/queryClient';
import { PartyType } from '@/types/PartyType';
import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { SafeAreaView } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Party'>;
const Stack = createNativeStackNavigator<PartyStackParamList>();
export type PartyStackParamList = {
	PartyInformations: { party: PartyType };
	PartyChat: { party: PartyType };
	PartyGallery: { party: PartyType };
};

export default function PartyLayout({ route }: Props) {
	const { party } = route.params;
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaView style={{ flex: 1 }}>
				<PartyHeader party={party} />
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="PartyInformations"
						component={PartyInformations}
						initialParams={{ party }}
					/>
					{/* <Stack.Screen
						name="PartyChat"
						component={PartyChat}
						initialParams={{ party }}
					/>
					<Stack.Screen
						name="PartyGallery"
						component={PartyGallery}
						initialParams={{ party }}
					/> */}
				</Stack.Navigator>
			</SafeAreaView>
		</QueryClientProvider>
	);
}
