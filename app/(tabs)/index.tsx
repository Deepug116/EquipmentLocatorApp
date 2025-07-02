import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../_layout';

function HomeScreen() {
  const { logout } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
        <Text style={[styles.title, { color: colors.text }]}>Equipment Locator App</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Welcome! Find and manage your equipment with ease.</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={[styles.buttonText, { color: colors.background }]}>Explore Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => router.push('./settings')}>
          <Text style={[styles.buttonText, { color: colors.background }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  card: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a4e69',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: 220,
    paddingVertical: 14,
    backgroundColor: '#222',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  secondaryButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});