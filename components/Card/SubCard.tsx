import useThemeColors from '@/hooks/useThemeColors';
import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import React from 'react';

type CardSubHeaderProps = {
	children: React.ReactNode;
};

type CardSubContentProps = {
	children: React.ReactNode;
};

const createStyles = (colors: { white: string }) =>
	StyleSheet.create({
		headerContainer: {
			marginBottom: 10,
			marginTop: 20,
		},
	});

export function CardSubHeader({ children }: CardSubHeaderProps) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	return (
		<View style={styles.headerContainer}>
			<ThemedText variant="headline">{children}</ThemedText>
		</View>
	);
}

export function CardSubContent({ children }: CardSubContentProps) {
	return <View>{children}</View>;
}
