import { useApi } from '@/hooks/useApi';
import { PartyType } from '@/types/PartyType';

export function useParties() {
  const [parties, isLoading, error] = useApi<PartyType[]>('/parties');

  return { parties, isLoading, error };
}