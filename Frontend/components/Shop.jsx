import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import ShopItem from './ShopItem';
import Constants from "expo-constants";

const Shop = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await fetch(`http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/merchandise`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchandise();
  }, []);

  const onViewDetailsButtonPressed = (item) => {
    navigation.navigate("ItemDetails", { item });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => <ShopItem item={item} onViewDetailsButtonPressed={onViewDetailsButtonPressed} />}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
        />
      )}
    </View>
  );
};

export default Shop;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    zIndex: 0,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
})