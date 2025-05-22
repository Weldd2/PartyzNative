export type UserType = {
	'@id'?: string;
	'@type'?: string;
	id: number;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	roles?: string[];
	parties?: any[];
	userIdentifier?: string;
	profilePick: string; // URL de l'image de profil (obligatoire pour UserList)
};
