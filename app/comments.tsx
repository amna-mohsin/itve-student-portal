import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Heart, Send } from 'lucide-react-native';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Your specific theme colors
const T = {
  primary: '#00CCFF',
  fieldBackground: '#194470',
  gradient: ['#194470', '#122D46', '#101A25'],
};

const MOCK_COMMENTS = [
  { id: '1', user: 'Amna', text: 'This UI is looking fire! 🔥', time: '2m', likes: 5 },
  { id: '2', user: 'Zain', text: 'Testing the Student Portal theme.', time: '5m', likes: 2 },
  { id: '3', user: 'Sara', text: 'Check the deep navy background.', time: '10m', likes: 0 },
];

export default function CommentsPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Comments',
          headerTitleStyle: { color: '#fff', fontSize: 18, fontWeight: '700' },
          headerStyle: { backgroundColor: T.gradient[0] },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 5 }}>
              <ChevronLeft size={28} color={T.primary} />
            </TouchableOpacity>
          ),
        }} 
      />

      {/* 1. INPUT AREA AT THE TOP */}
      <View style={styles.topInputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput 
            placeholder="Write a comment..." 
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.5)"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={20} color={T.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. COMMENTS LIST */}
      <FlatList
        data={MOCK_COMMENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <View style={[styles.avatar, { borderColor: T.primary }]}>
              <Text style={styles.avatarText}>{item.user[0]}</Text>
            </View>
            <View style={styles.contentBody}>
              <View style={styles.bubble}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
              <View style={styles.commentFooter}>
                <Text style={styles.timeText}>{item.time}</Text>
                <TouchableOpacity style={styles.likeAction}>
                  <Heart size={14} color={item.likes > 0 ? T.primary : "#94a3b8"} />
                  <Text style={[styles.likeCount, item.likes > 0 && { color: T.primary }]}>
                    {item.likes}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#101A25' }, // Using your dark end-gradient color
  
  // Input at the beginning
  topInputContainer: {
    padding: 16,
    backgroundColor: '#194470', // fieldBackground
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#122D46',
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 50,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 10,
  },
  sendButton: { padding: 8 },

  // List styles
  listContent: { padding: 16 },
  commentRow: { flexDirection: 'row', marginBottom: 20 },
  avatar: { 
    width: 38, height: 38, borderRadius: 19, 
    backgroundColor: '#194470', alignItems: 'center', 
    justifyContent: 'center', borderWidth: 1 
  },
  avatarText: { fontWeight: '700', color: '#00CCFF', fontSize: 14 },
  contentBody: { flex: 1, marginLeft: 12 },
  bubble: { 
    backgroundColor: '#194470', 
    padding: 12, 
    borderRadius: 15, 
    borderTopLeftRadius: 2 
  },
  userName: { fontWeight: '700', fontSize: 13, color: '#00CCFF', marginBottom: 4 },
  commentText: { fontSize: 14, color: '#e2e8f0', lineHeight: 20 },
  commentFooter: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  timeText: { fontSize: 12, color: '#94a3b8', marginRight: 20 },
  likeAction: { flexDirection: 'row', alignItems: 'center' },
  likeCount: { fontSize: 12, color: '#94a3b8', marginLeft: 5 },
});