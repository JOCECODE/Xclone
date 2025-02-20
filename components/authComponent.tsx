import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';

export default function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(true); // Toggle between Sign Up / Sign In
  const queryClient = useQueryClient();

  // Sign-up mutation
  const signUpMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      alert('Check your email for verification!');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  // Sign-in mutation
  const signInMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] }); // Refresh session to trigger UI update
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <View style={styles.authContainer}>
      <Text style={styles.header}>{isSigningUp ? 'Sign Up' : 'Sign In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={styles.authButton}
        onPress={isSigningUp ? () => signUpMutation.mutate() : () => signInMutation.mutate()}
        disabled={signUpMutation.isPending || signInMutation.isPending}
      >
        <Text style={styles.authButtonText}>
          {isSigningUp
            ? signUpMutation.isPending
              ? 'Signing up...'
              : 'Sign Up'
            : signInMutation.isPending
            ? 'Signing in...'
            : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSigningUp(!isSigningUp)}>
        <Text style={styles.toggleText}>
          {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
  header: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', backgroundColor: '#333', color: 'white', padding: 10, marginBottom: 10, borderRadius: 5 },
  authButton: { backgroundColor: 'blue', padding: 12, borderRadius: 5, alignItems: 'center' },
  authButtonText: { color: 'white', fontWeight: 'bold' },
  toggleText: { color: 'gray', marginTop: 10 },
  errorText: { color: 'red', marginBottom: 10 },
});
