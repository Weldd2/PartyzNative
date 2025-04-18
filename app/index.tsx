import { StyleSheet, ScrollView } from 'react-native';
import useThemeColors from '@/hooks/useThemeColors';
import ThemedText from '@/components/ThemedText';
import { Card } from '@/components/Card/Card';
import { useFonts } from 'expo-font';
import UserList from '@/components/UserList';
import PartyListing from '@/components/PartyListing';

export default function Index() {
  const colors = useThemeColors();
  const [loaded] = useFonts({
    HossRound: require('../assets/fonts/Hoss Round-Medium.otf'),
  });
  const partyList = Array.from({ length: 24 }, (_, k) => ({
    id: k + 1,
    name: `Party de John${k}`,
    date: new Date(`2025-${k % 7}-19T11:04:39+00:00`),
    unread: (k % 3) + 3,
  }));
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.greyWhite }]}
    >
      <PartyListing data={partyList} />
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
