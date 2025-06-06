import { ApiItem } from "@/types/ApiTypes";
import { ShoppingListItem } from "@/types/ShoppingListItem";
import { UserType } from "@/types/UserType";

export type PartyType = ApiItem & {
	id: number;
	title: string;
	date: string;
	address: string;
	postalCode: string;
	city: string;
	members: UserType[];
	owner: UserType;
	shoppingList: ShoppingListItem[];
	unread: number;
};
