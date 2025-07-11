import { IconSymbol } from '@/components/Icon/IconSymbol';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ThemedText from './ThemedText';

interface Route {
	key: string;
	title: string;
	icon: string;
}

interface TabBarProps {
	routes: Route[];
	index: number;
	onIndexChange: (index: number) => void;
}
const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		navbar: {
			flexDirection: 'row',
			paddingHorizontal: 15,
			gap: 10,
			marginVertical: 20,
		},
		navItem: {
			gap: 10,
			borderWidth: 1,
			borderColor: colors.primary700,
			backgroundColor: colors.neutral100,
			flexDirection: 'row',
			borderRadius: 10,
			padding: 6,
		},
		activeItem: {
			flex: 1,
		},
	});

export default function TabBar({ routes, index, onIndexChange }: TabBarProps) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	return (
		<View style={styles.navbar}>
			{routes.map((route, i) => {
				const isActive = index === i;
				return (
					<TouchableOpacity
						key={route.key}
						style={[
							styles.navItem,
							isActive ? styles.activeItem : '',
						]}
						onPress={() => onIndexChange(i)}
					>
						<IconSymbol
							name={route.icon as any}
							size={24}
							color={colors.primary700}
						/>
						{isActive && <ThemedText>{route.title}</ThemedText>}
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
