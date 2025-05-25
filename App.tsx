import AppLayout from '@/app/app/_layout';
import PartyLayout from '@/app/app/party/_layout';
import AuthLayout from '@/app/auth/_layout';
import { PartyType } from '@/types/PartyType';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

export type RootStackParamList = {
	Auth: undefined;
	App: undefined;
	Party: { party: PartyType };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const [loaded] = useFonts({
		HossRound: require('@/assets/fonts/Hoss Round-Medium.otf'),
		HossRoundBlack: require('@/assets/fonts/Hoss Round-Black.otf'),
	});
	if (!loaded) return null;
	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				<RootStack.Screen name="Auth" component={AuthLayout} />
				<RootStack.Screen name="App" component={AppLayout} />
				<RootStack.Screen name="Party" component={PartyLayout} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
