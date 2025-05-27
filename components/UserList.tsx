import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { UserType } from '@/types/UserType';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IconSymbol } from './IconSymbol';

type Props = {
	owner: UserType;
	members: UserType[];
};

const ITEM_HEIGHT = 40;
const MAX_VISIBLE_ITEMS = 6;

export default function UserList({ owner, members }: Props) {
	const colors = useThemeColors();
	const count = members.length + (owner ? 1 : 0);

	const listHeight = Math.min(count, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT;

	console.log([owner, ...members]);
	return (
		<View style={[styles.container, { borderColor: colors.greyDark02 }]}>
			<FlatList
				data={[owner, ...members]}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<IconSymbol
							name="person.crop.circle"
							size={30}
							color={
								item.id === owner.id
									? colors.success
									: colors.primary
							}
						/>
						<ThemedText variant="body3" style={styles.text}>
							{item.firstname} {item.lastname.charAt(0)}.
						</ThemedText>
						<ThemedText>
							{item.id === owner.id ? '👑' : ''}
						</ThemedText>
					</View>
				)}
				style={[styles.list, { height: listHeight }]}
				scrollEnabled={members.length > MAX_VISIBLE_ITEMS}
				showsVerticalScrollIndicator={
					members.length > MAX_VISIBLE_ITEMS
				}
			/>
		</View>
	);
}

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
