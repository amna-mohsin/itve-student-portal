import { Tabs } from 'expo-router';
import { Bell, Home, MessageSquare, PlaySquare, User } from 'lucide-react-native';
import { Platform, StyleSheet, View } from 'react-native';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: T.primary,
        tabBarInactiveTintColor: 'rgba(0, 204, 255, 0.55)',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 8,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(16, 26, 37, 0.92)',
          position: 'absolute',
          bottom: Platform.OS === 'web' ? 14 : 18,
          left: 15,
          right: 15,
          height: 65, // Reduced from 80 to make it less broad
          borderRadius: 32,
          borderWidth: 1,
          borderColor: 'rgba(0, 204, 255, 0.22)',
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 204, 255, 0.18)',
          paddingBottom: 0, // Tighten vertical space
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.glow} />}
              <Home size={24} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.glow} />}
              <MessageSquare size={24} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Updates',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.glow} />}
              <Bell size={24} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.glow} />}
              <PlaySquare size={24} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.glow} />}
              <User size={24} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40,
    marginTop: 10,
  },
  glow: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: T.primary,
    opacity: 0.5, // This creates the soft radial look
    // iOS Blur/Glow
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    // Android Glow
    elevation: 8,
  }
});