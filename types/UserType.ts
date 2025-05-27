import { PartyType } from "@/types/PartyType";

export type UserType = {
	'@id'?: string;
	'@type'?: string;
	id: number;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	roles?: string[];
	parties?: PartyType[];
	partiesAsOwner?: PartyType[];
	userIdentifier?: string;
};
