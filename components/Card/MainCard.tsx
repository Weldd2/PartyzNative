import useThemeColors from '@/hooks/useThemeColors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';

type CardHeaderProps = {
	children: React.ReactNode;
};

type CardContentProps = {
	children: React.ReactNode;
};

const createStyles = (colors: { white: string }) =>
	StyleSheet.create({
		headerContainer: {
			marginBottom: 20,
		},
	});

export function CardHeader({ children }: CardHeaderProps) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	return (
		<View style={styles.headerContainer}>
			<ThemedText variant="headline">{children}</ThemedText>
		</View>
	);
}

export function CardContent({ children }: CardContentProps) {
	return <View>{children}</View>;
}
