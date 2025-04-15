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
        console.error("Error fetching merchandise : ", error);
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
        <Text style={styles.headerTitle}>Shop</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => <ShopItem item={item} onViewDetailsButtonPressed={onViewDetailsButtonPressed} />}
          keyExtractor={(item) => item._id.toString()}
          numColumns={1}
          style={styles.itemsList}
        />
      )}

      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate("Home")}}>
          <MaterialIcons name="home" size={28} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="event" size={28} color="#666" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate("Shop")}}>
          <MaterialIcons name="store" size={28} color="#007bff" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="notifications" size={28} color="#666" />
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate("UserProfile")}}>
          <MaterialIcons name="person" size={28} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shop;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "9%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    transform: [{ scaleX: 3 }, { scaleY: 3 }]
  },

  itemsList: {
    marginBottom: 68
  },
  
  bottomNav: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  }
})