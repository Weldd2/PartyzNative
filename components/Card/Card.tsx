import { CardContent, CardHeader } from '@/components/Card/MainCard';
import { CardSubContent, CardSubHeader } from '@/components/Card/SubCard';
import { IconSymbol, IconSymbolName } from '@/components/Icon/IconSymbol';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import useThemeShadows from '@/hooks/useThemeShadows';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const createStyles = (variant: string, colors: ColorsType) =>
	StyleSheet.create({
		card: {
			marginTop: 30,
			flex: 1,
		},
		cardImage: {
			padding: 10,
			margin: 0,
			borderRadius: 100,
			position: 'absolute',
			backgroundColor:
				variant === 'primary' ? colors.white : colors.primary,
			top: -20,
			left: 30,
		},
		cardWrapper: {
			backgroundColor:
				variant === 'primary' ? colors.white : colors.primary,
			paddingHorizontal: 20,
			paddingTop: 40,
			height: '100%',
			overflow: 'hidden',
			paddingBottom: 20,
			borderRadius: 10,
		},
		headerContainer: {
			marginBottom: 20,
		},
	});

// Type pour le composant principal
type CardRootProps = ViewProps & {
	variant?: 'primary' | 'secondary';
	icon: IconSymbolName;
	children: React.ReactNode;
};

// Composant principal
function CardRoot({
	variant = 'primary',
	style,
	children,
	icon,
	...rest
}: CardRootProps) {
	const colors = useThemeColors();
	const shadow = useThemeShadows();
	const styles = createStyles(variant, colors);

	return (
		<View style={[styles.card]}>
			<View style={[styles.cardImage, shadow.dp25]}>
				<IconSymbol
					size={40}
					color={
						variant === 'secondary' ? colors.white : colors.primary
					}
					name={icon}
				/>
			</View>
			<View style={[style, styles.cardWrapper, shadow.dp25]} {...rest}>
				<View style={[styles.cardImage]}>
					<IconSymbol
						size={40}
						color={
							variant === 'secondary'
								? colors.white
								: colors.primary
						}
						name={icon}
					/>
				</View>
				<View>{children}</View>
			</View>
		</View>
	);
}

// Création du composant composé
export const Card = Object.assign(CardRoot, {
	Header: CardHeader,
	Content: CardContent,
	SubHeader: CardSubHeader,
	SubContent: CardSubContent,
});
