import { StyleSheet, ScrollView } from 'react-native';
import useThemeColors from '@/hooks/useThemeColors';
import ThemedText from '@/components/ThemedText';
import { Card } from '@/components/Card/Card';
import { useFonts } from 'expo-font';
import UserList from '@/components/UserList';

export default function Index() {
  const colors = useThemeColors();
  const [loaded] = useFonts({
    HossRound: require('../assets/fonts/Hoss Round-Medium.otf'),
  });
  const groupsMember = Array.from({ length: 24 }, (_, k) => ({
    id: k + 1,
    firstname: `John${k}`,
    lastname: `Doe${k}`,
    phoneNumber: `+1234567${k.toString().padStart(4, '0')}`,
    profilePick: new URL(`https://fakeimg.pl/40x40`),
  }));
  const waitingGroupsMember = Array.from({ length: 12 }, (_, k) => ({
    id: k + 1,
    firstname: `John${k}`,
    lastname: `Doe${k}`,
    phoneNumber: `+1234567${k.toString().padStart(4, '0')}`,
    profilePick: new URL(`https://fakeimg.pl/40x40`),
  }));
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.greyWhite }]}
    >
      <ThemedText variant="headline">Coucou !</ThemedText>
      <Card icon="group">
        <Card.Header>
          Liste des participants ({groupsMember.length})
        </Card.Header>
        <Card.Content>
          <UserList data={groupsMember} />
        </Card.Content>
        <Card.SubHeader>
          En attente ({waitingGroupsMember.length})
        </Card.SubHeader>
        <Card.SubContent>
          <UserList variant="sub" data={waitingGroupsMember} />
        </Card.SubContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  wrapper: {
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
});
