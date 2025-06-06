import { ApiItem } from "@/types/ApiTypes";

export type ShoppingListItem = ApiItem & {
	id: number;
	name: string;
	quantity: number;
	broughtQuantity: number;
}