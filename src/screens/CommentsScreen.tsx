import { LinearGradient } from 'expo-linear-gradient';
import { Send, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

type Comment = { id: string; name: string; text: string; time: string };

const INITIAL: Comment[] = [
  { id: 'c1', name: 'Talha', text: 'Thanks for the reminder!', time: '2h' },
  { id: 'c2', name: 'Sara', text: 'Where can we find the notes?', time: '1h' },
  { id: 'c3', name: 'Ali', text: 'Uploaded in Courses > Week 3.', time: '55m' },
];

export default function CommentsScreen({
  mode = 'screen',
  onClose,
}: {
  mode?: 'screen' | 'modal';
  onClose?: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const contentMaxWidth = useMemo(() => Math.min(520, width), [width]);
  const modalMaxHeight = useMemo(() => Math.max(320, Math.floor(height * 0.78)), [height]);

  const [comments, setComments] = useState<Comment[]>(INITIAL);
  const [value, setValue] = useState('');

  const onSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setComments((prev) => [{ id: `c-${Date.now()}`, name: 'You', text: trimmed, time: 'now' }, ...prev]);
    setValue('');
  };

  const content = (
    <View
      style={[
        styles.container,
        mode === 'modal' && styles.modalContainer,
        { maxWidth: contentMaxWidth },
        mode === 'modal' && { maxHeight: modalMaxHeight },
      ]}>
      {mode === 'modal' && (
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Comments</Text>
          <Pressable onPress={onClose} hitSlop={10} style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}>
            <X size={18} color={T.text} />
          </Pressable>
        </View>
      )}
      <View style={styles.body}>
        <FlatList
          data={comments}
          keyExtractor={(c) => c.id}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentTime}>{item.time}</Text>
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Write a comment…"
            placeholderTextColor={T.mutedText}
            style={styles.input}
          />
          <Pressable onPress={onSend} style={({ pressed }) => [styles.sendBtn, pressed && styles.sendBtnPressed]}>
            <Send size={18} color={T.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  if (mode === 'modal') return content;

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {content}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', alignSelf: 'center' },
  modalContainer: {
    backgroundColor: 'rgba(16, 26, 37, 0.92)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.22)',
    overflow: 'hidden',
  },
  body: { flex: 1 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 204, 255, 0.16)',
  },
  modalTitle: { color: T.text, fontWeight: '900', fontSize: 16 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  commentCard: {
    backgroundColor: T.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: T.surfaceBorder,
    padding: 14,
    marginBottom: 10,
  },
  commentHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  commentName: { color: T.text, fontWeight: '800', fontSize: 14 },
  commentTime: { color: T.mutedText, fontSize: 11, fontWeight: '700' },
  commentText: { color: T.text, marginTop: 6, lineHeight: 19 },

  composer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 204, 255, 0.14)',
    backgroundColor: 'rgba(16, 26, 37, 0.92)',
  },
  input: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    paddingHorizontal: 14,
    color: T.text,
    backgroundColor: 'rgba(25, 68, 112, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.18)',
  },
  sendBtn: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: T.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnPressed: { transform: [{ scale: 0.99 }], opacity: 0.9 },
});


