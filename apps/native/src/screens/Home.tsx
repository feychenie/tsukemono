import { useAuth } from 'modules/auth';
import { View, Text, Button, StyleSheet } from 'react-native';

export function HomeScreen() {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
