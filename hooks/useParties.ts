import { PartyType } from '@/types/PartyType';
import { useApi } from './useApi';

interface ApiPartyType {
  id: number;
  name: string;
  date: string;
  unread: number;
}

export function useParties() {
  const [rawParties, isLoading, error] = useApi<ApiPartyType[]>('/parties');

  // Transform the data to match PartyType
  const parties: PartyType[] = rawParties 
    ? rawParties.map(party => ({
        ...party,
        date: new Date(party.date) // Convert string to Date object
      })) 
    : [];

  return { parties, isLoading, error };
}