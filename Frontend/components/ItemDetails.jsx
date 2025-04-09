import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const ItemDetails = ({ route }) => {
  const item = route.params?.item;
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
      </View>

      <View style={styles.subConatiner}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹ {item.price}</Text>
        <Text style={styles.subHeaders}>Select Size</Text>
        <View style={styles.sizesList}>
          <Text style={styles.size}>S</Text>
          <Text style={styles.size}>M</Text>
          <Text style={styles.size}>L</Text>
          <Text style={styles.size}>XL</Text>
        </View>
      </View>
    </View>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25,
    justifyContent: "flex-start",
    alignItems: "center"
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
  subConatiner: {
    alignItems: "flex-start"
  },
  itemImage: {
    height: 250,
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
    marginVertical: 18
  },
  itemPrice: {
    fontSize: 22,
    fontWeight: 400
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