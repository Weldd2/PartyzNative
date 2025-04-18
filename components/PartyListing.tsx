import { PartyType } from '@/type/PartyType';
import ThemedText from './ThemedText';
import { FlatList, View, StyleSheet } from 'react-native';
import useThemeColors from '@/hooks/useThemeColors';
import useThemeShadows from '@/hooks/useThemeShadows';
import ThemedButton from './ThemedButton';

type Props = {
  data: Array<PartyType>;
};

const createStyles = (colors: {
  white: string;
  primary: string;
  greyWhite: string;
  greyDark: string;
  greyDark02: string;
  secondary: string;
}) =>
  StyleSheet.create({
    list: {
      marginBottom: 20,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: colors.white,
      flex: 1,
      height: 62,
    },
    listItemContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    listItemLeft: {
      alignSelf: 'flex-start',
    },
    unread: {
      width: 20,
      height: 20,
      backgroundColor: colors.secondary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
  });

export default function PartyListing({ data }: Props) {
  const colors = useThemeColors();
  const shadows = useThemeShadows();
  const styles = createStyles(colors);

  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const upcomingParties = data
    .filter((item) => item.date.getTime() >= now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const pastParties = data
    .filter(
      (item) =>
        item.date.getTime() < now.getTime() &&
        item.date.getTime() >= oneMonthAgo.getTime()
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const renderParty = ({ item }: { item: PartyType }) => {
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
      <View style={[shadows.dp30, styles.listItem]}>
        <View style={[styles.listItemContainer]}>
          <ThemedText>{item.name}</ThemedText>
          <ThemedText variant="sub" style={[styles.listItemLeft]}>
            {item.date.toLocaleDateString()}
          </ThemedText>
        </View>
        <View style={[styles.listItemContainer]}>
          <ThemedText variant="body3">
            {badgeText} {emoji}
          </ThemedText>
          <View style={[styles.unread]}>
            <ThemedText>{item.unread}</ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ThemedText variant="headline">Soirées à venir</ThemedText>
      <FlatList
        data={upcomingParties}
        scrollEnabled={true}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.list}
        renderItem={renderParty}
        keyExtractor={(item) => item.id.toString()}
      />
      <ThemedText variant="headline">Soirées passées</ThemedText>
      <FlatList
        data={pastParties}
        scrollEnabled={true}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.list}
        renderItem={renderParty}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <ThemedButton text="Voir toutes les soirées passées" />
        }
      />
    </View>
  );
}
