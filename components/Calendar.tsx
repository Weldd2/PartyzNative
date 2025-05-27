import useThemeColors from '@/hooks/useThemeColors';
import React, { useEffect, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
	monthNames: [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre',
	],
	monthNamesShort: [
		'Janv.',
		'Févr.',
		'Mars',
		'Avr.',
		'Mai',
		'Juin',
		'Juil.',
		'Août',
		'Sept.',
		'Oct.',
		'Nov.',
		'Déc.',
	],
	dayNames: [
		'Dimanche',
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
	],
	dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
	today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

type Props = {
	events: any[];
	date: Date;
};

export default function ScreenCalendar({ date, events }: Props) {
	const [dateSelectionnee, setDateSelectionnee] = useState(
		date.toISOString().split('T')[0]
	);
	const [evenements, setEvenements] = useState({});
	const colors = useThemeColors();

	useEffect(() => {
		const chargerEvenements = () => {
			const markedDates = {};

			// Formater les événements pour le calendrier
			if (events && events.length > 0) {
				events.forEach((evt) => {
					const dateStr = new Date(evt.startDate)
						.toISOString()
						.split('T')[0];
					markedDates[dateStr] = {
						marked: true,
						dotColor: colors.primary,
						// On conserve la sélection si la date est également sélectionnée
						...(dateStr === dateSelectionnee
							? { selected: true }
							: {}),
					};
				});
			}

			setEvenements(markedDates);
		};

		chargerEvenements();
	}, [events, dateSelectionnee, colors.primary]);

	const markedDates = {
		...evenements,
		[dateSelectionnee]: {
			selected: true,
			disableTouchEvent: true,
			// Conserver le point si c'est aussi un événement
			...(evenements[dateSelectionnee]
				? { marked: true, dotColor: colors.primary }
				: {}),
		},
	};

	return (
		<Calendar
			current={date.toISOString().split('T')[0]}
			theme={{
				backgroundColor: colors.primary,
				calendarBackground: colors.greyWhite,
				textSectionTitleColor: colors.primary,
				selectedDayBackgroundColor: colors.primary,
				selectedDayTextColor: colors.white,
				todayTextColor: colors.primary,
				dayTextColor: '#2d4150',
				textDisabledColor: '#d9e1e8',
				arrowColor: colors.primary,
				monthTextColor: colors.primary,
				indicatorColor: colors.primary,
				textDayFontWeight: '300',
				textMonthFontWeight: 'bold',
				textDayHeaderFontWeight: '400',
				textDayFontSize: 18,
				textMonthFontSize: 18,
				textDayHeaderFontSize: 18,
				'stylesheet.day.basic': {
					base: {
						width: 40,
						height: 40,
						alignItems: 'center',
						justifyContent: 'center',
					},
				},
			}}
			onDayPress={(jour) => {
				setDateSelectionnee(jour.dateString);
			}}
			style={{ borderRadius: 10 }}
			markedDates={markedDates}
		/>
	);
}
