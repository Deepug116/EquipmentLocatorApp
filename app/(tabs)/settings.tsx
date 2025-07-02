import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useThemeCustom } from '../../components/ThemeContext';
import { useAuth } from '../_layout';

export default function SettingsScreen() {
  const { theme, setTheme } = useThemeCustom();
  const isDark = theme === 'dark';
  const { logout } = useAuth();
  const { colors } = useTheme();

  const toggleSwitch = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Settings</Text>
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.subheading, { color: colors.text }]}>Appearance</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleSwitch}
          />
        </View>
        <Text style={[styles.modeText, { color: colors.text }]}>Current mode: {isDark ? 'Dark' : 'Light'}</Text>
        <View style={styles.divider} />
        <Text style={[styles.subheading, { color: colors.text }]}>Account</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={[styles.logoutButtonText, { color: '#e74c3c' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
  },
  modeText: {
    fontSize: 14,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  logoutButton: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 