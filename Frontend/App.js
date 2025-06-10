import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./components/User/LoginPage";
import SignUpPage from "./components/User/SignUpPage";
import HomePage from "./components/User/HomePage";
import UpcomingRides from "./components/User/UpcomingRides";
import RideDetails from "./components/User/RideDetails";
import RideEnrollment from "./components/User/RideEnrollment";
import SuccessfulRegistration from "./components/User/SuccessfulRegistration";
import Shop from "./components/User/Shop";
import ItemDetails from "./components/User/ItemDetails";
import EmergencyCall from "./components/User/EmergencyCall";
import PaymentConfirmation from "./components/User/PaymentConfirmation";
import UserProfile from "./components/User/UserProfile";
import UserEnrollments from "./components/User/UserEnrollments";
import Donations from "./components/User/Donations";
import AdminLoginPage from "./components/Admin/AdminLoginPage";
import AdminPortal from "./components/Admin/AdminPortal";
import { AuthProvider } from "./components/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="UpcomingRides" component={UpcomingRides} />
          <Stack.Screen name="RideDetails" component={RideDetails} />
          <Stack.Screen name="RideEnrollment" component={RideEnrollment} />
          <Stack.Screen name="UserEnrollments" component={UserEnrollments} />
          <Stack.Screen name="SuccessfulRegistration" component={SuccessfulRegistration} />
          <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="ItemDetails" component={ItemDetails} />
          <Stack.Screen name="Donations" component={Donations} />
          <Stack.Screen name="EmergencyCall" component={EmergencyCall} />
          <Stack.Screen name="AdminLoginPage" component={AdminLoginPage} />
          <Stack.Screen name="AdminPortal" component={AdminPortal} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
