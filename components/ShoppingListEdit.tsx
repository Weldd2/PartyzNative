import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import { createApiMutation } from '@/hooks/useApi';
import useThemeColors from '@/hooks/useThemeColors';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import { useEffect, useRef, useState } from 'react';
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
		},
		list: {
			// flex: 1,
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
	});

export default function ShoppingListEdit({ data }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [searchText, setSearchText] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	const [localData, setLocalData] = useState(data);

	// Référence pour stocker les timeouts de débouncement
	const debouncedUpdates = useRef<{ [key: number]: NodeJS.Timeout }>({});
	// État pour stocker les mises à jour en attente
	const pendingUpdates = useRef<{ [key: number]: number }>({});

	const updateItem = createApiMutation<
		ShoppingListItem,
		{ quantity: number }
	>('PATCH');

	const performApiUpdate = async (
		item: ShoppingListItem,
		quantity: number
	) => {
		try {
			await updateItem(`/shopping_list_items/${item.id}`, {
				quantity: quantity,
			});
			// Clean the waiting update after success
			delete pendingUpdates.current[item.id];
		} catch (error) {
			console.error('Erreur lors de la mise à jour:', error);

			// Rollback to previous quantity
			const updatedData = localData.map((localItem) =>
				localItem.id === item.id
					? { ...localItem, quantity: item.quantity }
					: localItem
			);

			setLocalData(updatedData);

			delete pendingUpdates.current[item.id];
			Alert.alert('Erreur', 'Impossible de mettre à jour la quantité');
		}
	};

	// debounce
	const updateItemQuantity = (
		item: ShoppingListItem,
		newQuantity: number
	) => {
		if (newQuantity < 0) return;

		// Optimistic update
		const updatedData = localData.map((localItem) =>
			localItem.id === item.id
				? { ...localItem, quantity: newQuantity }
				: localItem
		);

		setLocalData(updatedData);
		pendingUpdates.current[item.id] = newQuantity;
		if (debouncedUpdates.current[item.id]) {
			clearTimeout(debouncedUpdates.current[item.id]);
		}
		debouncedUpdates.current[item.id] = setTimeout(() => {
			const finalQuantity = pendingUpdates.current[item.id];
			if (finalQuantity !== undefined) {
				performApiUpdate(item, finalQuantity);
			}
			delete debouncedUpdates.current[item.id];
		}, 1000);
	};

	// Clear timeouts when component unmounts
	useEffect(() => {
		return () => {
			Object.values(debouncedUpdates.current).forEach((timeout) => {
				clearTimeout(timeout);
			});
		};
	}, []);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	useEffect(() => {
		if (searchText.trim() === '') {
			setFilteredData(localData);
		} else {
			const filtered = localData.filter((item) =>
				item.name.toLowerCase().includes(searchText.toLowerCase())
			);
			setFilteredData(filtered);
		}
	}, [searchText, localData]);

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
					disabled={searchText ? false : true}
					style={styles.addBtn}
				/>
			</View>
			{filteredData.length ? (
				<View style={[styles.listContainer, { flex: 1 }]}>
					<FlatList
						data={filteredData}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => {
							return (
								<View style={styles.listItem}>
									<ThemedText
										variant="body3"
										style={styles.listItemText}
									>
										{item.name}
									</ThemedText>
									<Pressable
										onPress={() => {
											const newQuantity =
												item.quantity > 1
													? item.quantity - 1
													: 0;
											updateItemQuantity(
												item,
												newQuantity
											);
										}}
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
									<ThemedText>{item.quantity}</ThemedText>
									<Pressable
										onPress={() => {
											updateItemQuantity(
												item,
												item.quantity + 1
											);
										}}
									>
										<IconSymbol
											name="plus.circle"
											color={colors.success}
											size={25}
										/>
									</Pressable>
								</View>
							);
						}}
						style={[styles.list]}
					/>
				</View>
			) : null}
			<View style={{ marginBottom: 40 }}>
				<ThemedText color="greyLight">
					Fin de la liste... Si vous ne trouvez pas ce que vous
					voulez, vous pouvez ajouter un nouvel article.
				</ThemedText>
			</View>
		</View>
	);
}
