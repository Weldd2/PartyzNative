import useThemeColors from '@/hooks/useThemeColors';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import ThemedButton from './ThemedButton';
import ThemedText from './ThemedText';

type Props = {
	data: ShoppingListItem[];
};

export default function ShoppingList({ data }: Props) {
	const [expanded, setExpanded] = useState(false);
	const colors = useThemeColors();

	if (!data) return <></>;

	// Paramètres selon la variante
	const config = {
		itemHeight: 40,
		collapsedCount: 5,
		showStar: true,
		listItemStyle: {
			height: 40,
		},
	};

	const styles = createStyles(colors, config);

	const expandedHeight = (data.length + 1) * config.itemHeight + 5;
	const collapsedHeight =
		Math.min(data.length + 1, config.collapsedCount + 1) *
		(config.itemHeight + 1);
	const height = useSharedValue(collapsedHeight);

	useEffect(() => {
		height.value = withTiming(expanded ? expandedHeight : collapsedHeight, {
			duration: 350,
		});
	}, [expanded, expandedHeight, collapsedHeight]);

	const animatedStyle = useAnimatedStyle(() => ({
		height: height.value,
		overflow: 'hidden',
	}));

	const displayData = expanded ? data : data.slice(0, config.collapsedCount);

	return (
		<Animated.View style={[animatedStyle]}>
			<FlatList
				style={styles.list}
				data={displayData}
				scrollEnabled={false}
				renderItem={({ item }) => (
					<View style={[styles.listItem, config.listItemStyle]}>
						<ThemedText variant="body3" style={{ flex: 1 }}>
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
				keyExtractor={(item) => item.id.toString()}
			/>
			{data.length > 7 && (
				<ThemedButton
					variant="primary"
					onPress={() => setExpanded((prev) => !prev)}
					text={expanded ? 'Voir moins' : 'Voir plus'}
				/>
			)}
		</Animated.View>
	);
}

const createStyles = (
	colors: {
		white: string;
		primary: string;
		greyDark02: string;
		greyWhite: string;
	},
	config: {
		listItemStyle: { height: number };
	}
) =>
	StyleSheet.create({
		list: {
			borderRadius: 10,
			borderWidth: 1,
			borderColor: colors.greyDark02,
		},
		listItem: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 10,
			gap: 10,
			flex: 1,
			...config.listItemStyle,
		},
		profilePick: {
			borderColor: colors.primary,
			borderRadius: 100,
			width: 30,
			height: 30,
			borderWidth: 1.5,
		},
	});
