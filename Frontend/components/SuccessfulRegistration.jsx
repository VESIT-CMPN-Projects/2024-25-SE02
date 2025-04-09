import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const SuccessfulRegistration = ({ navigation, route }) => {
  const ride = route.params?.ride;
  const datetime = new Date(ride.date_time);

  const date = datetime.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const day = datetime.toLocaleDateString('en-US', {
    weekday: 'short'
  });

  const time = (datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours()).toString().padStart(2, '0')
   + ":" + datetime.getMinutes().toString().padStart(2, '0')
   + " " + (datetime.getHours() >= 12 ? "PM" : "AM");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <Image source={require("../assets/checkmark.png")} style={styles.checkmark}></Image>
        <Text style={styles.title}>Registration Successful</Text>
        <Text style={styles.subtitle}>You're officially enrolled for the ride</Text>

        {/* Ride Details */}
        <View style={styles.cardContainer}>
          <Text style={styles.rideTitle}>{ride.ride_name}</Text>
          <View style={styles.detailsContainer}>
            <MaterialIcons name="event" size={18} color="black" style={styles.icon} />
            <Text style={styles.details}>{date}  ({day})</Text>
          </View>
          <View style={styles.detailsContainer}>
                    <MaterialIcons name="schedule" size={18} color="black" style={styles.icon} />
            <Text style={styles.details}>{time}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <MaterialIcons name="place" size={18} color="green" style={styles.icon} />
            <Text style={styles.details}>Start : {ride.start_location}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <MaterialIcons name="place" size={18} color="red" style={styles.icon} />
            <Text style={styles.details}>End : {ride.end_location}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Image source={require("../assets/distance.png")} style={styles.icon}></Image>
            <Text style={styles.details}>{ride.distance} km</Text>
          </View>
        </View>
      </View>
    </View>

  )
}

export default SuccessfulRegistration;

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
    padding: 15,
    marginLeft: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  dataContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    width: 80,
    height: 80,
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold"
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 25,
    fontSize: 16,
    fontWeight: 500,
    color: "#888888"
  },
  cardContainer: {
    width: "100%",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 30,
    paddingVertical: 25,
    marginVertical: 40
  },
  rideTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center"
  },
  icon: {
    height: 18,
    width: 18,
    marginRight: 10
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  details: {
    marginVertical: 4,
    fontSize: 18
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
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