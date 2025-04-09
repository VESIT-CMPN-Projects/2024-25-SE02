import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email or Password not provided");
      return;
    }

    try {
      const response = await fetch(`http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
        return;
      }

      Alert.alert("Success", "User Login Successful");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error("Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>ACPF RideHub</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  subtitle: {
    color: "#888",
    marginBottom: 20,
    marginTop: 5
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 8,
    width: "90%",
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10
  },
  input: {
    flex: 1,
    fontWeight: 500
  },
  forgotPassword: {
    color: "#007bff",
    alignSelf: "flex-end",
    marginLeft: 200,
    marginBottom: 12,
    marginTop: 7
  },
  loginButton: {
    backgroundColor: "#0057FF",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginVertical: 5
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  guestButton: {
    backgroundColor: "#888888",
    borderWidth: 1,
    borderColor: "#888888",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginVertical: 5
  },
  guestText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15
  },
  signupText: {
    marginTop: 20
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold"
  },
});

export default LoginPage;
