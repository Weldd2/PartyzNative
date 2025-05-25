import Home from '@/app/auth/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const AuthStack = createNativeStackNavigator();

export default function AuthLayout() {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="Home" component={Home} />
			{/* <AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Signup" component={SignupScreen} /> */}
		</AuthStack.Navigator>
	);
}
