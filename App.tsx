import AppLayout from '@/app/app/_layout';
import PartyLayout from '@/app/app/party/_layout';
import AuthLayout from '@/app/auth/_layout';
import ThemedBottomSheet from '@/components/ThemedBottomSheet';
import { BottomSheetContext } from '@/context/BottomSheetContext';
import UserContext from '@/context/userContext';
import { queryClient } from '@/hooks/queryClient';
import { useApi } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { UserType } from '@/types/UserType';
import BottomSheet from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as React from 'react';
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

	const bottomSheetRef = React.useRef<BottomSheet>(null);
	const [bottomSheetContent, setBottomSheetContent] =
		React.useState<React.ReactNode>(null);
	const [currentSnapPoints, setCurrentSnapPoints] = React.useState(['30%']);

	// Handle opening the bottom sheet with dynamic content
	const handleOpenMenu = React.useCallback(
		(content: React.ReactNode, snapPoints?: string[]) => {
			setBottomSheetContent(content);
			if (snapPoints) {
				setCurrentSnapPoints(snapPoints);
			}
			bottomSheetRef.current?.expand();
		},
		[]
	);

	// Handle closing the bottom sheet
	const handleCloseMenu = React.useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	// Si l'utilisateur n'est pas chargé et qu'il n'y a pas d'erreur, afficher Auth
	if (!user && !isLoading && !error) {
		return (
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				<RootStack.Screen name="Auth" component={AuthLayout} />
			</RootStack.Navigator>
		);
	}

	// Si chargement en cours
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
	// Si utilisateur chargé, fournir le contexte
	return (
		<UserContext.Provider value={{ user, isLoading, error }}>
			<BottomSheetContext.Provider
				value={{ openMenu: handleOpenMenu, closeMenu: handleCloseMenu }}
			>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					<RootStack.Screen name="App" component={AppLayout} />
					<RootStack.Screen name="Party" component={PartyLayout} />
				</RootStack.Navigator>
				<ThemedBottomSheet
					bottomSheetRef={bottomSheetRef}
					bottomSheetContent={bottomSheetContent}
					currentSnapPoints={currentSnapPoints}
				/>
			</BottomSheetContext.Provider>
		</UserContext.Provider>
	);
}

export default function App() {
	const [loaded] = useFonts({
		HossRound: require('@/assets/fonts/Hoss Round-Medium.otf'),
		HossRoundBlack: require('@/assets/fonts/Hoss Round-Black.otf'),
	});

	if (!loaded) return null;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
