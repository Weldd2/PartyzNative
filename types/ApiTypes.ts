// Types pour les réponses API au format Hydra/JSON-LD

// Type de base pour les items API
export interface ApiItem {
	'@id': string;
	'@type': string;
}

// Type pour les réponses API qui contiennent des collections d'items
export interface ApiCollection<T extends ApiItem> {
	'@context': string;
	'totalItems': number;
	'member': T[];
}


// Type pour transformer une réponse de collection en son type membre
export type ExtractCollectionMember<T> = T extends ApiCollection<infer U> ? U : never;
