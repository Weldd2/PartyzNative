import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { IconSymbol } from './Icon/IconSymbol';
import ThemedButton from './ThemedButton';

type Props = {
	data: ShoppingListItem[];
};

const styles = StyleSheet.create({});

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 15,
			paddingTop: 15,
			flex: 1,
		},
		listContainer: {
			borderRadius: 10,
			borderWidth: 1,
			overflow: 'hidden',
			marginTop: 20,
		},
		list: {
			width: '100%',
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
			paddingLeft: 14,
			backgroundColor: colors.white,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: colors.greyDark02,
		},
		textInput: {
			flex: 1,
			fontSize: 18,
			fontFamily: 'HossRound',
			color: colors.greyDark,
		},
		addBtn: {
			marginTop: 0,
			margin: 0,
			padding: 0,
		},
	});

export default function ShoppingListEdit({ data }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [searchText, setSearchText] = useState('');
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		if (searchText.trim() === '') {
			setFilteredData(data);
		} else {
			const filtered = data.filter((item) =>
				item.name.toLowerCase().includes(searchText.toLowerCase())
			);
			setFilteredData(filtered);
		}
	}, [searchText, data]);

	return (
		<View style={styles.container}>
			<ThemedText variant="headline1">Liste de course</ThemedText>
			<View style={styles.textInputContainer}>
				<TextInput
					autoFocus={true}
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
			<View
				style={[
					styles.listContainer,
					{ borderColor: colors.greyDark02 },
				]}
			>
				<FlatList
					data={filteredData}
					scrollEnabled={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<ThemedText
								variant="body3"
								style={styles.listItemText}
							>
								{item.name}
							</ThemedText>
							<Pressable
								onPress={() => {
									console.log('- 1');
								}}
							>
								<IconSymbol
									name="minus.circle"
									color={colors.error}
									size={25}
								/>
							</Pressable>
							<ThemedText>{item.quantity}</ThemedText>
							<Pressable
								onPress={() => {
									console.log('+ 1');
								}}
							>
								<IconSymbol
									name="plus.circle"
									color={colors.success}
									size={25}
								/>
							</Pressable>
						</View>
					)}
					style={[styles.list]}
				/>
			</View>
		</View>
	);
}
