import { ApiCollection } from '@/types/ApiTypes';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';

const apiClient = axios.create({
	baseURL: "https://918e-2a01-e0a-19-5310-9bf-39eb-914a-d813.ngrok-free.app/api",
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

async function mutationFn<T, TVariables = any>(
	path: string, 
	method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
	variables?: TVariables
): Promise<T> {
	try {
		const response = await apiClient({
			method,
			url: path,
			data: variables,
			headers: {
				'Content-Type': 'application/merge-patch+json',
				'Accept': 'application/ld+json',
			}
		});
		const data = response.data;
		
		// Si c'est une collection et que nous attendons un tableau, renvoyons le tableau member
		if (isApiCollection(data)) {
			return data.member as unknown as T;
		}
		
		return data;
	} catch (error) {
		console.error('API mutation failed:', error);
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
/**
 * useApiMutation : hook générique pour effectuer des mutations sur une API REST
 * @param path – endpoint de l'API (ex. '/users')
 * @param method – méthode HTTP (POST, PUT, PATCH, DELETE)
 * @param options – options additionnelles de useMutation
 */
export function useApiMutation<T = any, TVariables = any>(
	path: string,
	method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
	options?: Omit<UseMutationOptions<T, Error, TVariables>, 'mutationFn'>
) {
	return useMutation<T, Error, TVariables>({
		mutationFn: (variables: TVariables) => mutationFn<T, TVariables>(path, method, variables),
		...options
	});
}

/**
 * createApiMutation : fonction pour créer une mutation avec un path dynamique
 * @param method – méthode HTTP (POST, PUT, PATCH, DELETE)
 */
export function createApiMutation<T = any, TVariables = any>(
	method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) {
	return async (path: string, variables?: TVariables): Promise<T> => {
		return mutationFn<T, TVariables>(path, method, variables);
	};
}
