import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

const CreateMerchandiseForm = () => {
  const [item_name, setItemName] = useState("");
  const [item_type, setItemType] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/merchandise/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_name,
            item_type,
            image,
            price: Number(price),
            stock: Number(stock),
            description,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      Alert.alert("Success", "Merchandise added successfully!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Merchandise</Text>

      <TextInput
        placeholder="Item Name"
        value={item_name}
        onChangeText={setItemName}
        style={styles.input}
      />
      <TextInput
        placeholder="Item Type"
        value={item_type}
        onChangeText={setItemType}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80 }]}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Add Merchandise</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateMerchandiseForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
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
  },
});
