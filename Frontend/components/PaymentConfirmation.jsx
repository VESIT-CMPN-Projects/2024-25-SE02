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
import { SafeAreaView } from "react-native";

const PaymentConfirmation = ({ navigation, route }) => {
  const { ride, transactionId, amountPaid } = route.params || {};

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
  const day = datetime.toLocaleDateString('en-US', {
    weekday: 'short'
  });
  const time = (datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours()).toString().padStart(2, '0')
   + ":" + datetime.getMinutes().toString().padStart(2, '0')
   + " " + (datetime.getHours() >= 12 ? "PM" : "AM");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FB" }} contentContainerStyle={{ paddingBottom: 60 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Success Indicator */}
        <View style={styles.successContainer}>
          <FontAwesome5 name="check-circle" size={50} color="green" />
          <Text style={styles.successText}>Registration Successful!</Text>
          <Text style={styles.subText}>
            You're officially enrolled for the ride
          </Text>
        </View>

        {/* Ride Details */}
        <View style={styles.rideCard}>
          <Text style={styles.rideTitle}>{ride.ride_name}</Text>
          <Text style={styles.rideDate}>
            {date} • {time || "6:00 AM"}
          </Text>

          {/* Start & End Points */}
          <View style={styles.routeContainer}>
            <View style={styles.routeItem}>
              <FontAwesome5 name="circle" size={10} color="green" />
              <View style={styles.routeTextContainer}>
                <Text style={styles.routeTitle}>
                  Start: {ride.start_location}
                </Text>
                <Text style={styles.routeSubText}>
                  Meeting point at main entrance
                </Text>
              </View>
            </View>

            <View style={styles.routeItem}>
              <FontAwesome5 name="circle" size={10} color="red" />
              <View style={styles.routeTextContainer}>
                <Text style={styles.routeTitle}>End: {ride.end_location}</Text>
                <Text style={styles.routeSubText}>
                  Finish line at visitor center
                </Text>
              </View>
            </View>
          </View>

          {/* Ride Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{ride.distance}</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{ride.level}</Text>
              <Text style={styles.statLabel}>Difficulty</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{ride.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          </View>

          {/* Transaction Details */}
          <View style={styles.transactionContainer}>
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Transaction ID</Text>
              <Text style={styles.transactionValue}>#{transactionId}</Text>
            </View>
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Amount Paid</Text>
              <Text style={styles.transactionValue}>${amountPaid}</Text>
            </View>
          </View>
        </View>

        {/* QR Code Placeholder (Replace with Image Later) */}
        <View style={styles.qrContainer}>
          <Image source={{ uri: "/" }} style={styles.qrImage} />
          <Text style={styles.qrText}>Show this code at check-in</Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.downloadButton}>
          <FontAwesome5 name="download" size={16} color="white" />
          <Text style={styles.downloadText}>Download Ticket</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <FontAwesome5 name="share" size={16} color="#007AFF" />
          <Text style={styles.shareText}>Share Registration</Text>
        </TouchableOpacity>

        {/* Navigation Links */}
        <View style={styles.navigationLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.linkText}>🏠 Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpcomingRides")}
          >
            <Text style={styles.linkText}>📅 View Upcoming Rides</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingTop: 90,
  },
  content: {
    alignItems: "center",
    paddingBottom: 30,
  },

  /** Success Message **/
  successContainer: {
    alignItems: "center",
    marginTop: 60, 
    marginBottom: 20,
  },  
  successText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },

  /** Ride Details Card **/
  rideCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rideDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  /** Route Info **/
  routeContainer: {
    marginVertical: 15,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  routeTextContainer: {
    marginLeft: 10,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  routeSubText: {
    fontSize: 14,
    color: "#888",
  },

  /** Ride Stats **/
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },

  /** Transaction Info **/
  transactionContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  transactionLabel: {
    fontSize: 14,
    color: "#666",
  },
  transactionValue: {
    fontSize: 14,
    fontWeight: "bold",
  },

  /** QR Code **/
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  qrText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  /** Buttons **/
  downloadButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  downloadText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },

  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#007AFF",
    width: "90%",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  shareText: {
    color: "#007AFF",
    fontSize: 16,
    marginLeft: 10,
  },

  /** Navigation Links **/
  navigationLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
});
