import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import { createApiMutation } from '@/hooks/useApi';
import usePressEffects from '@/hooks/usePressEffects';
import useThemeColors from '@/hooks/useThemeColors';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';

type Props = {
	data: ShoppingListItem[];
};

type DebouncedUpdates = { [key: number]: NodeJS.Timeout };
type PendingUpdates = { [key: number]: number };

const DEBOUNCE_DELAY = 1000;

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 15,
			paddingTop: 15,
			gap: 20,
			flex: 1,
		},
		listContainer: {
			borderRadius: 10,
			borderWidth: 1,
			overflow: 'hidden',
			borderColor: colors.greyDark02,
			flex: 1,
		},
		list: {
			flex: 1,
		},
		listItem: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10,
			height: 40,
			paddingHorizontal: 10,
		},
		listItemText: {
			flex: 1,
		},
		textInputContainer: {
			flexDirection: 'row',
		},
		textInput: {
			borderRadius: 10,
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			flex: 1,
			paddingLeft: 14,
			backgroundColor: colors.white,
			fontSize: 18,
			fontFamily: 'HossRound',
			color: colors.greyDark,
			borderWidth: 1,
			borderRightWidth: 0,
			borderColor: colors.greyDark02,
		},
		addBtn: {
			marginTop: 0,
			margin: 0,
			padding: 0,
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			borderWidth: 1,
			borderColor: colors.greyDark02,
		},
		footerText: {
			marginBottom: 40,
		},
	});

export default function ShoppingListEdit({ data }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [searchText, setSearchText] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	const [localData, setLocalData] = useState(data);
	const debouncedUpdates = useRef<DebouncedUpdates>({});
	const pendingUpdates = useRef<PendingUpdates>({});
	const updateItem = createApiMutation<
		ShoppingListItem,
		{ quantity: number }
	>('PATCH');
	const { getAnimationStyle, handlePressIn } = usePressEffects();

	// Filter data based on search text
	const filterData = useCallback(
		(items: ShoppingListItem[], search: string) => {
			if (search.trim() === '') {
				return items;
			}
			return items.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		},
		[]
	);

	// Handle API update with error handling
	const performApiUpdate = useCallback(
		async (item: ShoppingListItem, quantity: number) => {
			try {
				await updateItem(`/shopping_list_items/${item.id}`, {
					quantity,
				});
				delete pendingUpdates.current[item.id];
			} catch (error) {
				console.error('Error updating item:', error);

				// Rollback on error
				setLocalData((prevData) =>
					prevData.map((localItem) =>
						localItem.id === item.id
							? { ...localItem, quantity: item.quantity }
							: localItem
					)
				);

				delete pendingUpdates.current[item.id];
				Alert.alert(
					'Erreur',
					'Impossible de mettre à jour la quantité'
				);
			}
		},
		[updateItem]
	);

	// Clear debounce timeout for specific item
	const clearItemTimeout = useCallback((itemId: number) => {
		if (debouncedUpdates.current[itemId]) {
			clearTimeout(debouncedUpdates.current[itemId]);
			delete debouncedUpdates.current[itemId];
		}
	}, []);

	// Update item quantity with debouncing
	const updateItemQuantity = useCallback(
		(item: ShoppingListItem, newQuantity: number) => {
			if (newQuantity < 0) return;

			// Optimistic update
			setLocalData((prevData) =>
				prevData.map((localItem) =>
					localItem.id === item.id
						? { ...localItem, quantity: newQuantity }
						: localItem
				)
			);

			// Store pending update
			pendingUpdates.current[item.id] = newQuantity;

			// Clear existing timeout
			clearItemTimeout(item.id);

			// Set new debounced timeout
			debouncedUpdates.current[item.id] = setTimeout(() => {
				const finalQuantity = pendingUpdates.current[item.id];
				if (finalQuantity !== undefined) {
					performApiUpdate(item, finalQuantity);
				}
				delete debouncedUpdates.current[item.id];
			}, DEBOUNCE_DELAY);
		},
		[performApiUpdate, clearItemTimeout]
	);

	const handleDecreaseQuantity = useCallback(
		(item: ShoppingListItem) => {
			const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0;
			updateItemQuantity(item, newQuantity);
		},
		[updateItemQuantity]
	);

	const handleIncreaseQuantity = useCallback(
		(item: ShoppingListItem) => {
			updateItemQuantity(item, item.quantity + 1);
		},
		[updateItemQuantity]
	);

	const handleAddItem = useCallback(() => {
		if (!searchText.trim()) return;
		console.log('Adding item:', searchText);
	}, [searchText]);

	const renderListItem = useCallback(
		({ item }: { item: ShoppingListItem }) => (
			<View style={styles.listItem}>
				<ThemedText variant="body3" style={styles.listItemText}>
					{item.name}
				</ThemedText>
				<Pressable
					onPress={() => handleDecreaseQuantity(item)}
					onPressIn={handlePressIn}
				>
					<IconSymbol
						name={
							item.quantity > 1
								? 'minus.circle'
								: 'multiply.circle'
						}
						color={colors.error}
						size={25}
					/>
				</Pressable>
				<ThemedText style={{ minWidth: 45, textAlign: 'center' }}>
					{item.quantity}
				</ThemedText>
				<Pressable
					onPress={() => handleIncreaseQuantity(item)}
					onPressIn={handlePressIn}
				>
					<IconSymbol
						name="plus.circle"
						color={colors.success}
						size={25}
					/>
				</Pressable>
			</View>
		),
		[styles, colors, handleDecreaseQuantity, handleIncreaseQuantity]
	);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	useEffect(() => {
		setFilteredData(filterData(localData, searchText));
	}, [searchText, localData, filterData]);

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			Object.values(debouncedUpdates.current).forEach(clearTimeout);
		};
	}, []);

	const hasItems = filteredData.length > 0;
	const isAddButtonDisabled = !searchText.trim();
	return (
		<View style={styles.container}>
			<ThemedText variant="headline1">Liste de course</ThemedText>

			<View style={styles.textInputContainer}>
				<TextInput
					placeholderTextColor={colors.greyDark02}
					placeholder="Ajouter un nouvel article"
					style={styles.textInput}
					value={searchText}
					onChangeText={setSearchText}
				/>
				<ThemedButton
					text="Ajouter"
					disabled={isAddButtonDisabled}
					style={styles.addBtn}
					onPress={handleAddItem}
				/>
			</View>

			{hasItems && (
				<View style={styles.listContainer}>
					<FlatList
						data={filteredData}
						keyExtractor={(item) => item.id.toString()}
						renderItem={renderListItem}
						style={styles.list}
					/>
				</View>
			)}

			<View style={styles.footerText}>
				<ThemedText color="greyLight">
					Fin de la liste... Si vous ne trouvez pas ce que vous
					voulez, vous pouvez ajouter un nouvel article.
				</ThemedText>
			</View>
		</View>
	);
}
