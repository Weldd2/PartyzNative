import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type CardSubHeaderProps = {
	children: React.ReactNode;
};

type CardSubContentProps = {
	children: React.ReactNode;
};

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		headerContainer: {
			marginTop: 20,
		},
	});

export function CardSubHeader({ children }: CardSubHeaderProps) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	return (
		<View style={styles.headerContainer}>
			<ThemedText variant="headline3">{children}</ThemedText>
		</View>
	);
}

export function CardSubContent({ children }: CardSubContentProps) {
	return <View>{children}</View>;
}
