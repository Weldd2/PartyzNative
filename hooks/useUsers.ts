import { UserType } from '@/types/UserType';
import { useApi } from './useApi';

export function useUsers() {
	const [users, isLoading, error] = useApi<UserType[]>('/users');

	return { users, isLoading, error };
}
