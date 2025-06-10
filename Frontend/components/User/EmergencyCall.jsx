import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const EmergencyScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 70 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons name="arrow-back" size={24} color="black"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency</Text>
        {/* Spacer */}
        <View style={{ width: 24 }} />
      </View>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      <Text style={styles.sendSOS}>Send SOS Alert</Text>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <View style={styles.actionButton}>
          <Feather name="phone-call" size={24} color="#333" />
          <Text style={styles.actionText}>Call Emergency</Text>
        </View>
        <View style={styles.actionButton}>
          <Feather name="map-pin" size={24} color="#333" />
          <Text style={styles.actionText}>Share Location</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <View style={styles.actionButton}>
          <Feather name="alert-triangle" size={24} color="#333" />
          <Text style={styles.actionText}>Report Incident</Text>
        </View>
        <View style={styles.actionButton}>
          <Feather name="log-out" size={24} color="#333" />
          <Text style={styles.actionText}>Exit Ride</Text>
        </View>
      </View>

      {/* Emergency Contacts */}
      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <View style={styles.contactCard}>
        <Avatar.Icon size={50} icon="account" />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>John Smith</Text>
          <Text style={styles.contactRole}>Ride Captain</Text>
        </View>
        <Feather name="phone-call" size={20} color="#444" style={{ marginHorizontal: 10 }} />
      </View>

      <View style={styles.contactCard}>
        <Avatar.Icon size={50} icon="account" />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>Dr. Sarah Wilson</Text>
          <Text style={styles.contactRole}>Medical Support</Text>
        </View>
        <Feather name="phone-call" size={20} color="#444" style={{ marginHorizontal: 10 }} />
      </View>

      <View style={styles.contactCard}>
        <Avatar.Icon size={50} icon="account" />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>Local Police</Text>
          <Text style={styles.contactRole}>Emergency Services</Text>
        </View>
        <Feather name="phone-call" size={20} color="#444" style={{ marginHorizontal: 10 }} />
      </View>

      {/* Nearby Services */}
      <Text style={styles.sectionTitle}>Nearby Services</Text>
      <View style={styles.serviceCardContainer}>
        <View style={styles.serviceCard}>
          <Image
            source={require("../../assets/hospital.jpeg")}
            style={styles.serviceImage}
          />
          <View style={styles.serviceFooter}>
            <Text style={styles.serviceName}>LakeCity Hospital</Text>
            <Text style={styles.serviceDistance}>0.8 km</Text>
            <TouchableOpacity style={styles.navigateBtn}>
              <Text style={styles.navigateText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.serviceCard}>
          <Image
            source={require("../../assets/police.jpeg")}
            style={styles.serviceImage}
          />
          <View style={styles.serviceFooter}>
            <Text style={styles.serviceName}>Thane Police Station</Text>
            <Text style={styles.serviceDistance}>1.2 km</Text>
            <TouchableOpacity style={styles.navigateBtn}>
              <Text style={styles.navigateText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  sosButton: {
    alignSelf: "center",
    backgroundColor: "#FF3B30",
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  sosText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  sendSOS: {
    textAlign: "center",
    color: "#d00",
    fontWeight: "600",
    marginTop: 10,
    fontSize: 16,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    width: "42%",
    padding: 15,
    alignItems: "center",
  },
  actionText: {
    marginTop: 8,
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    color: "#000",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
  },
  contactRole: {
    fontSize: 13,
    color: "#666",
  },
  serviceCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  serviceImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  serviceFooter: {
    padding: 10,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  serviceDistance: {
    fontSize: 12,
    color: "#777",
    marginVertical: 5,
  },
  navigateBtn: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  navigateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
