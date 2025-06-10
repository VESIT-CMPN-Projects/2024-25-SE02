import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import useFetch from '../Custom Hooks/useFetch';

const Donations = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  const { error, message, refetch: donateAmount } = useFetch("/donations", { method: "POST" }, null, false);

  useEffect(() => {
    if(error) {
      Alert.alert("Error Occured", error.message);
    }
    if(message) {
      Alert.alert("Successful Donation", message);
    }
  }, [message]);

  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState(null);
  const [selectedAmountId, setSelectedAmountId] = useState(-1);
  const [selectedMethodId, setSelectedMethodId] = useState(-1);
  const amountsList = [
    [0, 100], [1, 250], [2, 500], [3, 1000], [4, 5000], [5, "Custom"]
  ];
  const methodsList = ["Credit Card", "UPI", "Net Banking", "Cash"];

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  const onAmountSelect = (val) => {
    if(selectedAmountId === val[0]) {
      setSelectedAmountId(-1);
      setAmount(0);
      return;
    }
    setSelectedAmountId(val[0]);
    if(val[1] !== "Custom") {
      setAmount(val[1]);
    } else {
      setAmount(0);
    }
  }

  const onMethodSelect = (index, method) => {
    if(selectedMethodId === index) {
      setSelectedMethodId(-1);
      setMethod(null);
      return;
    }
    setSelectedMethodId(index);
    setMethod(method);
  }

  const donate = () => {
    if(!amount) {
      Alert.alert("Invalid Data" ,"Please provide an amount to donate");
      return;
    }
    if(!method) {
      Alert.alert("Invalid Data", "Please select a method for payment");
      return;
    }
    donateAmount({
      body: JSON.stringify({
        user_id: user._id,
        amount: amount,
        payment_method: method
      })
    });
    setSelectedAmountId(-1);
    setAmount(0);
    setSelectedMethodId(-1);
    setMethod(null);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donations</Text>
        <TouchableOpacity>
          <MaterialIcons name="map" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require("../../assets/head.png")}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Make a Difference</Text>
          <Text style={styles.text1}>
            Your support helps us organize awareness rides, provide safety gear, and fund social causes.
          </Text>
          <Image source={require("../../assets/quotes.png")} style={styles.img1} />
          <Text style={styles.text2}>
            "Last year, we covered 5000 km for environmental awareness thanks to our donors!"
          </Text>
          <Text style={styles.text3}>Select Amount</Text>

          <View style={styles.amountChoiceSetContainer}> 
            <View style={styles.amountChoiceSetColumn}>            
              {amountsList.map((val) => {
                const isSelected = selectedAmountId >= 0 && val[0] == selectedAmountId;
                return(
                  <TouchableOpacity
                    style={[styles.amountBox, isSelected && styles.selectedItemAmountBox]}
                    key={val[0]}
                    onPress={() => onAmountSelect(val)}
                  >              
                    <Text style={styles.amount}>{val[0] !== 5 && "₹ "}{val[1]}</Text>
                  </TouchableOpacity>
                )
              })}
            </View> 
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Donation Amount"
              style={[styles.input, (selectedAmountId === 5) && styles.disabledInput]}
              value={amount}
              onChangeText={setAmount}
              editable={selectedAmountId === 5}
            />
          </View>

          
          {/* Registration Fee */}
          <View style={styles.feeContainer}>
            <Text style={styles.feeAmount}>₹ {amount}</Text>
            <Text style={styles.feeLabel}>Total Amount</Text>
          </View>

          <Text style={styles.detailsTitle}>Choose Method</Text>
          <View style={styles.methodChoiceSetContainer}> 
            <View style={styles.methodChoiceSetColumn}>            
              {methodsList.map((meth, index) => {
                const isSelected = selectedMethodId >= 0 && index == selectedMethodId;
                return(
                  <TouchableOpacity
                    style={[styles.methodBox, isSelected && styles.selectedItemMethodBox]}
                    key={index}
                    onPress={() => onMethodSelect(index, meth)}
                  >              
                    <Text style={styles.method}>{meth}</Text>
                  </TouchableOpacity>
                )
              })}
            </View> 
          </View>

          {/* User Data */}
          {/* <Text style={styles.detailsTitle}>Donor Details</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View> */}

          <TouchableOpacity style={styles.donateButton} onPress={() => donate()}>
            <Text style={styles.donateText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </View>
  )
}

export default Donations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "9%"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },

  heroContainer: {
    position: "relative"
  },
  heroImage: {
    width: "100%",
    height: 180
  },
  heroTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 20
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  heroSubtitle: {
    color: "#fff"
  },

  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  text1: {
    fontSize: 16,
    marginTop: 10
  },
  text2: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10
  },
  img1: {
    marginTop: 15,
    marginLeft: 10
  },
  text3: {
    fontSize: 18,
    fontWeight: 800,
    marginVertical: 15
  },

  amountChoiceSetContainer: {
    gap: 20,
    justifyContent: "space-between"
  },
  amountChoiceSetColumn: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "2%",
    justifyContent: "space-between"
  },
  amountBox: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: "50%",
    alignItems: "center",
    width: "32%"
  },
  selectedItemAmountBox: {
    borderColor: "blue",
    borderWidth: 2
  },
  amount: {
    fontSize: 17,
    fontWeight: 600,
  },
 
  methodChoiceSetContainer: {
    gap: 20,
    justifyContent: "space-between"
  },
  methodChoiceSetColumn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  methodBox: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    alignItems: "center",
    width: "45%"
  },
  selectedItemMethodBox: {
    borderColor: "blue",
    borderWidth: 2
  },
  method: {
    fontSize: 17,
    fontWeight: 600,
  },
  
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    width: "100%",
    marginVertical: 5,
  },
  input: {
    flex: 1,
    fontWeight: 500,
    color: "#000000"
  },


  /* Registration Fee Section */
  feeContainer: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
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

  detailsTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 10
  },
  icon: {
    marginRight: 10,
    marginLeft: 7,
  },
  
  donateButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    borderRadius: 25,
    borderColor: "#0057FF",
    borderWidth: 2,
    alignItems: "center"
  },
  donateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
})