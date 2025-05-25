import { UserType } from "./UserType";

export type PartyType = {
	id: number;
	title: string;
	date: string;
	address: string;
	postalCode: string;
	city: string;
	members: UserType[];
	unread: number;
};
