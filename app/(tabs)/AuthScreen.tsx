import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../_layout';

export default function AuthScreen() {
  const { setUserToken } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const router = useRouter();

  const isValidPackagingCorpEmail = (email: string) => {
    return email.toLowerCase().endsWith('@packagingcorp.com');
  };

  const handleAuth = async () => {
    setLoading(true);
    if (isSignUp && !isValidPackagingCorpEmail(email)) {
      Alert.alert('Error', 'Email must end with @packagingcorp.com!');
      setLoading(false);
      return;
    }
    try {
      let res;
      if (isSignUp) {
        res = await axios.post('http://172.20.10.2:3000/signup', {
          name,
          email,
          password,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        res = await axios.post('http://172.20.10.2:3000/login', {
          email,
          password,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      console.log('Auth response:', res.data);
      const token = res.data.token;
      if (!token || typeof token !== 'string') {
        Alert.alert('Error', `${isSignUp ? 'Signup' : 'Login'} failed: No token returned by backend.`);
        setLoading(false);
        return;
      }
      await SecureStore.setItemAsync('userToken', token);
      setUserToken(token);
      if (isSignUp) {
        Alert.alert('Success', res.data.message);
      } else {
        router.replace('/explore');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || (isSignUp ? 'Signup failed' : 'Login failed');
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {isSignUp && (
          <>
            <Text style={[styles.label, { color: colors.text }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Enter your name"
              placeholderTextColor={colors.text + '99'}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </>
        )}
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
          placeholder="Enter your email"
          placeholderTextColor={colors.text + '99'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
          placeholder="Enter your password"
          placeholderTextColor={colors.text + '99'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAuth} disabled={loading}>
          <Text style={[styles.buttonText, { color: colors.background }]}>{loading ? (isSignUp ? 'Signing Up...' : 'Logging In...') : (isSignUp ? 'Sign Up' : 'Login')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setIsSignUp((prev) => !prev)}>
        <Text style={[styles.link, { color: colors.primary }]}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
  },
  card: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fafbfc',
    fontSize: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  link: {
    color: '#007bff',
    marginTop: 8,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
}); 