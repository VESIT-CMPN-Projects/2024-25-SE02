import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RideCard from "./RideCard";
import { AuthContext } from "../AuthContext";
import useFetch from "../Custom Hooks/useFetch";

const UserEnrollments = ({ navigation }) => {
  
  const { user } = useContext(AuthContext);

  const [ searchQuery, setSearchQuery ] = useState(""); 

  const { data: rides, loading: ridesLoading, error: ridesError, refetch: fetchRides } = useFetch("/rides");

  const filterRides = useCallback((data) => {
    if(!rides) {
      return [];
    }
    let userEnrolledRides = data
    .filter(reg => reg.user_id._id === user._id)
    .map(reg => reg.ride_id._id);
    
    userEnrolledRides = rides.filter(ride => userEnrolledRides.includes(ride._id));

    if(searchQuery) {
      userEnrolledRides = userEnrolledRides.filter(ride => ride.ride_name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return userEnrolledRides;

  }, [rides, searchQuery]);

  const { data: enrolledRides, loading: regLoading, error: regError, refetch: fetchRegistrations } = useFetch("/registrations", {}, filterRides, false);

  useEffect(() => {
    if(rides) {
      fetchRegistrations();
    }
  }, [rides, searchQuery]);

  const onViewDetailsButtonPress = (ride) => {
    navigation.navigate("RideDetails", { ride: ride, isEnrolledRide: true })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Enrollments</Text>
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
      {(ridesLoading || regLoading) ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (ridesError || regError) ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error : {(ridesError ? ridesError?.message : "") + (regError ? "\n"+regError?.message : "")}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => {
              ridesError && fetchRides();
              regError && fetchRegistrations();
            }}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={enrolledRides}
            renderItem={(ride) => {
              return <RideCard
                ride={ride.item}
                viewDetails={onViewDetailsButtonPress}
                showEnrollButton={false}
              />
            }}
            keyExtractor={(ride) => ride._id}
            numColumns={1}
            style={styles.ridesList}
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

export default UserEnrollments;
