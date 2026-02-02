import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';
import { SCHOLARSHIPS } from '../../src/data/scholarships';

export default function ScholarshipListPage() {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const { width } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => Math.min(560, width), [width]);

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[styles.container, { maxWidth: contentMaxWidth }]}>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} hitSlop={10} style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
              <ChevronLeft size={22} color={T.text} />
            </Pressable>
            <Text style={styles.title}>Scholarship Page</Text>
            <View style={{ width: 44 }} />
          </View>

          <FlatList
            data={SCHOLARSHIPS}
            keyExtractor={(s) => s.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => router.push({ pathname: '/scholarship/[id]', params: { id: item.id, courseId } })}
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
                <View style={[styles.avatar, index === 0 && styles.avatarFilled]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSub} numberOfLines={2}>
                    {item.subtitle}
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
  container: { flex: 1, width: '100%', alignSelf: 'center', padding: 16 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: T.text, fontWeight: '900', fontSize: 18 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'transparent',
  },
  avatarFilled: {
    borderColor: T.primary,
    backgroundColor: 'rgba(0, 204, 255, 0.18)',
  },
  rowTitle: { color: T.text, fontWeight: '900' },
  rowSub: { color: T.mutedText, fontWeight: '700', marginTop: 4, lineHeight: 18 },

  pressed: { transform: [{ scale: 0.995 }], opacity: 0.92 },
});


