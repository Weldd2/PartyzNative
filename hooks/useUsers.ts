import { UserType } from '@/types/UserType';
import { useApi } from './useApi';

/**
 * Hook pour récupérer les utilisateurs avec des images de profil
 */
export function useUsers() {
	const [rawUsers, isLoading, error] = useApi<UserType[]>('/users');

	// Ajout des images de profil aux utilisateurs
	const users = rawUsers?.map(user => ({
		...user,
		// Génération d'une URL aléatoire pour l'image de profil
		profilePick: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${user.id}.jpg`
	})) || [];

	return { users, isLoading, error };
}
