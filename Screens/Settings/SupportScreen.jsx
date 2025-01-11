import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SupportScreen = () => {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by going to Settings > Security > Reset Password.",
    },
    {
      question: "how can I fund from my bank?",
      answer: "Go to Settings > Payment Methods",
    },
    {
      question: "How do I contact support?",
      answer: "You can reach out to support through live chat, email, or phone by going to Settings > Support.",
    },
  ];

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@example.com");
  };

  const handleCallPress = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleSendMessage = () => {
    setIsChatModalVisible(false);
    setMessage("");
    alert("Your message has been sent to support!");
  };

  return (
    <LinearGradient
      colors={["#1E1E1E", "#0F0F0F"]}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Customer Support</Text>
          <Text style={styles.subtitle}>
            How can we assist you today?
          </Text>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <TouchableOpacity style={styles.contactOption} onPress={handleEmailPress}>
            <Feather name="mail" size={24} color="#fff" />
            <Text style={styles.contactText}>Email Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactOption} onPress={handleCallPress}>
            <Feather name="phone" size={24} color="#fff" />
            <Text style={styles.contactText}>Call Support</Text>
          </TouchableOpacity>
        </View>

        {/* Live Chat Button */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => setIsChatModalVisible(true)}
        >
          <Feather name="message-circle" size={24} color="#fff" />
          <Text style={styles.chatButtonText}>Live Chat</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Chat Modal */}
      <Modal
        visible={isChatModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsChatModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Live Chat</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message..."
              placeholderTextColor="#aaa"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsChatModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor:"#0F0F0F"
  },
  header: {
    marginVertical: 20,
    alignItems: "center",
    paddingTop:"60"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginTop: 8,
  },
  section: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  answer: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#266A61",
    borderRadius: 10,
    marginVertical: 20,
  },
  chatButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    minHeight: 80,
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: "#266A61",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: "#aaa",
    fontSize: 16,
  },
});

export default SupportScreen;
