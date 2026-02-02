import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';
import { SCHOLARSHIPS } from '../../src/data/scholarships';

export default function ScholarshipDetailsPage() {
  const router = useRouter();
  const { id, courseId } = useLocalSearchParams<{ id: string; courseId?: string }>();
  const { width } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => Math.min(560, width), [width]);

  const scholarship = useMemo(() => SCHOLARSHIPS.find((s) => s.id === id) ?? SCHOLARSHIPS[0], [id]);

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[styles.container, { maxWidth: contentMaxWidth }]}>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} hitSlop={10} style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
              <ChevronLeft size={22} color={T.text} />
            </Pressable>
            <Text style={styles.title}>Scholarship</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.heroAvatar}
            />
            <Text style={styles.name}>{scholarship.title}</Text>
            <Text style={styles.desc}>
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
            </Text>

            <View style={styles.supportRow}>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/men/46.jpg' }} style={styles.smallAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.supportName}>Bilawal Bhutto</Text>
                <Text style={styles.supportMeta}>Floor 55 · Rank 01</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>50%</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={() => router.push({ pathname: '/scholarship/survey', params: { id, courseId } })}
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
                <Text style={styles.primaryText}>APPLY</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}>
                <Text style={styles.secondaryText}>Apply</Text>
              </Pressable>
            </View>
          </View>
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
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 26,
    padding: 16,
    alignItems: 'center',
  },
  heroAvatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: T.fieldBackground, marginTop: 10 },
  name: { color: T.text, fontWeight: '900', fontSize: 18, marginTop: 12 },
  desc: { color: T.mutedText, fontWeight: '700', textAlign: 'center', marginTop: 10, lineHeight: 18 },

  supportRow: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 12,
  },
  smallAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: T.fieldBackground },
  supportName: { color: T.text, fontWeight: '900' },
  supportMeta: { color: T.mutedText, fontWeight: '700', marginTop: 4, fontSize: 12 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 204, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.25)',
  },
  badgeText: { color: T.text, fontWeight: '900' },

  actions: { marginTop: 18, flexDirection: 'row', gap: 10, width: '100%' },
  primaryBtn: { flex: 1, height: 52, borderRadius: 18, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#071420', fontWeight: '900', fontSize: 16 },
  secondaryBtn: {
    width: 92,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: T.text, fontWeight: '900' },

  pressed: { transform: [{ scale: 0.995 }], opacity: 0.92 },
});


