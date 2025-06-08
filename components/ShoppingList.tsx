import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { ShoppingListContribution } from '@/types/ShoppingListContribution';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, View } from 'react-native';
import ThemedButton from './ThemedButton';

type Props = {
	items: ShoppingListItem[];
	userContributions: ShoppingListContribution[];
};

const ITEM_HEIGHT = 40;
const MAX_VISIBLE_ITEMS = 6;
const MAX_ITEMS_BEFORE_BUTTON = 6;

export default function ShoppingList({
	items = [],
	userContributions = [],
}: Props) {
	const colors = useThemeColors();
	const [isExpanded, setIsExpanded] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const styles = createStyles(colors);
	const shouldShowButton = items.length > MAX_ITEMS_BEFORE_BUTTON;
	const collapsedHeight =
		Math.min(items.length, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT;
	const expandedHeight = items.length * ITEM_HEIGHT;
	const targetHeight = isExpanded ? expandedHeight : collapsedHeight;

	useEffect(() => {
		animatedHeight.setValue(collapsedHeight);
	}, [animatedHeight, collapsedHeight]);

	useEffect(() => {
		Animated.timing(animatedHeight, {
			toValue: targetHeight,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [isExpanded, targetHeight, animatedHeight]);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<View style={[styles.container]}>
			<Animated.View style={{ height: animatedHeight }}>
				<FlatList
					data={items}
					scrollEnabled={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<ThemedText variant="body3" style={styles.text}>
								{item.name}
							</ThemedText>
							{userContributions.some(
								(contribution) =>
									contribution.shoppingListItem['@id'] ===
										item['@id'] &&
									item.broughtQuantity !== 0
							) ? (
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
							) : null}
							<ThemedText
								color={
									item.broughtQuantity < item.quantity
										? 'error'
										: 'success'
								}
								style={{ minWidth: 45, textAlign: 'center' }}
							>
								{item.broughtQuantity}/{item.quantity}
							</ThemedText>
							{item.broughtQuantity !== item.quantity ? (
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
							) : null}
						</View>
					)}
					style={styles.list}
				/>
			</Animated.View>
			{shouldShowButton && (
				<ThemedButton
					style={[styles.showMoreButton]}
					onPress={toggleExpanded}
					variant="secondary"
					onPressAnimation={true}
				>
					<ThemedText variant="body3" color="primary">
						{isExpanded
							? 'Voir moins'
							: `Voir plus (${
									items.length - MAX_ITEMS_BEFORE_BUTTON
							  } autres)`}
					</ThemedText>
					<IconSymbol
						name={isExpanded ? 'chevron.up' : 'chevron.down'}
						size={20}
						color={colors.primary}
					/>
				</ThemedButton>
			)}
		</View>
	);
}

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		container: {
			borderRadius: 10,
			borderWidth: 1,
			overflow: 'hidden',
			borderColor: colors.greyDark02,
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
		showMoreButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			gap: 10,
			borderWidth: 0,
			borderTopWidth: 1,
			borderTopColor: colors.greyDark02,
			borderRadius: 0,
		},
		showMoreText: {
			fontSize: 14,
			fontWeight: '500',
		},
	});
