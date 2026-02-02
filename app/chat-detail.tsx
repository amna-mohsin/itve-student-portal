import { useLocalSearchParams, useRouter } from 'expo-router';
import { Camera, ChevronLeft, MoreHorizontal, Paperclip, Send } from 'lucide-react-native';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { studentPortalTheme as T } from '../constants/studentPortalTheme';

export default function ChatDetail() {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.smallAvatar} />
          <View>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.onlineStatus}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <MoreHorizontal color="#fff" size={24} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={{ flex: 1, padding: 20 }}>
        <Text style={styles.dateLabel}>Today</Text>
        <View style={styles.receivedBubble}>
          <Text style={styles.bubbleText}>Hello world</Text>
        </View>
        <View style={styles.sentBubble}>
          <Text style={styles.bubbleText}>Hello world</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputBar}>
          <Camera color="#aaa" size={24} style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Type a message.." 
            placeholderTextColor="#aaa" 
            style={styles.inputField} 
          />
          <Paperclip color="#aaa" size={24} style={{ marginHorizontal: 10 }} />
          <TouchableOpacity style={styles.sendBtn}>
            <Send color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.gradient.colors[2] },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(0, 204, 255, 0.18)' },
  headerInfo: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  smallAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#000', marginRight: 10 },
  headerName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  onlineStatus: { color: '#888', fontSize: 12 },
  dateLabel: { textAlign: 'center', color: '#888', marginVertical: 20 },
  receivedBubble: { backgroundColor: T.surface, alignSelf: 'flex-start', padding: 12, borderRadius: 15, borderTopLeftRadius: 2, marginBottom: 15, borderWidth: 1, borderColor: T.surfaceBorder },
  sentBubble: { backgroundColor: 'rgba(25, 68, 112, 0.45)', alignSelf: 'flex-end', padding: 12, borderRadius: 15, borderTopRightRadius: 2, borderWidth: 1, borderColor: 'rgba(0, 204, 255, 0.22)' },
  bubbleText: { color: '#fff' },
  inputBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: T.surface, margin: 15, paddingHorizontal: 15, height: 55, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(0, 204, 255, 0.22)' },
  inputField: { flex: 1, color: '#fff' },
  sendBtn: { padding: 5 }
});