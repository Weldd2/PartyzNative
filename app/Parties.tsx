import { Card } from '@/components/Card/Card';
import Header from '@/components/Header';
import UserList from '@/components/UserList';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
	viewContainer: {
		paddingHorizontal: 15,
	},
});

export default function Parties() {
	const user = {
		id: 1,
		firstname: 'antoine',
		lastname: 'mura',
		phoneNumber: '+33782280686',
	};
	return (
		<>
			<SafeAreaView>
				<Header user={user} />
				<View style={style.viewContainer}>
					<Card icon="person.2.fill">
						<Card.Header>Main Title</Card.Header>
						<Card.Content>
							<UserList data={[]} />
						</Card.Content>

						<Card.SubHeader>Sub Section</Card.SubHeader>
						<Card.SubContent>
							<UserList data={[]} />
						</Card.SubContent>
					</Card>
				</View>
			</SafeAreaView>
		</>
	);
}
