import AppLayout from '@/app/app/_layout';
import PartyLayout from '@/app/app/party/_layout';
import AuthLayout from '@/app/auth/_layout';
import UserContext from '@/context/userContext';
import { queryClient } from '@/hooks/queryClient';
import { useApi } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { UserType } from '@/types/UserType';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParamList = {
	Auth: undefined;
	App: undefined;
	Party: { party: PartyType };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
	const [user, isLoading, error] = useApi<UserType>('/users/1');
	const colors = useThemeColors();

	// Si pas loggué et pas d'erreur, afficher la stack Auth
	if (!user && !isLoading && !error) {
		return (
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				<RootStack.Screen name="Auth" component={AuthLayout} />
			</RootStack.Navigator>
		);
	}

	// Si on charge l'utilisateur
	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator color={colors.primary} size="large" />
			</View>
		);
	}

	// Sinon, on fournit les contextes et la navigation « réelle »
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<UserContext.Provider value={{ user, isLoading, error }}>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					<RootStack.Screen name="App" component={AppLayout} />
					<RootStack.Screen name="Party" component={PartyLayout} />
				</RootStack.Navigator>
			</UserContext.Provider>
		</GestureHandlerRootView>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		HossRound: require('@/assets/fonts/Hoss Round-Medium.otf'),
		HossRoundBlack: require('@/assets/fonts/Hoss Round-Black.otf'),
	});
	if (!fontsLoaded) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</QueryClientProvider>
	);
}
