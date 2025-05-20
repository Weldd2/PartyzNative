import { PartyType } from '@/types/PartyType';
import { useQuery } from '@tanstack/react-query';

// const API_URL = 'https://api.preprod.partyz.app';
const API_URL = 'https://192.168.1.83';

export function useParties() {
	return useQuery<PartyType[]>({
		queryKey: ['parties'],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/parties`, {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch parties');
			}

			const data = await response.json();

			return data.map((party: any) => ({
				id: party.id,
				name: party.name,
				date: new Date(party.date),
				unread: party.unread || 0,
			}));
		},
	});
}
