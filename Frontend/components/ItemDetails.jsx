import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const ItemDetails = ({ navigation, route }) => {
  const item = route.params?.item;
  console.log(item)
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.item_name}</Text>
        <Text style={styles.itemType}>{item.item_type}</Text>
        <Text style={styles.itemDesc}>{item.description}</Text>
        <Text style={styles.itemStock}>Remaining : {item.stock}</Text>
        <Text style={styles.itemPrice}>Price : ₹ {item.price}</Text>
        {/* <Text style={styles.subHeaders}>Select Size</Text>
        <View style={styles.sizesList}>
          <Text style={styles.size}>S</Text>
          <Text style={styles.size}>M</Text>
          <Text style={styles.size}>L</Text>
          <Text style={styles.size}>XL</Text>
        </View> */}
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "9%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    padding: 15
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    left: "43%",
    transform: [{ translateX: -50 }]
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 30
  },
  itemImage: {
    height: 300,
    width: 250,
    marginTop: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    alignSelf: "center"
  },
  itemName: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20
  },
  itemType: {
    fontSize: 20,
    color: "#858585",
    marginTop: 7
  },
  itemDesc: {
    fontSize: 17,
    marginVertical: 10
  },
  itemStock: {
    fontSize: 20
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8
  },
  buyButton: {
    backgroundColor: "#0057FF",
    marginTop: 60,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#0057FF",
    borderRadius: 25,
    alignSelf: "center"
  },
  buyButtonText: {
    fontSize: 20,
    fontWeight: 600,
    color: "white"
  },

  subHeaders: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start"
  },
  sizesList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 15
  },
  size: {
    fontSize: 22,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 17,
    paddingHorizontal: 20,
    height: 70,
    width: 70
  }
})