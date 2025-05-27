import { ShoppingListItem } from "@/types/ShoppingListItem";
import { UserType } from "@/types/UserType";

export type ShoppingListContribution = {
	id: number;
	quantity: number;
	broughtQuantity: number;
	contributor: UserType;
	shoppingListItem: ShoppingListItem;
}