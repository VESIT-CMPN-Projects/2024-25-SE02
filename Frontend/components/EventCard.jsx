import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const EventCard = ({ ride, viewDetails }) => {
  return (
    <View style={styles.eventCard}>
      <View style={styles.detailsCard}>
        <Text style={styles.eventTitle}>{ride.title}</Text>
        <View style={styles.detailsContainer}>
          <Image source={require("../assets/calendar.png")} style={styles.icon}></Image>
          <Text style={styles.eventDetails}>{ride.date}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Image source={require("../assets/clock.png")} style={styles.icon}></Image>
          <Text style={styles.eventDetails}>{ride.time}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Image source={require("../assets/location.png")} style={styles.icon}></Image>
          <Text style={styles.eventDetails}>{ride.location}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewDetailsButton} onPress={() => {viewDetails(ride)}}>
          <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EventCard;

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 180,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10
  },
  eventTitle: {
    fontWeight: "bold",
    marginVertical: 5
  },
  eventDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  eventDetails: {
    marginLeft: 5,
    paddingVertical: 3,
    color: "#666"
  },
  viewDetailsButton: {
    backgroundColor: "#0057FF",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#fff",
    fontWeight: "bold"
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 10
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  details: {
    marginVertical: 4,
  },
});