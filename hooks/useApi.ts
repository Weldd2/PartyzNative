import { ApiCollection } from '@/types/ApiTypes';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';

const apiClient = axios.create({
	baseURL: "https://74b5-2a01-e0a-19-5310-9871-d084-1cbc-f4f.ngrok-free.app/api",
	timeout: 10000,
})

// Fonction pour détecter si une réponse est au format collection
function isApiCollection(data: any): data is ApiCollection<any> {
	return (
		data &&
		typeof data === 'object' &&
		'@context' in data &&
		'@id' in data &&
		'@type' in data &&
		'member' in data
	);
}

async function fetcher<T>(path: string): Promise<T> {
	try {
		const response = await apiClient.get(path);
		const data = response.data;
		
		// Si c'est une collection et que nous attendons un tableau, renvoyons le tableau member
		if (isApiCollection(data)) {
			return data.member as unknown as T;
		}
		
		return data;
	} catch (error) {
		console.error('API request failed:', error);
		if (isAxiosError(error)) {
			console.error('Message:', error.message);
			console.error('Détails requête:', error.request);
		}
		throw error;
	}
}
/**
 * useApi : hook générique pour récupérer des données depuis une API REST
 * @param path – endpoint de l'API (ex. '/users')
 * @param options – options additionnelles de useQuery
 */
export function useApi<T = any>(
	path: string,
	options?: Omit<UseQueryOptions<T, Error, T, [string]>, 'queryKey' | 'queryFn'>
): [T | undefined, boolean, unknown] {
	const query = useQuery<T, Error, T, [string]>({
		queryKey: [path],
		queryFn: () => fetcher<T>(path),
		...options
	});
	return [query.data, query.isLoading, query.error];
}