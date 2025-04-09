import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import axios from "axios";
import Constants from "expo-constants";

const SignUpPage = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = async () => {
    if (!isChecked) {
      Alert.alert("Terms & Conditions", "Please accept the terms to proceed.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/user/signup`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      Alert.alert("Success", response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join our Cycling Community</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          onChangeText={(text) => handleChange("phone", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => handleChange("confirmPassword", text)}
        />
      </View>

      <View style={styles.termsContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#007bff" : undefined}
        />
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink} onPress={() => navigation.replace("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    marginBottom: 20,
    marginTop: 5,
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
    marginLeft: 7,
  },
  input: {
    flex: 1,
    fontWeight: "500",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  termsText: {
    marginLeft: 5,
  },
  termsLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#0057FF",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginVertical: 10,
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
  },
  loginLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignUpPage;
