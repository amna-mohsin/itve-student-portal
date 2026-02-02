import { useRouter } from 'expo-router';
import { CheckCircle2, Search } from 'lucide-react-native';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

const DUMMY_CHATS = [
  { id: '1', name: 'Ali Akbar', message: 'Hello world', time: '3:15 pm', color: '#3B82F6', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Talha Nawaz', message: 'See you at ITVE!', time: '2:40 pm', color: '#EF4444', img: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Ayaan Hassan', message: 'The project is ready.', time: '1:10 pm', color: '#3B82F6', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Danish Aslam', message: 'Send the file.', time: 'Yesterday', color: '#A855F7', img: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '5', name: 'Rayyan Hussain', message: 'Check your mail.', time: 'Monday', color: '#22C55E', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

export default function MessagesScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof DUMMY_CHATS[0] }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => router.push({ pathname: '/chat-detail', params: { name: item.name, img: item.img } })}
    >
      <Image source={{ uri: item.img }} style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{item.name}</Text>
          <CheckCircle2 size={14} color={item.color} fill={item.color} style={{ marginLeft: 5 }} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.messageText} numberOfLines={1}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Text style={styles.headerTitle}>Chats</Text>
        
        {/* Status Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScroll}>
          {DUMMY_CHATS.map((item) => (
            <View key={item.id} style={styles.statusContainer}>
              <View style={styles.statusRing}>
                <Image source={{ uri: item.img }} style={styles.statusImage} />
              </View>
              <Text style={styles.statusName} numberOfLines={1}>{item.name.split(' ')[0]}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.searchContainer}>
          <Search color="#888" size={20} style={{ marginRight: 10 }} />
          <TextInput placeholder="Search" placeholderTextColor="#888" style={styles.searchInput} />
        </View>
      </SafeAreaView>
      
      <FlatList
        data={DUMMY_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.gradient.colors[2] },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', paddingHorizontal: 20, marginTop: 10 },
  statusScroll: { paddingLeft: 20, marginVertical: 15 },
  statusContainer: { alignItems: 'center', marginRight: 15 },
  statusRing: { padding: 2, borderRadius: 35, borderWidth: 2, borderColor: T.primary },
  statusImage: { width: 60, height: 60, borderRadius: 30 },
  statusName: { color: '#fff', fontSize: 12, marginTop: 5, width: 65, textAlign: 'center' },
  searchContainer: { flexDirection: 'row', backgroundColor: T.surface, margin: 20, borderRadius: 12, paddingHorizontal: 15, height: 45, alignItems: 'center', borderWidth: 1, borderColor: T.surfaceBorder },
  searchInput: { color: '#fff', flex: 1 },
  chatItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  nameText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  timeText: { color: '#888', fontSize: 12, marginLeft: 'auto' },
  messageText: { color: '#aaa', marginTop: 2, fontSize: 14 }
});