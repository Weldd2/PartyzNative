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
			) : (
				<></>
			)}
			<View style={{ marginBottom: 40 }}>
				<ThemedText color="greyLight">
					Fin de la liste... Si vous ne trouvez pas ce que vous
					voulez, vous pouvez ajouter un nouvel article.
				</ThemedText>
			</View>
		</View>
	);
}
