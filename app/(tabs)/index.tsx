import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Equipment Locator App</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
