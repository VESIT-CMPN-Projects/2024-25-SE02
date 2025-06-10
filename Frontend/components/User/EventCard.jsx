import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EventCard = ({ ride, viewDetails }) => {
  const datetime = new Date(ride.date_time);

  const date = datetime.getDate().toString().padStart(2,'0')
  + "-" + (datetime.getMonth() + 1).toString().padStart(2,'0')
  + "-" + datetime.getFullYear();

  const time = (datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours()).toString().padStart(2, '0')
   + ":" + datetime.getMinutes().toString().padStart(2, '0')
   + " " + (datetime.getHours() >= 12 ? "PM" : "AM");

  return (
    <View style={styles.eventCard}>
      <View style={styles.detailsCard}>
        <Text style={styles.eventTitle} numberOfLines={1}>{ride.ride_name}</Text>
        <View style={styles.detailsContainer}>
          <Image source={require("../../assets/calendar.png")} style={styles.icon}></Image>
          <Text style={styles.details}>{date}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Image source={require("../../assets/clock.png")} style={styles.icon}></Image>
          <Text style={styles.details}>{time}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Image source={require("../../assets/location.png")} style={styles.icon}></Image>
          <Text style={styles.details} numberOfLines={1}>{ride.start_location}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewDetailsButton} onPress={() => {viewDetails(ride)}}>
          <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EventCard;

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#DEDEDE",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 180,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10
  },
  eventTitle: {
    fontWeight: "bold",
    marginVertical: 5
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8
  },
  details: {
    marginLeft: 5,
    paddingVertical: 3,
    color: "#666"
  },
  viewDetailsButton: {
    backgroundColor: "#0057FF",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#fff",
    fontWeight: "bold"
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 10
  }
});