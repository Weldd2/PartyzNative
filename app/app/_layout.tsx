import Parties from '@/app/app/Parties';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function AppLayout() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Parties" component={Parties} />
		</Stack.Navigator>
	);
}
