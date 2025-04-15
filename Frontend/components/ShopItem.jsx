import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ShopItem = ({ item, onViewDetailsButtonPressed }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
      <Text style={styles.itemName}>{item.item_name}</Text>
      <Text style={styles.itemType}>{item.item_type}</Text>
      <Text style={styles.itemPrice}>₹ {item.price}</Text>
      <TouchableOpacity 
        style={styles.viewDetailsButton} 
        onPress={() => onViewDetailsButtonPressed(item)}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ShopItem

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginHorizontal: 25,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  imageContainer: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 18
  },
  itemImage: {
    height: 220,
    width: 200,
    marginBottom: 15
  },
  itemName: {
    fontSize: 26,
    fontWeight: "bold",
  },
  itemType: {
    fontSize: 20,
    marginTop: 2
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: 500,
    paddingTop: 10
  },
  viewDetailsButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 12,
    marginBottom: 7,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center"
  },
  viewDetailsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 4,
    paddingHorizontal: 20
  },
})