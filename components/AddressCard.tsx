import { Card } from '@/components/Card/Card';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import MapScreen from './Map';

type Props = {
	address: string;
};

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		modal: {
			backgroundColor: colors.greyWhite,
			flex: 1,
			position: 'relative',
			borderRadius: 10,
			maxHeight: 600,
		},
		btnContainer: {
			position: 'absolute',
			bottom: 10,
			paddingHorizontal: 15,
			width: '100%',
		},
	});

export default function AddressCard({ address }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	return (
		<>
			<Pressable onPress={toggleModal} style={{ flex: 1 }}>
				<Card icon="map" variant="secondary">
					<Card.Header variant="secondary">À XXXkm</Card.Header>
					<Card.Content>
						<ThemedText style={{ flexShrink: 1 }} color="white">
							{address}
						</ThemedText>
					</Card.Content>
				</Card>
			</Pressable>
			<Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
				<View style={styles.modal}>
					<MapScreen address={address} />

					<View style={styles.btnContainer}>
						<View style={{ flex: 1 }}>
							<ThemedButton
								variant="secondary"
								text="Fermer"
								onPress={toggleModal}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}
