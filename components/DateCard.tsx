import ScreenCalendar from '@/components/Calendar';
import { Card } from '@/components/Card/Card';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { PartyType } from '@/types/PartyType';
import * as Calendar from 'expo-calendar';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		modal: {
			backgroundColor: colors.greyWhite,
			position: 'relative',
			borderRadius: 10,
			gap: 10,
		},
		btnContainer: {
			paddingHorizontal: 15,
			paddingBottom: 15,
		},
	});

type Props = {
	party: PartyType;
};

export default function DateCard({ party }: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [isModalVisible, setModalVisible] = useState(false);
	const [events, setEvents] = useState([]);
	const dateObj = new Date(party.date);
	const daysLeft = Math.ceil(
		(dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const getEvents = async () => {
		const { status } = await Calendar.requestCalendarPermissionsAsync();
		if (status === 'granted') {
			const calendriers = await Calendar.getCalendarsAsync(
				Calendar.EntityTypes.EVENT
			);
			const calendrierDefaut =
				calendriers.find((cal) => cal.allowsModifications) ||
				calendriers[0];

			const debut = new Date();
			const fin = new Date(party.date);
			fin.setDate(fin.getDate() + 30); // Prochains 30 jours

			const evenements = await Calendar.getEventsAsync(
				[calendrierDefaut.id],
				debut,
				fin
			);
			return evenements;
		} else {
			console.log('Permission refusée pour accéder au calendrier');
			return [];
		}
	};

	const createEvent = async (party: PartyType) => {
		const { status } = await Calendar.requestCalendarPermissionsAsync();
		if (status === 'granted') {
			const calendriers = await Calendar.getCalendarsAsync(
				Calendar.EntityTypes.EVENT
			);
			const calendrierDefaut =
				calendriers.find((cal) => cal.isPrimary) || calendriers[0];

			const evenement = {
				title: party.title,
				startDate: new Date(party.date),
				endDate: new Date(
					new Date(party.date).getTime() + 3 * 60 * 60 * 1000
				),
				timeZone: 'Europe/Paris',
				location: party.address,
			};

			try {
				const idEvenement = await Calendar.createEventAsync(
					calendrierDefaut.id,
					evenement
				);
				Alert.alert('Success', 'Évènement créé avec succès.', [
					{
						text: 'OK',
						onPress: toggleModal,
					},
				]);
				console.log("Événement créé avec l'ID :", idEvenement);
			} catch (e) {
				console.error("Erreur lors de la création de l'événement :", e);
			}
		} else {
			console.log('Permission refusée pour accéder au calendrier');
		}
	};

	useEffect(() => {
		const loadEvents = async () => {
			const eventsList = await getEvents();
			setEvents(eventsList);
		};

		if (isModalVisible) {
			loadEvents();
		}
	}, [isModalVisible]);

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
				<View style={styles.modal}>
					<ScreenCalendar
						date={new Date(party.date)}
						events={events}
					/>
					<View style={styles.btnContainer}>
						<ThemedButton
							onPress={() => createEvent(party)}
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
