import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Sidebar = ({ onChangeTab, activeTab }) => {
  const navigation = useNavigation();

  const links = [
    { label: "Dashboard", icon: "dashboard", value: "dashboard" },
    { label: "Cycle Events", icon: "event", value: "events" },
    { label: "Merchandise", icon: "storefront", value: "merchandise" },
    { label: "Logout", icon: "logout", value: "logout" }
  ];

  const handleTabChange = (value) => {
    if (value === "logout") {
      navigation.navigate("Login"); 
    } else {
      onChangeTab(value);
    }
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {links.map(link => (
        <TouchableOpacity
          key={link.value}
          style={[
            styles.link,
            activeTab === link.value && styles.activeLink
          ]}
          onPress={() => handleTabChange(link.value)}
        >
          <MaterialIcons
            name={link.icon}
            size={22}
            color={activeTab === link.value ? "#007BFF" : "#333"}
          />
          <Text
            style={[
              styles.linkText,
              activeTab === link.value && { color: "#007BFF" }
            ]}
          >
            {link.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 10,
    borderRightColor: "#e2e2e2",
    borderRightWidth: 1
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center"
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15
  },
  activeLink: {
    backgroundColor: "#f0f8ff",
    borderRadius: 8
  },
  linkText: {
    marginLeft: 10,
    fontSize: 15
  }
});
