import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from '../AuthContext';

const UserProfile = ({ navigation }) => {
  
  const { user, logout } = useContext(AuthContext);

  const dateJoined = user && new Date(user.date_joined)
  .toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      { user ? <>
        {/* If User Logged In */}
        <Image source={require("../../assets/user1.png")} style={styles.profilePhoto} />

        <View style={styles.userDataContainer}>
          <Text style={styles.title}>User Details</Text>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetailsTitle}>Name : </Text>
            <Text style={styles.userDetails}>{user.name}</Text>
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetailsTitle}>Email : </Text>
            <Text style={styles.userDetails}>{user.email}</Text>
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetailsTitle}>Phone Number : </Text>
            <Text style={styles.userDetails}>{user.phone}</Text>
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetailsTitle}>Date Joined : </Text>
            <Text style={styles.userDetails}>{dateJoined}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.myEnrollmentsBtn} onPress={() => navigation.navigate("UserEnrollments")}>
          <Text style={styles.myEnrollmentsBtnText}>My Enrollments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOutBtn} onPress={() => {
          logout();
          navigation.navigate("Login");
        }}>
          <Text style={styles.myEnrollmentsBtnText}>Log out</Text>
        </TouchableOpacity>

      </> : <>

        {/* If User Not Logged In */}
        <View style={styles.loginRequestContainer}>
          <Text style={styles.loginRequestText}>Please Login to View your Profile</Text>
          <TouchableOpacity style={styles.loginRequestBtn} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginRequestBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      
      </>
      }

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate("Home")}}>
          <MaterialIcons name="home" size={28} color="#666" />
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
          <MaterialIcons name="person" size={28} color="#007bff" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "9%"
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },

  profilePhoto: {
    alignSelf: "center",
    height: 100,
    width: 100,
    marginBottom: 15
  },

  userDataContainer: {
    flexDirection: "column",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "stretch",
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10
  },
  userDetailsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "grey",
    alignSelf: "stretch",
    width: "100%"
  },
  userDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10
  },
  userDetails: {
    fontSize: 18
  },

  myEnrollmentsBtn: {
    backgroundColor: "#0057FF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginTop: 30,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "center"
  },
  logOutBtn:{
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 120,
    marginTop: 20,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: "center"
  },
  myEnrollmentsBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },

  bottomNav: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: {
      alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  loginRequestContainer: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: [{translateY: "-8%"}]
  },
  loginRequestText: {
    fontSize: 20,
    fontWeight: 500,

  },
  loginRequestBtn: {
    paddingVertical: 16,
    paddingHorizontal: 35,
    marginTop: 35,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "#0057FF"
  },
  loginRequestBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: 500
  }
})