import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useBankAccount } from './BankAccountScreen';  // Updated import

const TransferScreen = () => {
  const { linkedBankAccount } = useBankAccount(); // Access the context

  const handleTransfer = () => {
    if (!linkedBankAccount) {
      alert('No linked bank account found!');
      return;
    }
    alert(`Transfer initiated from ${linkedBankAccount.accountNumber} to My XAP`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Initiate Transfer</Text>

      {linkedBankAccount ? (
        <>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.text}>{linkedBankAccount.accountNumber}</Text>
          <Text style={styles.text}>{linkedBankAccount.routingNumber}</Text>
          <Text style={styles.text}>{linkedBankAccount.type} Account</Text>
        </>
      ) : (
        <Text style={styles.text}>No linked bank account found.</Text>
      )}

      <Button title="Initiate Transfer" onPress={handleTransfer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TransferScreen;
