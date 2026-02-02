import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Ticket } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';
import { COURSES } from '../../src/data/courses';

export default function CourseDetailsPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const course = useMemo(() => COURSES.find((c) => c.id === id) ?? COURSES[0], [id]);
  const contentMaxWidth = useMemo(() => Math.min(560, width), [width]);

  const [promo, setPromo] = useState('');

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[styles.container, { maxWidth: contentMaxWidth }]}>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} hitSlop={10} style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
              <ChevronLeft size={22} color={T.text} />
            </Pressable>
            <Text style={styles.title}>{course.title}</Text>
            <View style={{ width: 44 }} />
          </View>

          <Image source={{ uri: course.coverImage }} style={styles.hero} />

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>{course.durationMonths} Months</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>Rs {course.pricePerMonth}/month</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cat}>{course.category}</Text>
              <View style={styles.progressPill}>
                <Text style={styles.progressText}>{course.progressPercent.toFixed(2)}%</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Introduction:</Text>
            <Text style={styles.bodyText}>{course.subtitle}</Text>

            <Text style={styles.sectionLabel}>Venue:</Text>
            <Text style={styles.bodyText}>{course.venue}</Text>

            <Text style={styles.sectionLabel}>Content/schedule:</Text>
            <Text style={styles.bodyText}>1 week (1–7)</Text>
            <Text style={styles.bodyText}>2 week (8–14)</Text>
            <Text style={styles.bodyText}>3 week (15–21)</Text>
            <Text style={styles.bodyText}>4 week (22–28)</Text>

            <View style={styles.promoRow}>
              <Ticket size={18} color={T.mutedText} />
              <TextInput
                value={promo}
                onChangeText={setPromo}
                placeholder="Promocode"
                placeholderTextColor={T.mutedText}
                style={styles.promoInput}
              />
            </View>

            <View style={styles.ctaRow}>
              <Pressable
                onPress={() => router.push({ pathname: '/scholarship', params: { courseId: course.id } })}
                style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}>
                <Text style={styles.secondaryText}>Scholarship</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
                <Text style={styles.primaryText}>Pay Now</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center', padding: 16, paddingBottom: 28 },
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
  hero: { width: '100%', height: 170, borderRadius: 22, backgroundColor: T.fieldBackground, marginBottom: 12 },

  metaRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metaPill: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  metaText: { color: T.text, fontWeight: '900' },

  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    padding: 14,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cat: { color: 'rgba(0, 204, 255, 0.75)', fontWeight: '900' },
  progressPill: {
    minWidth: 88,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(25, 68, 112, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.18)',
    alignItems: 'center',
  },
  progressText: { color: T.text, fontWeight: '900' },

  sectionLabel: { color: T.text, fontWeight: '900', marginTop: 12, marginBottom: 4 },
  bodyText: { color: T.mutedText, fontWeight: '700', lineHeight: 18 },

  promoRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 52,
  },
  promoInput: { flex: 1, color: T.text, fontWeight: '800' },

  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  primaryBtn: { flex: 1, height: 48, borderRadius: 16, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#071420', fontWeight: '900' },
  secondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(25, 68, 112, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: T.text, fontWeight: '900' },

  pressed: { transform: [{ scale: 0.995 }], opacity: 0.92 },
});


