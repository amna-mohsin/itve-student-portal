import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

export default function ScholarshipSurveyPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => Math.min(560, width), [width]);

  const [income, setIncome] = useState('100,000');
  const [members, setMembers] = useState('4');
  const [cnic, setCnic] = useState('42501-6664333-8');
  const [status, setStatus] = useState('Mid · Middle');
  const [success, setSuccess] = useState(false);

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[styles.container, { maxWidth: contentMaxWidth }]}>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} hitSlop={10} style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
              <ChevronLeft size={22} color={T.text} />
            </Pressable>
            <Text style={styles.title}>Scholarship Survey</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.card}>
            <Text style={styles.smallHeading}>Required Info</Text>
            <Text style={styles.paragraph}>
              Fill in the following details to apply for scholarship. (Demo UI)
            </Text>

            <Text style={styles.label}>Monthly household income</Text>
            <TextInput value={income} onChangeText={setIncome} style={styles.input} placeholderTextColor={T.mutedText} />

            <Text style={styles.label}>Total family members</Text>
            <TextInput value={members} onChangeText={setMembers} style={styles.input} placeholderTextColor={T.mutedText} />

            <Text style={styles.label}>CNIC</Text>
            <TextInput value={cnic} onChangeText={setCnic} style={styles.input} placeholderTextColor={T.mutedText} />

            <Text style={styles.label}>Income status</Text>
            <TextInput value={status} onChangeText={setStatus} style={styles.input} placeholderTextColor={T.mutedText} />

            <Pressable onPress={() => setSuccess(true)} style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
              <Text style={styles.primaryText}>Enter</Text>
            </Pressable>
          </View>
        </View>

        <Modal visible={success} transparent animationType="fade" onRequestClose={() => setSuccess(false)}>
          <View style={styles.modalRoot}>
            <Pressable style={styles.modalBackdrop} onPress={() => setSuccess(false)} />
            <View style={styles.modalCard}>
              <CheckCircle2 size={26} color={T.primary} />
              <Text style={styles.modalTitle}>Scholarship Applied</Text>
              <Text style={styles.modalSub}>You have successfully availed this scholarship ({id}).</Text>
              <Pressable
                onPress={() => {
                  setSuccess(false);
                  router.back();
                }}
                style={({ pressed }) => [styles.modalBtn, pressed && styles.pressed]}>
                <Text style={styles.modalBtnText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    padding: 14,
  },
  smallHeading: { color: T.text, fontWeight: '900' },
  paragraph: { color: T.mutedText, fontWeight: '700', marginTop: 8, lineHeight: 18 },
  label: { color: T.text, fontWeight: '900', marginTop: 14, marginBottom: 8 },
  input: {
    height: 52,
    borderRadius: 18,
    paddingHorizontal: 14,
    color: T.text,
    backgroundColor: 'rgba(25, 68, 112, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.18)',
    fontWeight: '800',
  },
  primaryBtn: { marginTop: 18, height: 50, borderRadius: 18, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#071420', fontWeight: '900', fontSize: 15 },

  modalRoot: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  modalCard: {
    width: '86%',
    maxWidth: 420,
    backgroundColor: 'rgba(16, 26, 37, 0.95)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.22)',
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: { color: T.text, fontWeight: '900', fontSize: 16, marginTop: 10 },
  modalSub: { color: T.mutedText, fontWeight: '700', textAlign: 'center', marginTop: 8, lineHeight: 18 },
  modalBtn: { marginTop: 14, height: 46, borderRadius: 16, backgroundColor: T.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  modalBtnText: { color: '#071420', fontWeight: '900' },

  pressed: { transform: [{ scale: 0.995 }], opacity: 0.92 },
});


