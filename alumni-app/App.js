import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          title="Login"
          onPress={() => {
            // Handle login logic here
          }}
        />
      </View>
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
