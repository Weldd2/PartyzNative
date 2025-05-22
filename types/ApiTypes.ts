// Types pour les réponses API au format Hydra/JSON-LD
export type ApiCollection<T> = {
  '@context': string;
  '@id': string;
  '@type': string;
  'totalItems': number;
  'member': T[];
};

// Type pour transformer une réponse de collection en son type membre
export type ExtractCollectionMember<T> = T extends ApiCollection<infer U> ? U : never;
