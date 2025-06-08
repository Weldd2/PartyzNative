import ScreenCalendar from '@/components/Calendar';
import { Card } from '@/components/Card/Card';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import usePressEffects from '@/hooks/usePressEffects';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		modal: {
			backgroundColor: colors.neutral100,
			position: 'relative',
			borderRadius: 10,
			gap: 10,
		},
		btnContainer: {
			paddingHorizontal: 15,
			paddingBottom: 15,
			gap: 10,
		},
	});

type Props = {
	party: PartyType;
};

export default function DateCard({ party }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [isModalVisible, setModalVisible] = useState(false);
	const { events, createEvent } = useCalendarEvents(party, isModalVisible);
	const dateObj = new Date(party.date);
	const { getAnimationStyle, handlePressIn } = usePressEffects();
	const daysLeft = Math.ceil(
		(dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	const toggleModal = useCallback(() => {
		setModalVisible(!isModalVisible);
	}, [isModalVisible]);

	const handleCreateEvent = useCallback(() => {
		createEvent(toggleModal);
	}, [createEvent, toggleModal]);

	const formattedDate = dateObj.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<>
			<Pressable
				onPress={toggleModal}
				onPressIn={handlePressIn}
				style={({ pressed }: { pressed: boolean }) => [
					getAnimationStyle(pressed),
					{ flex: 1 },
				]}
			>
				<Card icon="calendar" variant="secondary">
					<Card.Header variant="secondary">
						J-{daysLeft} {daysLeft > 7 ? '⌛' : '🔥'}
					</Card.Header>
					<Card.Content>
						<ThemedText
							style={{ flexShrink: 1 }}
							color="neutral100"
						>
							{formattedDate}
						</ThemedText>
					</Card.Content>
				</Card>
			</Pressable>

			<Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
				<View style={styles.modal}>
					<ScreenCalendar
						date={new Date(party.date)}
						events={events}
					/>
					<View style={styles.btnContainer}>
						<ThemedButton
							onPress={handleCreateEvent}
							variant="primary"
							text="Ajouter au Calendrier"
						/>
						<ThemedButton
							variant="secondary"
							text="Fermer"
							onPress={toggleModal}
						/>
					</View>
				</View>
			</Modal>
		</>
	);
}
