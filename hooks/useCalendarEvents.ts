import { PartyType } from '@/types/PartyType';
import * as Calendar from 'expo-calendar';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useCalendarEvents = (party: PartyType, isModalVisible: boolean) => {
	const [events, setEvents] = useState<Calendar.Event[]>([]);

	const getEvents = useCallback(async () => {
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
			fin.setDate(fin.getDate() + 30);

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
	}, [party]);

	const createEvent = useCallback(
		async (onSuccess: () => void) => {
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
							onPress: onSuccess,
						},
					]);
					console.log("Événement créé avec l'ID :", idEvenement);
				} catch (e) {
					console.error(
						"Erreur lors de la création de l'événement :",
						e
					);
				}
			} else {
				console.log('Permission refusée pour accéder au calendrier');
			}
		},
		[party]
	);

	useEffect(() => {
		const loadEvents = async () => {
			const eventsList = await getEvents();
			setEvents(eventsList);
		};

		if (isModalVisible) {
			loadEvents();
		}
	}, [getEvents, isModalVisible]);

	return {
		events,
		createEvent,
	};
};
