import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Modal, Alert, Platform } from "react-native";
import Constants from "expo-constants";  // Ensure you have this import for expo constants

const CreateEventForm = () => {
  const [ride_name, setRideName] = useState("");
  const [start_location, setStartLocation] = useState("");
  const [end_location, setEndLocation] = useState("");
  const [distance, setDistance] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/rides/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ride_name, start_location, end_location, distance })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      Alert.alert("Success", "Event Created Successfully!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const handleDateChange = (newDate) => {
    setDateTime(newDate);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Event</Text>
      <TextInput
        placeholder="Event Title"
        value={ride_name}
        onChangeText={setRideName}
        style={styles.input}
      />
      <TextInput
        placeholder="Start Location"
        value={start_location}
        onChangeText={setStartLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="End Location"
        value={end_location}
        onChangeText={setEndLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Distance (in km)"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEventForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  inputText: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 14,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  }
});
