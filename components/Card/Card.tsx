import useThemeColors from '@/hooks/useThemeColors';
import { StyleSheet, View, ViewProps } from 'react-native';
import { IconSymbol, IconSymbolName } from '../IconSymbol';
import React from 'react';
import useThemeShadows from '@/hooks/useThemeShadows';
import { CardHeader, CardContent } from './MainCard';
import { CardSubContent, CardSubHeader } from './SubCard';

const createStyles = (colors: { white: string }) =>
  StyleSheet.create({
    card: {
      marginTop: 30,
    },
    cardImage: {
      padding: 20,
      borderRadius: 100,
      position: 'absolute',
      backgroundColor: colors.white,
      top: -20,
      left: 30,
    },
    cardWrapper: {
      backgroundColor: colors.white,
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 20,
      borderRadius: 10,
    },
    headerContainer: {
      marginBottom: 20,
    },
  });

// Type pour le composant principal
type CardRootProps = ViewProps & {
  icon: IconSymbolName;
  children: React.ReactNode;
};

// Composant principal
function CardRoot({ style, children, icon, ...rest }: CardRootProps) {
  const colors = useThemeColors();
  const shadow = useThemeShadows();
  const styles = createStyles(colors);

  return (
    <View style={[styles.card]}>
      <IconSymbol
        size={30}
        color="#808080"
        name={icon}
        style={[styles.cardImage, shadow.dp25]}
      />
      <View style={[style, styles.cardWrapper, shadow.dp25]} {...rest}>
        <IconSymbol
          size={30}
          color={colors.primary}
          name={icon}
          style={[styles.cardImage]}
        />
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
