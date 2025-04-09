import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const RideEnrollment = ({ navigation, route }) => {
  const ride = route.params?.ride;

  if (!ride) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No ride details available.</Text>
      </View>
    );
  }

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [checked, setChecked] = useState(false);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Enrollment</Text>
        <TouchableOpacity>
          <MaterialIcons name="help-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Ride Details */}
      <View style={styles.rideInfo}>
        <Text style={styles.rideTitle}>{ride.ride_name}</Text>
        <View style={styles.detailsContainer}>
          <MaterialIcons name="event" size={18} color="#666" />
          <Text style={styles.details}>
            {date}  ({datetime.toLocaleDateString('en-US', { weekday: 'short' })})
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialIcons name="schedule" size={18} color="#666" />
          <Text style={styles.details}>{time}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialIcons name="place" size={18} color="green" />
          <Text style={styles.details}>Start : {ride.start_location}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialIcons name="place" size={18} color="red" />
          <Text style={styles.details}>End : {ride.end_location}</Text>
        </View>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <FontAwesome5 name="bicycle" size={14} color="#fff" />
            <Text style={styles.badgeText}>{ride.distance} km</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: "#FF9800" }]}>
            <MaterialIcons name="bar-chart" size={14} color="#fff" />
            <Text style={styles.badgeText}>{ride.level}</Text>
          </View>
        </View>
      </View>

      {/* Personal Details */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <Text style={styles.label}>
          Full Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>
          Age <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>
          Contact Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <Text style={styles.label}>
          Emergency Contact <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Emergency contact number"
          keyboardType="phone-pad"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />

        <Text style={styles.label}>
          Medical Conditions{" "}
          <Text style={styles.optionalText}>(Optional)</Text>
        </Text>
        <TextInput
          style={styles.medicalInput}
          placeholder="Please mention any medical conditions..."
          value={medicalConditions}
          onChangeText={setMedicalConditions}
          multiline
        />

        <Text style={styles.label}>
          Cycling Experience Level <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Select experience level"
          value={experienceLevel}
          onChangeText={setExperienceLevel}
        />
        
      </View>

      {/* Registration Fee */}
      <View style={styles.feeContainer}>
        <Text style={styles.feeAmount}>₹1,499</Text>
        <Text style={styles.feeLabel}>Registration Fee</Text>
        <View style={styles.paymentButtons}>
          <TouchableOpacity style={styles.paymentButton} onPress={() => {
            console.log(fullName);
            console.log(age);
            console.log(contactNumber);
          }}>
            <Text style={styles.paymentText}>UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>Card</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
          color="#0057FF"
        />
        <Text style={styles.termsText}>
          I agree to the
          <Text style={styles.termsLink}> Terms & Conditions </Text>
          and confirm
          that the information provided is accurate.
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={()=> {navigation.navigate("SuccessfulRegistration", { ride })}}>
        <Text style={styles.registerText}>Register Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={()=> {navigation.navigate("PaymentConfirmation", { ride })}}>
        <Text style={styles.registerText}>Register Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },

  rideImage: {
    width: "100%",
    height: 230,
    resizeMode: "cover"
  },
  rideInfo: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  rideTitle: {
    fontSize: 22,
    fontWeight: "bold"
  },

  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },
  details: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444"
  },
  dateText: {
    fontSize: 15,
    color: "#666",
    marginLeft: 8
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444"
  },

  badges: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#0057FF",
    borderRadius: 5,
  },
  badgeText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14
  },

  formContainer: {
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5
  },
  required: {
    color: "red"
  },

  input: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  uploadBox: {
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },

  /* Registration Fee Section */
  feeContainer: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    elevation: 2, // For subtle shadow effect
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  feeLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  paymentButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 12,
  },
  paymentButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  paymentText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },

  /* Terms and Conditions */
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 1,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
  },
  termsLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },

  /* Register Button */
  registerButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  registerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  medicalInput: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
    minHeight: 80, // Allows multiline input
    textAlignVertical: "top", // Ensures placeholder starts from top
  },
  optionalText: {
    fontSize: 14,
    color: "#777",
  },
});

export default RideEnrollment;
