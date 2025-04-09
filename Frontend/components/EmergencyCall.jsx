import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const EmergencyCall = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Call</Text>
        <TouchableOpacity>
          <MaterialIcons name="map" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EmergencyCall

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#fff",
  paddingTop: 30
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
},
headerTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#333"
},
})