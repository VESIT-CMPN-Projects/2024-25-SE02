import { useCallback, useContext, useEffect, useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import RideCard from "./RideCard";
import { AuthContext } from "../AuthContext";
import useFetch from "../Custom Hooks/useFetch";

const UpcomingRides = ({ navigation }) => {
  
  const { user } = useContext(AuthContext);

  const [ searchQuery, setSearchQuery ] = useState("");

  const filterRides = useCallback((rides) => {
    if(searchQuery !== "") {
      return rides.filter(ride => ride.ride_name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return rides;
  }, [searchQuery]);

  const getUserEnrolledRides = (rides) => {
    if(user) {
      return rides.filter(reg => reg.user_id._id === user._id).map(reg => reg.ride_id._id);
    } else {
      return [];
    }
  }

  const { data: rides, loading, error, refetch: fetchRides } = useFetch("/rides", {}, filterRides);
  const { data: enrolledRides, refetch: getRegistrations } = useFetch("/registrations", {}, getUserEnrolledRides, false);

  useEffect(() => {
    if(rides) {
      getRegistrations();
    }
  }, [rides]);

  useEffect(() => {
    fetchRides();
  }, [searchQuery]);

  const onViewDetailsButtonPress = (ride) => {
    navigation.navigate("RideDetails", { ride })
  }

  const onEnrollButtonPress = (ride) => {
    if(user) {
      navigation.navigate("RideEnrollment", { ride });
    } else {
      Alert.alert("Login Required", "Please Login to Enroll for a Ride");
      navigation.navigate("Login");
    }
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
        <TextInput
          placeholder="Search rides..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Rides List */}
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error : {error?.message}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => fetchRides}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={rides}
            renderItem={(ride) => 
              <RideCard 
                ride={ride.item}
                viewDetails={onViewDetailsButtonPress}
                enroll={onEnrollButtonPress}
                isEnrolled={enrolledRides && enrolledRides.includes(ride.item._id)}
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
    padding: 18
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
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 15,
    marginTop: 20,
    alignItems: "center"
  },
  errorText: {
    color: "red",
    fontSize: 18,
    fontWeight: 500
  },
  retryButton: {
    marginTop: 15,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderRadius: 16,
    width: "40%",
    backgroundColor: "#d91111"
  },
  retryText: {
    color: "white",
    fontWeight: 600,
    fontSize: 14,
    alignSelf: "center"
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5
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
