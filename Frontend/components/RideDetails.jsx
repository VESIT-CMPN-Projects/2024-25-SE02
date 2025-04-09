import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const RideDetails = ({ navigation, route }) => {
  const ride = route.params?.ride;

  if (!ride) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No ride details available.</Text>
      </View>
    );
  }

  const datetime = new Date(ride.date_time);

  const date = datetime.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const time = (datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours()).toString().padStart(2, '0')
   + ":" + datetime.getMinutes().toString().padStart(2, '0')
   + " " + (datetime.getHours() >= 12 ? "PM" : "AM");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <TouchableOpacity>
          <MaterialIcons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Ride Image */}
      {/* <Image source={ride.image} style={styles.rideImage} /> */}

      {/* Ride Info */}
      <View style={styles.rideInfoContainer}>
        <Text style={styles.rideTitle}>{ride.ride_name}</Text>
        <View style={styles.dateTime}>
          <MaterialIcons name="event" size={18} color="#666" />
          <Text style={styles.dateText}>
            {date}  •  {time}
            {/* {ride.date}, {ride.day} • {ride.time} */}
          </Text>
        </View>

        {/* Start & End Locations */}
        <View style={styles.locationContainer}>
          <MaterialIcons name="place" size={20} color="green" />
          <Text style={styles.locationText}>Start : {ride.start_location}</Text>
        </View>
        <View style={styles.locationContainer}>
          <MaterialIcons name="flag" size={20} color="red" />
          <Text style={styles.locationText}>End : {ride.end_location}</Text>
        </View>

        {/* Distance, Duration, Difficulty */}
        <View style={styles.rideStats}>
          <View style={styles.statBox}>
            <FontAwesome5 name="road" size={20} color="#000" />
            <Text style={styles.statValue}>{ride.distance}</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialIcons name="access-time" size={20} color="#000" />
            <Text style={styles.statValue}>{ride.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialIcons name="bar-chart" size={20} color="#000" />
            <Text style={styles.statValue}>{ride.level}</Text>
            <Text style={styles.statLabel}>Difficulty</Text>
          </View>
        </View>

        {/* Spots Left & Register Button */}
        <View style={styles.rideDetailsContainer}>
          <View style={styles.spotsContainer}>
            <MaterialIcons name="people" size={20} color="#0057FF" style={{marginRight: 5, paddingTop: 2}} /> 
            <Text style={styles.spotsText}>12 spots left</Text>
          </View>
          <Text style={styles.totalRidersText}>Total: 50 riders</Text>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("RideEnrollment", { ride })}>
          <Text style={styles.registerText}>Enroll Now</Text>
        </TouchableOpacity>

        {/* Ride Leaders */}
        <Text style={styles.rideLeadersTitle}>Ride Leaders</Text>
        <View style={styles.rideLeaderContainer}>
          <Image
            source={require("../assets/leader1.png")}
            style={styles.leaderImage}
          />
          <View>
            <Text style={styles.leaderName}>
              Sarah Johnson{" "}
              <MaterialIcons name="verified" size={16} color="#0057FF" />
            </Text>
            <Text style={styles.leaderRole}>Lead Guide</Text>
          </View>
        </View>
        <View style={styles.rideLeaderContainer}>
          <Image
            source={require("../assets/leader2.png")}
            style={styles.leaderImage}
          />
          <View>
            <Text style={styles.leaderName}>
              Mike Chen{" "}
              <MaterialIcons name="verified" size={16} color="#0057FF" />
            </Text>
            <Text style={styles.leaderRole}>Support Guide</Text>
          </View>
        </View>

        {/* Ride Rules & Safety */}
        <TouchableOpacity style={styles.rulesContainer}>
          <MaterialIcons name="error-outline" size={24} color="#0057FF" />
          <View>
            <Text style={styles.rulesTitle}>
              Ride Rules & Safety Guidelines
            </Text>
            <Text style={styles.rulesSubtitle}>
              Important information for all riders
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 50
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },

  rideImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover"
  },
  badge: {
    position: "absolute",
    top: 70,
    left: 10,
    backgroundColor: "#0057FF",
    padding: 6,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  },

  rideInfoContainer: {
    padding: 15
  },
  rideTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    fontSize: 15,
    color: "#666",
    marginLeft: 10
   },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444"
  },

  rideStats: {
    flexDirection: "row",
    marginVertical: 15,
    gap: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  statBox: {
    alignItems: "center"
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5
  },
  statLabel: {
    fontSize: 12,
    color: "#666"
  },

  registerButton: {
    backgroundColor: "#0057FF",
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },

  mapPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 10,
  },

  highlightsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginVertical: 10,
  },
  highlightBox: {
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
  },
  highlightText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500"
  },

  errorText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "red"
  },
  rideDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f4ff",
    borderRadius: 6,
  },
  spotsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  spotsText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#0057FF",
  },
  totalRidersText: {
    fontSize: 14,
    color: "#666",
  },
  participantsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: "#0057FF",
    fontWeight: "500",
  },

  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  participantImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: -8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  moreParticipants: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginLeft: 10,
  },

  rideLeadersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 8,
  },
  rideLeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  leaderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  leaderRole: {
    fontSize: 14,
    color: "#666",
  },

  rulesContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  rulesTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  rulesSubtitle: {
    fontSize: 13,
    color: "#666",
  },
});

export default RideDetails;
