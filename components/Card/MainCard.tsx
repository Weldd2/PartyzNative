import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';

type CardHeaderProps = {
	variant?: 'primary' | 'secondary';
	children: React.ReactNode;
};

type CardContentProps = {
	children: React.ReactNode;
};

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		headerContainer: {},
	});

export function CardHeader({ variant, children }: CardHeaderProps) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	return (
		<View style={styles.headerContainer}>
			<ThemedText
				color={variant === 'secondary' ? 'neutral100' : 'primary500'}
				variant="headline2"
			>
				{children}
			</ThemedText>
		</View>
	);
}

export function CardContent({ children }: CardContentProps) {
	return <View>{children}</View>;
}
