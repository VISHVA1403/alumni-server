import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: '#c0c0c0', // Background color for the login form
    borderRadius: 10, // Small edge curved like a square
    padding: 20,
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5, // To round the input edges
    marginBottom: 10,
    paddingLeft: 10,
  },
});
