import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      {/* This ensures the header title looks right */}
      <Stack.Screen options={{ title: 'Oops!', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#135821' } }} />
      
      <LinearGradient colors={['#135821', '#052401']} style={StyleSheet.absoluteFill} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Under Construction</Text>
        <Text style={styles.text}>This screen isn&apos;t ready yet or doesn&apos;t exist.</Text>
        
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to Home Screen</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF41',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
  },
  linkText: {
    color: '#00FF41',
    fontWeight: 'bold',
  },
});