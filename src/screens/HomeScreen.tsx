import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell, Camera, Heart, MessageCircle, Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

type Story = { id: string; name: string; img: string };
type Post = {
  id: string;
  name: string;
  img: string;
  time: string;
  text: string;
  image?: string;
  liked?: boolean;
  likes: number;
  comments: number;
};

const STORIES: Story[] = [
  { id: 's1', name: 'Ali', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 's2', name: 'Sara', img: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 's3', name: 'Zain', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 's4', name: 'Hira', img: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 's5', name: 'Talha', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 's6', name: 'Ayaan', img: 'https://randomuser.me/api/portraits/men/6.jpg' },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    name: 'Ali Akbar',
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
    time: '2h',
    text: 'Reminder: Assignment submission closes tonight at 11:59 PM.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=60',
    likes: 28,
    comments: 6,
  },
  {
    id: 'p2',
    name: 'Sara Khan',
    img: 'https://randomuser.me/api/portraits/women/4.jpg',
    time: '5h',
    text: 'New lecture notes are uploaded in Courses. Please review before the quiz.',
    likes: 41,
    comments: 11,
  },
  {
    id: 'p3',
    name: 'ITVE Updates',
    img: 'https://randomuser.me/api/portraits/lego/1.jpg',
    time: '1d',
    text: 'Campus will remain open during the weekend for lab access.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=60',
    likes: 93,
    comments: 22,
  },
];

function StoryItem({ story, size }: { story: Story; size: number }) {
  return (
    <View style={[styles.storyItem, { width: size + 10 }]}>
      <View style={[styles.storyRing, { borderColor: T.primary }]}>
        <Image source={{ uri: story.img }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const contentMaxWidth = useMemo(() => Math.min(520, width), [width]);
  const horizontalPadding = useMemo(() => (width >= 420 ? 18 : 14), [width]);
  const storySize = useMemo(() => (width >= 420 ? 62 : 56), [width]);

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [draft, setDraft] = useState('');
  const [draftImage, setDraftImage] = useState<string | undefined>(undefined);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = !p.liked;
        return { ...p, liked, likes: Math.max(0, p.likes + (liked ? 1 : -1)) };
      }),
    );
  };

  const onAttachImage = () => {
    // UI-only (no picker installed). Tapping cycles a demo image so you get the same "image post" feel as your green UI.
    const demo = [
      'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60',
      undefined,
    ];
    const idx = demo.indexOf(draftImage as any);
    const next = demo[(idx + 1 + demo.length) % demo.length] as string | undefined;
    setDraftImage(next);
  };

  const onPost = () => {
    const text = draft.trim();
    if (!text && !draftImage) {
      Alert.alert('Empty Post', 'Write something or add an image.');
      return;
    }
    const newPost: Post = {
      id: `p-${Date.now()}`,
      name: 'You',
      img: 'https://randomuser.me/api/portraits/lego/2.jpg',
      time: 'now',
      text: text || ' ',
      image: draftImage,
      likes: 0,
      comments: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setDraft('');
    setDraftImage(undefined);
  };

  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={[styles.container, { paddingHorizontal: horizontalPadding, maxWidth: contentMaxWidth }]}>
          <FlatList
            data={posts}
            keyExtractor={(p) => p.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
            ListHeaderComponent={
              <View>
                <View style={styles.header}>
                  <View>
                    <Text style={styles.headerTitle}>ITVE</Text>
                    <Text style={styles.headerSubtitle}>Student Portal</Text>
                  </View>

                  <View style={styles.headerActions}>
                    <Pressable
                      onPress={() => router.push('/search')}
                      style={({ pressed }) => [styles.headerIconBtn, pressed && styles.headerIconBtnPressed]}
                      hitSlop={10}>
                      <Search size={20} color={T.text} />
                    </Pressable>
                    <Pressable
                      onPress={() => router.push('/notifications')}
                      style={({ pressed }) => [styles.headerIconBtn, pressed && styles.headerIconBtnPressed]}
                      hitSlop={10}>
                      <Bell size={20} color={T.text} />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.storiesCard}>
                  <FlatList
                    data={STORIES}
                    keyExtractor={(s) => s.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 12 }}
                    renderItem={({ item }) => <StoryItem story={item} size={storySize} />}
                  />
                </View>

                <View style={styles.composerCard}>
                  <View style={styles.composerRow}>
                    <TextInput
                      value={draft}
                      onChangeText={setDraft}
                      placeholder="Write here"
                      placeholderTextColor={T.mutedText}
                      style={styles.composerInput}
                      multiline
                    />
                    <Pressable onPress={onAttachImage} style={({ pressed }) => [styles.cameraBtn, pressed && styles.cameraBtnPressed]}>
                      <Camera size={20} color={T.text} />
                    </Pressable>
                  </View>
                  {!!draftImage && <Image source={{ uri: draftImage }} style={styles.composerImage} />}
                  <Pressable onPress={onPost} style={({ pressed }) => [styles.postBtn, pressed && styles.postBtnPressed]}>
                    <Text style={styles.postBtnText}>Post</Text>
                  </Pressable>
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Image source={{ uri: item.img }} style={styles.avatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.postName}>{item.name}</Text>
                    <Text style={styles.postTime}>{item.time}</Text>
                  </View>
                </View>

                <Text style={styles.postText}>{item.text}</Text>

                {!!item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}

                <View style={styles.postActions}>
                  <Pressable
                    onPress={() => toggleLike(item.id)}
                    style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}>
                    <Heart size={18} color={item.liked ? T.primary : T.mutedText} fill={item.liked ? T.primary : 'transparent'} />
                    <Text style={styles.actionText}>{item.likes}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => router.push('/comments')}
                    style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}>
                    <MessageCircle size={18} color={T.mutedText} />
                    <Text style={styles.actionText}>{item.comments}</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, width: '100%', alignSelf: 'center' },

  header: {
    marginTop: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: T.text, fontSize: 28, fontWeight: '800' },
  headerSubtitle: { color: T.mutedText, fontSize: 12, marginTop: 2, fontWeight: '600' },
  headerActions: { flexDirection: 'row', gap: 10 },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBtnPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },

  storiesCard: {
    backgroundColor: T.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: T.surfaceBorder,
    overflow: 'hidden',
    marginBottom: 12,
  },
  storyItem: { alignItems: 'center', marginRight: 12 },
  storyRing: { padding: 2, borderRadius: 999, borderWidth: 2 },
  storyName: { color: T.text, fontSize: 12, marginTop: 6, width: 72, textAlign: 'center' },

  postCard: {
    backgroundColor: T.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: T.surfaceBorder,
    padding: 14,
    marginBottom: 12,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: T.fieldBackground },
  postName: { color: T.text, fontSize: 15, fontWeight: '800' },
  postTime: { color: T.mutedText, fontSize: 12, marginTop: 1 },
  postText: { color: T.text, fontSize: 14, lineHeight: 20 },
  postImage: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    marginTop: 12,
    backgroundColor: T.fieldBackground,
  },

  postActions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(25, 68, 112, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.18)',
  },
  actionBtnPressed: { transform: [{ scale: 0.99 }], opacity: 0.9 },
  actionText: { color: T.text, fontSize: 12, fontWeight: '700' },

  composerCard: {
    backgroundColor: T.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: T.surfaceBorder,
    padding: 14,
    marginBottom: 12,
  },
  composerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  composerInput: {
    flex: 1,
    minHeight: 64,
    color: T.text,
    fontSize: 13,
    lineHeight: 18,
    textAlignVertical: 'top',
  },
  cameraBtn: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: 'rgba(25, 68, 112, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtnPressed: { transform: [{ scale: 0.99 }], opacity: 0.9 },
  composerImage: {
    width: '100%',
    height: 170,
    borderRadius: 16,
    marginTop: 12,
    backgroundColor: T.fieldBackground,
  },
  postBtn: {
    marginTop: 12,
    height: 48,
    borderRadius: 16,
    backgroundColor: T.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBtnPressed: { transform: [{ scale: 0.99 }], opacity: 0.92 },
  postBtnText: { color: '#071420', fontWeight: '900', fontSize: 15 },
});


