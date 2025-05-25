import Parties from '@/app/app/Parties';
import { queryClient } from '@/hooks/queryClient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function AppLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Parties" component={Parties} />
			</Stack.Navigator>
		</QueryClientProvider>
	);
}
