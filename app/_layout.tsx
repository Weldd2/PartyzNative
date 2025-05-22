import Home from '@/app/Home';
import Parties from '@/app/Parties';
import PartiesDetail from '@/app/PartyDetail1';
import { queryClient } from '@/hooks/queryClient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
	const [loaded] = useFonts({
		HossRound: require('@/assets/fonts/Hoss Round-Medium.otf'),
		HossRoundBlack: require('@/assets/fonts/Hoss Round-Black.otf'),
	});
	if (!loaded) return null;
	return (
		<QueryClientProvider client={queryClient}>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Parties"
					component={Parties}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Party Detail"
					component={PartiesDetail}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</QueryClientProvider>
	);
}
