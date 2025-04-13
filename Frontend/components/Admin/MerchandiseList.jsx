import React, { useEffect, useState } from "react";
import { Image, View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

const MerchandiseList = () => {
  const [merch, setMerch] = useState([]);

  useEffect(() => {
    fetch(
      `http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/merchandise`
    )
      .then((res) => res.json())
      .then(setMerch)
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Merchandise</Text>
      <FlatList
        data={merch}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.item_name}</Text>
            <Text>₹{item.price}</Text>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

export default MerchandiseList;

const cardWidth = Dimensions.get("window").width / 2 - 25;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingTop: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    width: cardWidth,
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
