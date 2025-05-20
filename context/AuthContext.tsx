import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentUser, CurrentUser } from '@/hooks/useAuth';

type AuthContextType = {
	user: CurrentUser | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	error: Error | null;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
	isAuthenticated: false,
	error: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: user, isLoading, error } = useCurrentUser();

	return (
		<AuthContext.Provider
			value={{
				user: user || null,
				isLoading,
				isAuthenticated: !!user,
				error: error as Error | null,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
