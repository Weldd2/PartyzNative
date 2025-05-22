import { IconSymbol } from '@/components/IconSymbol';
import useThemeColors from '@/hooks/useThemeColors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

const createStyles = (colors: {
	white: string;
	primary: string;
	third: string;
	greyDark02: string;
	greyWhite: string;
}) =>
	StyleSheet.create({
		navigationContainer: {
			flexDirection: 'row',
			paddingHorizontal: 15,
			justifyContent: 'space-between',
			flex: 1,
			paddingVertical: 20,
			gap: 10,
		},
		navigationItem: {
			backgroundColor: colors.white,
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10,
			borderRadius: 10,
			borderColor: colors.primary,
			borderWidth: 1,
		},
		active: {
			flex: 1,
		},
	});

export default function NavigationBar() {
	const colors = useThemeColors();
	const style = createStyles(colors);
	const [active, setActive] = useState('information');
	return (
		<View style={style.navigationContainer}>
			<Pressable
				style={[
					style.navigationItem,
					active === 'information' && style.active,
				]}
				onPress={() => setActive('information')}
			>
				<IconSymbol
					size={30}
					color={colors.primary}
					name={'info.circle'}
				/>
				{active === 'information' && (
					<ThemedText>Informations</ThemedText>
				)}
			</Pressable>
			<Pressable
				style={[
					style.navigationItem,
					active === 'messages' && style.active,
				]}
				onPress={() => setActive('messages')}
			>
				<IconSymbol size={30} color={colors.primary} name={'message'} />
				{active === 'messages' && <ThemedText>Messages</ThemedText>}
			</Pressable>
			<Pressable
				style={[
					style.navigationItem,
					active === 'galerie' && style.active,
				]}
				onPress={() => setActive('galerie')}
			>
				<IconSymbol size={30} color={colors.primary} name={'photo'} />
				{active == 'galerie' && <ThemedText>Galerie</ThemedText>}
			</Pressable>
		</View>
	);
}
