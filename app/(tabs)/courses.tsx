import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';
import { COURSES } from '../../src/data/courses';

export default function CoursesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => Math.min(520, width), [width]);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COURSES;
    return COURSES.filter((c) => `${c.title} ${c.category} ${c.subtitle}`.toLowerCase().includes(s));
  }, [q]);

  const recommended = useMemo(() => COURSES.slice(0, 2), []);
  const cardW = useMemo(() => Math.min(240, Math.floor((Math.min(contentMaxWidth, width) - 16 * 2 - 12) / 2)), [contentMaxWidth, width]);

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[styles.container, { maxWidth: contentMaxWidth }]}>
          <FlatList
            data={filtered}
            keyExtractor={(c) => c.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            ListHeaderComponent={
              <View>
                <Text style={styles.pageTitle}>Learning Journey</Text>

                <View style={styles.searchBar}>
                  <Search size={18} color={T.mutedText} />
                  <TextInput
                    value={q}
                    onChangeText={setQ}
                    placeholder="Search for courses"
                    placeholderTextColor={T.mutedText}
                    style={styles.searchInput}
                  />
                </View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recommended Courses</Text>
                  <Text style={styles.sectionLink}>New Step</Text>
                </View>

                <FlatList
                  data={recommended}
                  keyExtractor={(c) => `rec-${c.id}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 14 }}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => router.push({ pathname: '/course/[id]', params: { id: item.id } })}
                      style={({ pressed }) => [styles.recCard, { width: cardW }, pressed && styles.pressed]}>
                      <Image source={{ uri: item.coverImage }} style={styles.recImg} />
                      <View style={{ padding: 12 }}>
                        <Text style={styles.recCategory}>{item.category}</Text>
                        <Text style={styles.recTitle} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text style={styles.recSub} numberOfLines={1}>
                          {item.subtitle}
                        </Text>
                        <Text style={styles.recPrice}>
                          ${item.pricePerMonth}
                          <Text style={styles.recPer}>/month</Text>
                        </Text>
                      </View>
                    </Pressable>
                  )}
                />

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>All Courses</Text>
                  <Text style={styles.sectionLink}>View All</Text>
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push({ pathname: '/course/[id]', params: { id: item.id } })}
                style={({ pressed }) => [styles.gridCard, pressed && styles.pressed]}>
                <Image source={{ uri: item.coverImage }} style={styles.gridImg} />
                <View style={{ padding: 10 }}>
                  <Text style={styles.gridCategory}>{item.category}</Text>
                  <Text style={styles.gridTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center' },
  pageTitle: { color: T.text, fontSize: 22, fontWeight: '900', marginBottom: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 14,
  },
  searchInput: { flex: 1, color: T.text, fontWeight: '700' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { color: T.text, fontWeight: '900', fontSize: 14 },
  sectionLink: { color: 'rgba(0, 204, 255, 0.75)', fontWeight: '900', fontSize: 12 },

  recCard: {
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    overflow: 'hidden',
  },
  recImg: { width: '100%', height: 110, backgroundColor: T.fieldBackground },
  recCategory: { color: 'rgba(0, 204, 255, 0.75)', fontWeight: '900', fontSize: 12 },
  recTitle: { color: T.text, fontWeight: '900', fontSize: 16, marginTop: 4 },
  recSub: { color: T.mutedText, fontWeight: '700', fontSize: 11, marginTop: 6 },
  recPrice: { color: T.text, fontWeight: '900', marginTop: 10, fontSize: 13 },
  recPer: { color: T.mutedText, fontWeight: '800', fontSize: 11 },

  gridCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gridImg: { width: '100%', height: 92, backgroundColor: T.fieldBackground },
  gridCategory: { color: 'rgba(0, 204, 255, 0.75)', fontWeight: '900', fontSize: 11 },
  gridTitle: { color: T.text, fontWeight: '900', fontSize: 13, marginTop: 6 },

  pressed: { transform: [{ scale: 0.995 }], opacity: 0.92 },
});


