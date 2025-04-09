import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import RideCard from "./RideCard";
import Constants from "expo-constants";

const UpcomingRides = ({ navigation }) => {
  
  const [rides, setRides] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
  };
  fetch(`http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/rides`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(!result.success) {
      console.log("Error : " + result.message);
      return;
    }
    setRides(result.data);
  })
  .catch(error => {
      console.error("Error: ", error);
  });

  const rides1 = [
    {
      id: 1,
      day: "SAT",
      date: "Mar 15, 2025",
      time: "8:00 AM",
      title: "Weekend City Explorer",
      location: "Central Park, New York",
      distance: "15 km",
      duration: "1.5 hrs",
      status: "Available",
    },
    {
      id: 2,
      day: "SUN",
      date: "Mar 16,2025",
      time: "7:00 AM",
      title: "Endurance Challenge",
      location: "Brooklyn Bridge",
      distance: "35 km",
      duration: "3 hrs",
      status: "Almost Full",
    },
    {
      id: 3,
      day: "THU",
      date: "Mar 20, 2025",
      time: "7:30 AM",
      title: "Charity Ride for Education",
      location: "Hudson River Park",
      distance: "25 km",
      duration: "2 hrs",
      status: "Available",
    },
    {
      id: 4,
      day: "SAT",
      date: "Mar 22, 2025",
      time: "7:00 AM",
      title: "Sunset Beach Ride",
      location: "Rockaway Beach",
      distance: "20 km",
      duration: "2 hrs",
      status: "Closed",
    },
  ];

  const onEnrollButtonPress = (ride) => {
    navigation.navigate("RideEnrollment", { ride })
  }

  const onViewDetailsButtonPress = (ride) => {
    navigation.navigate("RideDetails", { ride })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Rides</Text>
        <TouchableOpacity>
          <MaterialIcons name="map" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={22} color="#999" />
        <TextInput placeholder="Search rides..." style={styles.searchInput} />
      </View>

      {/* Rides List */}
      <FlatList
        data={rides}
        renderItem={(ride) => 
          <RideCard 
            ride={ride.item}
            viewDetails={onViewDetailsButtonPress}
            enroll={onEnrollButtonPress} 
          />
        }
        keyExtractor={(ride) => ride._id}
        numColumns={1}
        contentContainerStyle={styles.ridesList}
      />
    </View>
  );
};

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

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16
  },

  ridesList: {
    paddingHorizontal: 15,
    marginTop: 5
  },
});

export default UpcomingRides;
