import { UserType } from "./UserType";

export type PartyType = {
	id: number;
	title: string;
	date: string;
	members: UserType[]
	unread: number;
};
