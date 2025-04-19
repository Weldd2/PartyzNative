import { FlatList, View, StyleSheet } from 'react-native';
import ThemedText from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import useThemeColors from '@/hooks/useThemeColors';
import useThemeShadows from '@/hooks/useThemeShadows';
import { PartyType } from '@/type/PartyType';
import Logo from '@/components/Logo';

export default function Home() {
  const partyList: PartyType[] = Array.from({ length: 24 }, (_, k) => ({
    id: k + 1,
    name: `Party de John${k}`,
    date: new Date(`2025-0${(k % 7) + 1}-19T11:04:39+00:00`),
    unread: (k % 3) + 3,
  }));

  const colors = useThemeColors();
  const shadows = useThemeShadows();
  const styles = createStyles(colors, shadows);

  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const upcomingParties = partyList
    .filter((item) => item.date.getTime() >= now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const pastParties = partyList
    .filter(
      (item) =>
        item.date.getTime() < now.getTime() &&
        item.date.getTime() >= oneMonthAgo.getTime()
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const flatData = [
    { type: 'header', title: 'Soirées à venir' },
    ...upcomingParties.map((item) => ({ type: 'party', ...item })),
    { type: 'header', title: 'Soirées passées' },
    ...pastParties.map((item) => ({ type: 'party', ...item })),
    { type: 'footer' },
  ];

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'header') {
      return <ThemedText variant="headline">{item.title}</ThemedText>;
    }
    if (item.type === 'footer') {
      return <ThemedButton text="Voir toutes les soirées passées" />;
    }
    const isPast = item.date.getTime() < now.getTime();
    const daysDiff = Math.abs(
      Math.ceil((item.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );
    let badgeText = '';
    let emoji = '';

    if (isPast) {
      badgeText = `il y a ${daysDiff} jours`;
      if (daysDiff <= 1) emoji = '💥';
      else if (daysDiff <= 7) emoji = '😎';
      else emoji = '';
    } else {
      badgeText = `J-${daysDiff}`;
      if (daysDiff <= 1) emoji = '🔥';
      else if (daysDiff <= 7) emoji = '🎉';
      else if (daysDiff <= 31) emoji = '⏰';
      else emoji = '🤞';
    }

    return (
      <View style={styles.partyItem}>
        <View>
          <ThemedText>{item.name}</ThemedText>
          <ThemedText variant="sub">
            {item.date.toLocaleDateString()}
          </ThemedText>
        </View>
        <View style={styles.partyItemRight}>
          <ThemedText variant="body3">
            {badgeText} {emoji}
          </ThemedText>
          <View style={styles.unreadBadge}>
            <ThemedText>{item.unread}</ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={flatData}
      renderItem={renderItem}
      keyExtractor={(_, idx) => idx.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<Logo />}
    />
  );
}

const createStyles = (colors: any, shadows: any) =>
  StyleSheet.create({
    listContent: {
      paddingVertical: 25,
    },
    partyItem: {
      ...shadows.dp30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
      backgroundColor: colors.white,
      height: 62,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    partyItemRight: {
      alignItems: 'flex-end',
    },
    unreadBadge: {
      width: 20,
      height: 20,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
  });
