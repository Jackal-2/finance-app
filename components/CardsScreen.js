import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Clipboard } from 'react-native';

const CardsScreen = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '1234 5678 9876 5432',
    cardHolderName: 'John Doe',
    expirationDate: '12/25',
    isActive: false,
  });

  // Function to generate a new card
  const generateNewCard = () => {
    const newCard = {
      cardNumber: Math.floor(Math.random() * 10000000000000000).toString().slice(0, 16),
      cardHolderName: 'John Doe',
      expirationDate: '12/25',
      isActive: false,
    };
    setCardDetails(newCard);
    showToast('New Virtual Card Generated');
  };

  // Function to activate or deactivate the card
  const toggleCardActivation = () => {
    setCardDetails((prevDetails) => ({ ...prevDetails, isActive: !prevDetails.isActive }));
    showToast(cardDetails.isActive ? 'Card Deactivated' : 'Card Activated');
  };

  // Function to copy card number to clipboard
  const copyCardNumber = () => {
    Clipboard.setString(cardDetails.cardNumber);
    showToast('Card Number copied to clipboard!');
  };

  // Function to show a Toast-like feedback
  const showToast = (message) => {
    Alert.alert('', message, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Card</Text>

      {/* Card Details */}
      <View
        style={[styles.card, { backgroundColor: cardDetails.isActive ? '#4CAF50' : '#E0E0E0' }]}
      >
        <Text style={styles.cardNumber}>{cardDetails.cardNumber}</Text>
        <Text style={styles.cardHolderName}>{cardDetails.cardHolderName}</Text>
        <Text style={styles.expirationDate}>Expires: {cardDetails.expirationDate}</Text>
      </View>

      {/* Actions and Buttons */}
      <View style={styles.actions}>
        {/* Generate New Card Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={generateNewCard}
        >
          <Text style={styles.buttonText}>Generate New Card</Text>
        </TouchableOpacity>

        {/* Activate/Deactivate Card Button */}
        <TouchableOpacity
          style={[styles.button,]}
          onPress={toggleCardActivation}
        >
          <Text style={styles.buttonText}>
            {cardDetails.isActive ? 'Deactivate Card' : 'Activate Card'}
          </Text>
        </TouchableOpacity>

        {/* Copy Card Number Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={copyCardNumber}
        >
          <Text style={styles.buttonText}>Copy Card Number</Text>
        </TouchableOpacity>

        {/* Add to Apple Pay Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => showToast('This feature is not yet implemented. You would normally add this virtual card to Apple Pay.')}
        >
          <Text style={styles.buttonText}>Add to Apple Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Set the background color to black
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',  // Set title text color to white
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',  // Card number text is white
    letterSpacing: 2,
  },
  cardHolderName: {
    fontSize: 18,
    color: '#fff',  // Card holder name text is white
    marginTop: 10,
  },
  expirationDate: {
    fontSize: 16,
    color: '#fff',  // Expiration date text is white
    marginTop: 5,
  },
  actions: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',  // Buttons have a darker background
  },
  buttonText: {
    color: '#fff',  // Button text is white
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardsScreen;
