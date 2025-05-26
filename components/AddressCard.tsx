import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { Card } from './Card/Card';

type Props = {
	address: string;
};

export default function AddressCard({ address }: Props) {
	const colors = useThemeColors();
	return (
		<Card icon="map" variant="secondary">
			<Card.Header variant="secondary">À XXXkm</Card.Header>
			<Card.Content>
				<ThemedText style={{ flexShrink: 1 }} color="white">
					{address}
				</ThemedText>
			</Card.Content>
		</Card>
	);
}
