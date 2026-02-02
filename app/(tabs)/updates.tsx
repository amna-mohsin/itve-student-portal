import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

type AttendanceRow = { label: string; values: (string | null)[] };
type SubjectRow = { label: string; score: string };
type ProgramSection = {
  id: string;
  title: string;
  counter?: string;
  groupTitle: string;
  tableColumns: string[];
  tableRows: AttendanceRow[];
  teacher: string;
  subjects: SubjectRow[];
};

const SECTIONS: ProgramSection[] = [
  {
    id: 'ai-eng',
    title: 'AI Engineering',
    counter: '3/12',
    groupTitle: 'Data Engineering',
    tableColumns: ['A', 'A', 'A', 'T'],
    tableRows: [
      { label: 'Month 1', values: [null, null, null, null] },
      { label: 'Month 2', values: [null, null, null, null] },
    ],
    teacher: 'Sir Asadullah',
    subjects: [
      { label: 'MATH for AI', score: '70/100' },
      { label: 'PYTHON for AI', score: '76/100' },
    ],
  },
  {
    id: 'mkt-sales',
    title: 'Marketing/Sales',
    groupTitle: 'Marketing:',
    tableColumns: ['A', 'A', 'A', 'T'],
    tableRows: [
      { label: 'Month1', values: [null, null, null, null] },
      { label: 'Month2', values: [null, null, null, null] },
    ],
    teacher: 'Sir Asadullah',
    subjects: [
      { label: 'Marketing for AI', score: '70/100' },
      { label: 'Sales Management for AI', score: '76/100' },
    ],
  },
];

function AttendanceTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: AttendanceRow[];
}) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeaderRow}>
        <View style={[styles.tableCell, styles.tableLeftCell]} />
        {columns.map((c, idx) => (
          <View key={idx} style={[styles.tableCell, styles.tableHeaderCell]}>
            <Text style={styles.tableHeaderText}>{c}</Text>
          </View>
        ))}
      </View>

      {rows.map((r) => (
        <View key={r.label} style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableLeftCell]}>
            <Text style={styles.tableRowLabel}>{r.label}</Text>
          </View>
          {columns.map((_, idx) => (
            <View key={idx} style={[styles.tableCell, styles.tableBodyCell]} />
          ))}
        </View>
      ))}
    </View>
  );
}

function SectionCard({ section }: { section: ProgramSection }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {!!section.counter && <Text style={styles.sectionCounter}>{section.counter}</Text>}
      </View>

      <View style={styles.blockCard}>
        <Text style={styles.blockTitle}>{section.groupTitle}</Text>
        <View style={styles.tableCard}>
          <AttendanceTable columns={section.tableColumns} rows={section.tableRows} />
          <Text style={styles.teacher}>{section.teacher}</Text>
        </View>

        <View style={styles.subjectList}>
          {section.subjects.map((s) => (
            <View key={s.label} style={styles.subjectRow}>
              <Text style={styles.subjectLabel} numberOfLines={1}>
                {s.label}
              </Text>
              <Text style={styles.subjectScore}>{s.score}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function UpdatesScreen() {
  const { width } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => Math.min(520, width), [width]);

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={[styles.container, { maxWidth: contentMaxWidth }]}>
          <View style={styles.contentPad}>
            {SECTIONS.map((s) => (
              <SectionCard key={s.id} section={s} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center' },
  contentPad: { padding: 16, paddingBottom: 140 },

  section: { marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { color: T.text, fontSize: 18, fontWeight: '900' },
  sectionCounter: { color: T.mutedText, fontSize: 12, fontWeight: '800' },

  blockCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 14,
  },
  blockTitle: { color: T.text, fontSize: 14, fontWeight: '900', marginBottom: 10 },

  tableCard: {
    backgroundColor: 'rgba(25, 68, 112, 0.22)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.12)',
    overflow: 'hidden',
  },

  tableWrap: { padding: 10 },
  tableHeaderRow: { flexDirection: 'row' },
  tableRow: { flexDirection: 'row' },

  tableCell: {
    borderColor: 'rgba(0, 204, 255, 0.12)',
    borderWidth: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableLeftCell: { width: 110, borderLeftWidth: 0 },
  tableHeaderCell: { flex: 1, borderTopWidth: 0 },
  tableBodyCell: { flex: 1 },
  tableHeaderText: { color: 'rgba(236, 246, 255, 0.6)', fontWeight: '900', fontSize: 12 },
  tableRowLabel: { color: 'rgba(236, 246, 255, 0.6)', fontWeight: '800', fontSize: 12 },

  teacher: {
    color: 'rgba(0, 204, 255, 0.75)',
    fontSize: 12,
    fontWeight: '900',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  subjectList: {
    marginTop: 12,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  subjectLabel: { color: 'rgba(236, 246, 255, 0.72)', fontWeight: '700', flex: 1 },
  subjectScore: { color: 'rgba(236, 246, 255, 0.72)', fontWeight: '800' },
});


