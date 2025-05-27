import { Card } from '@/components/Card/Card';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
	date: string;
};

const createStyles = (colors: { greyWhite: string; primary: string }) =>
	StyleSheet.create({
		modal: {
			backgroundColor: 'transparent',
			flex: 1,
			position: 'relative',
			maxHeight: 600,
			borderRadius: 10,
		},
	});

export default function DateCard({ date }: Props) {
	const colors = useThemeColors();
	const style = createStyles(colors);
	const [isModalVisible, setModalVisible] = useState(false);
	const dateObj = new Date(date);
	const daysLeft = Math.ceil(
		(dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const formattedDate = dateObj.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
	return (
		<>
			<Pressable onPress={toggleModal} style={{ flex: 1 }}>
				<Card icon="calendar" variant="secondary">
					<Card.Header variant="secondary">
						J-{daysLeft} {daysLeft > 7 ? '⌛' : '🔥'}
					</Card.Header>
					<Card.Content>
						<ThemedText style={{ flexShrink: 1 }} color="white">
							{formattedDate}
						</ThemedText>
					</Card.Content>
				</Card>
			</Pressable>

			<Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
				<View style={style.modal}>
					<ThemedText>{date}</ThemedText>
					<ThemedButton
						variant="secondary"
						text="Fermer"
						onPress={toggleModal}
					/>
				</View>
			</Modal>
		</>
	);
}
