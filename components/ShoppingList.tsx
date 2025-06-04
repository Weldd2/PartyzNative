import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

type Props = {
	items: ShoppingListItem[];
};

const ITEM_HEIGHT = 40;
const MAX_VISIBLE_ITEMS = 7.5;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: 1,
		overflow: 'hidden',
	},
	list: {
		width: '100%',
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		height: ITEM_HEIGHT,
		paddingHorizontal: 10,
	},
	profilePic: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 1.5,
		marginRight: 10,
	},
	text: {
		flex: 1,
	},
});

export default function ShoppingList({ items = [] }: Props) {
	const colors = useThemeColors();
	const listHeight = Math.min(items.length, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT;

	return (
		<View style={[styles.container, { borderColor: colors.greyDark02 }]}>
			<FlatList
				data={items}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<ThemedText variant="body3" style={styles.text}>
							{item.name}
						</ThemedText>
						<ThemedText
							color={
								item.broughtQuantity === item.quantity
									? 'success'
									: 'error'
							}
						>
							{item.broughtQuantity}/{item.quantity}
						</ThemedText>
					</View>
				)}
				style={[styles.list, { height: listHeight }]}
				scrollEnabled={items.length > MAX_VISIBLE_ITEMS}
				showsVerticalScrollIndicator={items.length > MAX_VISIBLE_ITEMS}
			/>
		</View>
	);
}
