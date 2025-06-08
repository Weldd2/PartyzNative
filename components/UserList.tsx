import { IconSymbol } from '@/components/Icon/IconSymbol';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { UserType } from '@/types/UserType';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import ThemedButton from './ThemedButton';

type Props = {
	owner: UserType;
	members: UserType[];
};

const ITEM_HEIGHT = 40;
const MAX_VISIBLE_ITEMS = 6;
const MAX_ITEMS_BEFORE_BUTTON = 6;

export default function UserList({ owner, members }: Props) {
	const colors = useThemeColors();
	const [isExpanded, setIsExpanded] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const styles = createStyles(colors);
	const count = members.length + (owner ? 1 : 0);
	const shouldShowButton = count > MAX_ITEMS_BEFORE_BUTTON;
	const collapsedHeight = Math.min(count, MAX_VISIBLE_ITEMS) * ITEM_HEIGHT;
	const expandedHeight = count * ITEM_HEIGHT;
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
					data={[owner, ...members]}
					scrollEnabled={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<IconSymbol
								name="person.crop.circle"
								size={30}
								color={
									item.id === owner.id
										? colors.success500
										: colors.primary700
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
					style={styles.list}
				/>
			</Animated.View>
			{shouldShowButton && (
				<ThemedButton
					style={[styles.showMoreButton]}
					onPress={toggleExpanded}
					variant="secondary"
					onPressAnimation={false}
				>
					<ThemedText variant="body3" color="primary700">
						{isExpanded
							? 'Voir moins'
							: `Voir plus (${
									count - 1 - MAX_ITEMS_BEFORE_BUTTON
							  } autres)`}
					</ThemedText>
					<IconSymbol
						name={isExpanded ? 'chevron.up' : 'chevron.down'}
						size={20}
						color={colors.primary700}
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
			borderColor: colors.neutral500,
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
			borderTopColor: colors.neutral500,
			borderRadius: 0,
		},
		showMoreText: {
			fontSize: 14,
			fontWeight: '500',
		},
	});
