import { useRouter } from 'expo-router';
import { ChevronLeft, Search as SearchIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { studentPortalTheme as T } from '../constants/studentPortalTheme';

export default function SearchPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: T.gradient.colors[2] }}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchIcon color={T.primary} size={20} style={{ marginRight: 10 }} />
            <TextInput 
              placeholder="Search ITVE students, posts..." 
              placeholderTextColor="#aaa" 
              style={styles.input}
              autoFocus 
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 10 
  },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  backButton: { padding: 5 },
  searchContainer: { paddingHorizontal: 20, marginTop: 10 },
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: T.surface, 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.25)'
  },
  input: { color: '#fff', flex: 1, fontSize: 16 }
});