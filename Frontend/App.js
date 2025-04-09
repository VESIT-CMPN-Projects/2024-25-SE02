import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import UpcomingRides from "./components/UpcomingRides";
import RideDetails from "./components/RideDetails";
import RideEnrollment from "./components/RideEnrollment";
import SuccessfulRegistration from "./components/SuccessfulRegistration";
import Shop from "./components/Shop";
import ItemDetails from "./components/ItemDetails";
import EmergencyCall from "./components/EmergencyCall";
import PaymentConfirmation from "./components/PaymentConfirmation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="UpcomingRides" component={UpcomingRides} />
        <Stack.Screen name="RideDetails" component={RideDetails} />
        <Stack.Screen name="RideEnrollment" component={RideEnrollment} />
        <Stack.Screen name="SuccessfulRegistration" component={SuccessfulRegistration} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="EmergencyCall" component={EmergencyCall} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
