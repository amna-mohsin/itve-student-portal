import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Platform, TouchableOpacity, View } from 'react-native';
import NotificationScreen from '../src/screens/NotificationScreen';
import { studentPortalTheme as T } from '../constants/studentPortalTheme';

export default function Page() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Notifications',
          headerTitleStyle: { 
            color: '#fff', 
            fontSize: 18, 
            fontWeight: '700' 
          },
          headerStyle: { 
            backgroundColor: T.gradient.colors[0]
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={{ marginLeft: Platform.OS === 'ios' ? 0 : 5 }}
            >
              <ChevronLeft size={28} color={T.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      <NotificationScreen />
    </View>
  );
}