import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

const ITEMS = [
  { id: 'n1', title: 'New update posted', subtitle: 'Check the Updates tab for details.', time: '1h' },
  { id: 'n2', title: 'Assignment reminder', subtitle: 'Submission closes tonight.', time: '3h' },
  { id: 'n3', title: 'Course content added', subtitle: 'New lecture notes uploaded.', time: '1d' },
];

export default function NotificationScreen() {
  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <FlatList
          data={ITEMS}
          keyExtractor={(i) => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: T.surfaceBorder,
    padding: 14,
    marginBottom: 12,
  },
  title: { color: T.text, fontSize: 15, fontWeight: '800' },
  subtitle: { color: T.mutedText, fontSize: 13, marginTop: 4, lineHeight: 18 },
  time: { color: 'rgba(0, 204, 255, 0.75)', fontSize: 11, marginTop: 10, fontWeight: '700' },
});


