import { UserType } from '@/types/UserType';
import { createContext, useContext } from 'react';

interface UserContextType {
	user: UserType | undefined;
	isLoading: boolean;
	error: unknown;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};

export default UserContext;
