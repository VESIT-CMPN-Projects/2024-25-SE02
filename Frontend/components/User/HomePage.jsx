import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import EventCard from "./EventCard";
import useFetch from "../Custom Hooks/useFetch";

const HomePage = ({ navigation }) => {

  const { data: rides, loading, error, refetch } = useFetch("/rides");

  const viewDetails = (ride) => {
    navigation.navigate("RideDetails", {ride});
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aamhi Cycle Premi</Text>
        <TouchableOpacity>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require("../../assets/head.png")}
            style={styles.heroImage}
          />

          {/* Overlay Layer */}
          <View style={styles.overlay} />

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Join the Cycling Revolution</Text>
            <Text style={styles.heroSubtitle}>
              Making cycling accessible for everyone
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("UpcomingRides")}>
            <FontAwesome5 name="bicycle" size={24} color="#007bff" />
            <Text style={styles.actionText}>Upcoming Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Donations")}>
            <MaterialIcons name="volunteer-activism" size={24} color="#28a745" />
            <Text style={styles.actionText}>Donations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("EmergencyCall")}>
            <MaterialIcons name="call" size={24} color="red" />
            <Text style={styles.actionText}>Emergency Call</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.eventsScroll}
        >
          {loading ? (
              <ActivityIndicator size="large" color="0000ff" style={styles.loadingIndicator} />
            ) : error ? (
              <View>
                <Text style={styles.errorMessage}>
                  Error : {error?.message}
                </Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                  <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : rides != null ? rides.map((ride) => {
              return(
                <EventCard
                  ride={ride}
                  key={ride._id}
                  viewDetails={viewDetails}
                />
              )
            }) : (
              <View></View>
            )
          }
        </ScrollView>

        {/* Community Highlights */}
        <Text style={styles.communityTitle}>Community Highlights</Text>
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightCard}>
            <FontAwesome5 name="medal" size={28} color="#007bff" />
            <Text style={styles.highlightNumber}>500+ Rides</Text>
            <Text style={styles.highlightText}>Community Milestone</Text>
          </View>
          <View style={styles.highlightCard}>
            <FontAwesome5 name="users" size={28} color="#28a745" />
            <Text style={styles.highlightNumber}>1000+ Members</Text>
            <Text style={styles.highlightText}>Growing Community</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={28} color="#007bff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="event" size={28} color="#666" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate("Shop")}}>
          <MaterialIcons name="store" size={28} color="#666" />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="notifications" size={28} color="#666" />
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate("UserProfile")}}>
          <MaterialIcons name="person" size={28} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "9%"
  },
  navItem: {
    alignItems: "center"
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 50
  },

  heroContainer: {
    position: "relative"
  },
  heroImage: {
    width: "100%",
    height: 180
  },
  heroTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 20
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  heroSubtitle: {
    color: "#fff"
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    alignItems: "center"
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold"
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 5
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 35,
    paddingLeft: 20
  },
  viewAll: {
    color: "#007bff",
    fontWeight: 450
  },

  eventsScroll: {
    marginHorizontal: 15
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  errorMessage: {
    color: "red",
    fontSize: 14
  },
  retryButton: {
    marginTop: 8,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderRadius: 16,
    width: "60%",
    backgroundColor: "#d91111"
  },
  retryText: {
    color: "white",
    fontWeight: 600,
    fontSize: 14,
    alignSelf: "center"
  },

  highlightsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },
  highlightCard: {
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  highlightNumber: {
    fontSize: 16,
    fontWeight: "bold"
  },
  highlightText: {
    fontSize: 12,
    color: "#666"
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd"
  },

  eventDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2
  },
  eventDetails: {
    marginLeft: 5,
    color: "#666"
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "#000", 
    opacity: 0.5
  },
});

export default HomePage;
