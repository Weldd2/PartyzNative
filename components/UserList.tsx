import { FlatList, StyleSheet, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import ThemedText from './ThemedText';
import { UserType } from '@/types/UserType';
import useThemeColors from '@/hooks/useThemeColors';
import { IconSymbol } from './IconSymbol';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import ThemedButton from './ThemedButton';

type UserListVariant = 'main' | 'sub';

type Props = {
	data: Array<UserType>;
	variant?: UserListVariant;
};

export default function UserList({ data, variant = 'main' }: Props) {
	const [expanded, setExpanded] = useState(false);
	const colors = useThemeColors();

	// Paramètres selon la variante
	const config = {
		main: {
			itemHeight: 40,
			collapsedCount: 5,
			showStar: true,
			listItemStyle: {
				height: 40,
			},
		},
		sub: {
			itemHeight: 40,
			collapsedCount: 3,
			showStar: false,
			listItemStyle: {
				height: 40,
			},
		},
	}[variant];

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
						<Image
							source={{ uri: item.profilePick.toString() }}
							style={styles.profilePick}
						/>
						<ThemedText variant="body3" style={{ flex: 1 }}>
							{item.firstname} {item.lastname.substring(0, 1)}
						</ThemedText>
						{config.showStar && item.id === 1 ? (
							<IconSymbol
								size={20}
								color={colors.primary}
								name="star"
							/>
						) : null}
					</View>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
			{data.length > 7 && (
				<ThemedButton
					variant={variant === 'main' ? 'primary' : 'primary2'}
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
