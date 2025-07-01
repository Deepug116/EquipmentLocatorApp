import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Frontend validation for @packagingcorp.com email
  const isValidPackagingCorpEmail = (email: string) => {
    return email.toLowerCase().endsWith('@packagingcorp.com');
  };

  // ✅ This function actually calls your backend API
  const handleSignUp = async () => {
    if (!isValidPackagingCorpEmail(email)) {
      Alert.alert('Error', 'Email must end with @packagingcorp.com!');
      return;
    }
    try {
      // ✅ Replace with your PC's local IP, not localhost if using physical phone
      const res = await axios.post('http://172.20.10.2:3000/signup', {
        name: name,
        email: email,
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
      <View style={{ width: 250 }}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
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
    backgroundColor: '#fff', // Ensures white background on mobile
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 8,
    color: '#333',
  },
  link: {
    color: '#007bff',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
