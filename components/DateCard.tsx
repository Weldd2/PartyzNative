import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { Card } from './Card/Card';

type Props = {
	date: string;
};

export default function DateCard({ date }: Props) {
	const colors = useThemeColors();
	const dateObj = new Date(date);
	const daysLeft = Math.ceil(
		(dateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);
	const formattedDate = dateObj.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
	return (
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
	);
}
