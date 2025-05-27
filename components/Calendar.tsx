import useThemeColors from '@/hooks/useThemeColors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
	const [evenementsSelectionnes, setEvenementsSelectionnes] = useState([]);
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

	useEffect(() => {
		// Filtrer les événements pour la date sélectionnée
		const evtsJour = events.filter((evt) => {
			const dateEvt = new Date(evt.startDate).toISOString().split('T')[0];
			return dateEvt === dateSelectionnee;
		});
		setEvenementsSelectionnes(evtsJour);
	}, [dateSelectionnee, events]);

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

	const formatHeure = (dateString) => {
		return new Date(dateString).toLocaleTimeString('fr-FR', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<View>
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

			<View style={styles.evenementsContainer}>
				<Text
					style={[styles.titreEvenements, { color: colors.primary }]}
				>
					Événements du{' '}
					{new Date(dateSelectionnee).toLocaleDateString('fr-FR')}
				</Text>
				{evenementsSelectionnes.length > 0 ? (
					evenementsSelectionnes.map((evt, index) => (
						<View
							key={index}
							style={[
								styles.evenementItem,
								{ borderLeftColor: colors.primary },
							]}
						>
							<Text
								style={[
									styles.heureEvenement,
									{ color: colors.primary },
								]}
							>
								{formatHeure(evt.startDate)}
								{evt.endDate &&
									` - ${formatHeure(evt.endDate)}`}
							</Text>
							<Text style={styles.nomEvenement}>
								{evt.title || evt.name || 'Événement'}
							</Text>
							{evt.description && (
								<Text style={styles.descriptionEvenement}>
									{evt.description}
								</Text>
							)}
						</View>
					))
				) : (
					<Text style={styles.aucunEvenement}>
						Aucun événement ce jour-là
					</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	evenementsContainer: {
		marginTop: 20,
		paddingHorizontal: 10,
	},
	titreEvenements: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	evenementItem: {
		backgroundColor: '#f8f9fa',
		padding: 15,
		marginBottom: 10,
		borderRadius: 8,
		borderLeftWidth: 4,
	},
	heureEvenement: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 5,
	},
	nomEvenement: {
		fontSize: 16,
		fontWeight: '500',
		color: '#2d4150',
		marginBottom: 5,
	},
	descriptionEvenement: {
		fontSize: 14,
		color: '#666',
		fontStyle: 'italic',
	},
	aucunEvenement: {
		fontSize: 14,
		color: '#999',
		textAlign: 'center',
		padding: 20,
	},
});
