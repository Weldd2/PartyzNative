import ThemedText from '@/components/ThemedText';
import { PartyType } from '@/types/PartyType';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

type Props = {
	party: PartyType;
};

export default function PartyGallery({ party }: Props) {
	return (
		<View style={styles.container}>
			<ThemedText variant="headline1">Gallery is coming soon</ThemedText>
			{/* <ThemedText>Galerie pour la party: {party.title}</ThemedText> */}
		</View>
	);
}
