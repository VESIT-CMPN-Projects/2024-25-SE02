import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import RideCard from "./RideCard";
import Constants from "expo-constants";
import { AuthContext } from "./AuthContext";

const UpcomingRides = ({ navigation }) => {
  
  const { user } = useContext(AuthContext)
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledRides, setEnrolledRides] = useState([]);

  useEffect(() => {
    const fetchRides = () => {
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
      })
      .finally(() => {
        setLoading(false)
      })
    }

    const fetchEnrolledRides = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      fetch(`http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000/registrations`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(!result.success) {
          console.log("Error : ", result.error);
          return;
        }
        const userRides = result.data.filter(reg => reg.user_id._id === user._id).map(reg => reg.ride_id._id)
        setEnrolledRides(userRides)
      }).catch(error => {
        console.error("Error: ", error);
      });
    }
    
    fetchRides();
    if(user) {
      fetchEnrolledRides();
    }
  }, [])

  const onEnrollButtonPress = (ride) => {
    if(user) {
      navigation.navigate("RideEnrollment", { ride })
    } else {
      Alert.alert("Login Required", "Please Login to Enroll for a Ride")
      navigation.navigate("Login")
    }
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
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <FlatList
            data={rides}
            renderItem={(ride) => 
              <RideCard 
                ride={ride.item}
                viewDetails={onViewDetailsButtonPress}
                enroll={onEnrollButtonPress} 
                isEnrolled={enrolledRides.includes(ride.item._id)}
              />
            }
            keyExtractor={(ride) => ride._id}
            numColumns={1}
            contentContainerStyle={styles.ridesList}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "9%"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
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
