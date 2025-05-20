import DanseurSvg from '@/assets/images/danseur.svg';
import Logo from '@/components/Logo';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	homeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 15,
		gap: 40,
	},
	logoContainer: {
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	btnContainer: {
		alignSelf: 'stretch',
	},
	danseur: {},
});

export default function Home() {
	const navigation = useNavigation();

	return (
		<>
			<View style={style.homeContainer}>
				<View style={style.logoContainer}>
					<Logo variant="big" />
					<ThemedText>
						Facilite l&apos;organisation de vos soirées
					</ThemedText>
				</View>
				<View style={style.btnContainer}>
					<ThemedButton
						variant="secondary"
						text="J'ai déjà un compte"
					/>
					<ThemedButton
						onPress={() => navigation.navigate('Parties')}
						text="S'inscrire"
					/>
				</View>
				<DanseurSvg style={style.danseur} />
			</View>
		</>
	);
}
