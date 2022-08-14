import { useTheme } from '@react-navigation/native';
import { useAuth } from 'modules/auth';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export function SignInScreen() {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Login</Text>
      <Pressable
        onPress={() => signIn('stuff')}
        style={{ backgroundColor: colors.card, paddingHorizontal: 20, paddingVertical: 10 }}
      >
        <Text style={{ color: colors.primary }}>Sign In</Text>
      </Pressable>
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
