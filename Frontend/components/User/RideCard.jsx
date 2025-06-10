import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, } from "@expo/vector-icons";

const RideCard = ({ ride, viewDetails, enroll, isEnrolled=false, showEnrollButton=true }) => {
  const datetime = new Date(ride.date_time);

  const date = datetime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const time = datetime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })
  .replace(/am|pm/g, match => match.toUpperCase())
  .replace(/^[0-9]{1}:/g, match => "0" + match);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.rideTitle}>{ride.ride_name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <MaterialIcons name="event" size={20} color="black" style={styles.icon} />
        <Text style={styles.details}>{date}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <MaterialIcons name="schedule" size={20} color="black" style={styles.icon} />
        <Text style={styles.details}>{time}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <MaterialIcons name="place" size={20} color="green" style={styles.icon} />
        <Text style={styles.details}>Start : {ride.start_location}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <MaterialIcons name="place" size={20} color="red" style={styles.icon} />
        <Text style={styles.details}>End : {ride.end_location}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Image source={require("../../assets/distance.png")} style={styles.icon}></Image>
        <Text style={styles.details}>{ride.distance} km</Text>
      </View>
      {isEnrolled && (
        <View style={styles.enrolledTagContainer}>
          <Text style={styles.enrolledTagText}>Enrolled</Text>
        </View>
      )}
      <TouchableOpacity style={styles.viewDetailsButton} onPress={() => {viewDetails(ride)}}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
      { showEnrollButton && !isEnrolled && 
        <TouchableOpacity style={styles.enrollButton} onPress={() => {enroll(ride)}}>
          <Text style={styles.enrollText}>Enroll Now</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default RideCard

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 30,
    paddingVertical: 28,
    marginVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d6d6d6"
  },
  titleContainer: {
    alignItems: "center"
  },
  rideTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  icon: {
    height: 20,
    width: 20,
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
  viewDetailsButton: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 12,
    borderRadius: 15,
    borderColor: "#0057FF",
    borderWidth: 2,
    alignItems: "center"
  },
  viewDetailsText: {
    color: "#0057FF",
    fontWeight: "bold",
    fontSize: 18
  },
  enrollButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    borderColor: "#0057FF",
    borderWidth: 2,
    alignItems: "center"
  },
  enrollText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },

  enrolledTagContainer: {
    backgroundColor: "rgba(184, 255, 185, 0.4)",
    alignItems: "center",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "rgba(169, 255, 171, 0.5)"
  },
  enrolledTagText: {
    color: "#199F1B",
    fontSize: 16,
    fontWeight: 500,
    paddingVertical: 4
  }
})