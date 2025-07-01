import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Equipment Locator App</Text>
      <Text style={styles.subtitle}>Welcome! Find and manage your equipment with ease.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Explore Equipment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.secondaryButtonText}>My Profile</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f6f8fa',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 8,
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
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007bff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});