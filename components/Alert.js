import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";

const Alert = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Tack!</Text>
        <Text style={styles.message}>
          Vi hör av oss via e-post så snart den är tillgänglig.
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    margin: 60,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "medium",
    color: "black",
  },
});

export default Alert;
