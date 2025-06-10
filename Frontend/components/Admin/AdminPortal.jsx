import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Sidebar from "./Sidebar";
import CreateEventForm from "./CreateEventForm";
import CreateMerchandiseForm from "./CreateMerchandiseForm";
import MerchandiseList from "./MerchandiseList";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return <CreateEventForm />;
      case "merchandise":
        return <MerchandiseList />;
      case "createMerchandise":
        return <CreateMerchandiseForm />;
      default:
        return (
          <View style={styles.dashboardContent}>
            <Text style={styles.header}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.quickCard, { backgroundColor: "#007BFF" }]}
                onPress={() => setActiveTab("events")}
              >
                <Text style={styles.cardText}>Add New Event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickCard, { backgroundColor: "#28a745" }]}
                onPress={() => setActiveTab("createMerchandise")}
              >
                <Text style={styles.cardText}>Add Merchandise</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuIcon}>
            <MaterialIcons name="menu" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.portalTitle}>Admin Dashboard</Text>
        </View>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Sidebar Modal */}
      <Modal
        visible={sidebarVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.sidebarContainer}>
          <Sidebar
            onChangeTab={(tab) => {
              setActiveTab(tab);
              setSidebarVisible(false);
            }}
            activeTab={activeTab}
          />
        </View>
      </Modal>

      {/* Main Content */}
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

export default AdminPortal;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
    paddingTop: 40, // To create space for status bar
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuIcon: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
    elevation: 2
  },
  portalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10, // Add margin to avoid too much space
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start"
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f6f8fa"
  },
  dashboardContent: {
    flex: 1
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 20
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  quickCard: {
    padding: 20,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center"
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});
