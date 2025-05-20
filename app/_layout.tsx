import Home from '@/app/Home';
import Parties from '@/app/Parties';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
	const [loaded] = useFonts({
		HossRound: require('../assets/fonts/Hoss Round-Medium.otf'),
		HossRoundBlack: require('../assets/fonts/Hoss Round-Black.otf'),
	});
	if (!loaded) return null;
	return (
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
		</Stack.Navigator>
	);
}
