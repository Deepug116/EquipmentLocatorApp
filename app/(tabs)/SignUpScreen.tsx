import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ✅ This function actually calls your backend API
  const handleSignUp = async () => {
    try {
      // ✅ Replace with your PC's local IP, not localhost if using physical phone
      const res = await axios.post('http://172.20.10.3:3000/signup', {
        name: username,
        email: `${username}@example.com`,  // You can customize this or add an email field
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ API response:', res.data);
      Alert.alert('Success', res.data.message);

      // ✅ Navigate to home or wherever you want
      router.replace('/');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message || 'Something went wrong';
        console.error('❌ API error:', message);
        Alert.alert('Error', message);
      } else {
        console.error('❌ Unknown error:', err);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  link: {
    color: '#007bff',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
