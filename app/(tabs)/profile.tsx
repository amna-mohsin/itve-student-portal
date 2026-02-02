import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { studentPortalTheme as T } from '../../constants/studentPortalTheme';

export default function Profile() {
  return (
    <LinearGradient colors={T.gradient.colors} start={T.gradient.start} end={T.gradient.end} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: T.primary, fontWeight: '800', fontSize: 18 }}>Profile Screen</Text>
      </View>
    </LinearGradient>
  );
}