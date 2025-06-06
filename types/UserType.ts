import { ApiItem } from "@/types/ApiTypes";
import { PartyType } from "@/types/PartyType";

export type UserType = ApiItem & {
	id: number;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	roles?: string[];
	parties?: PartyType[];
	partiesAsOwner?: PartyType[];
	userIdentifier?: string;
};
