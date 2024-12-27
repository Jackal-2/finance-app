import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Import Paper components for UI

// Sample bank account data (this would usually come from an API)
const existingBankAccounts = [
    { id: 1, accountNumber: '1234-5678-9876', routingNumber: '111000025', type: 'Checking' },
    { id: 2, accountNumber: '9876-5432-1234', routingNumber: '111000050', type: 'Savings' },
];

const BankAccountsPage = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountType, setAccountType] = useState(''); // User will manually type "Checking" or "Savings"
    const [isLinking, setIsLinking] = useState(false);

    // Simulated API call for linking the bank account
    const linkBankAccount = async () => {
        if (!accountNumber || !routingNumber || !accountType) {
            Alert.alert('Error', 'Please provide account number, routing number, and account type.');
            return;
        }

        setIsLinking(true);
        try {
            // Simulating an API call (this would be an actual call to your backend or third-party service)
            setTimeout(() => {
                existingBankAccounts.push({
                    id: existingBankAccounts.length + 1,
                    accountNumber,
                    routingNumber,
                    type: accountType,
                });

                Alert.alert('Success', 'Bank account linked successfully!');
                setAccountNumber('');
                setRoutingNumber('');
                setAccountType('');
                setIsLinking(false);
            }, 2000); // Simulating a network request delay
        } catch (error) {
            setIsLinking(false);
            Alert.alert('Error', 'Failed to link bank account. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>

            {/* Display existing linked bank accounts */}
            <View style={styles.accountsList}>
                {existingBankAccounts.length > 0 ? (
                    existingBankAccounts.map((account) => (
                        <Card key={account.id} style={styles.card}>
                            <Card.Content>
                                <Title>{account.type} Account</Title>
                                <Paragraph>Account Number: {account.accountNumber}</Paragraph>
                                <Paragraph>Routing Number: {account.routingNumber}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <Text>No linked bank accounts found.</Text>
                )}
            </View>

            {/* Link an external bank account */}
            <View style={styles.sectionContainer}>
                <Text style={styles.subtitle}>Link External Bank Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter account number"
                    keyboardType="numeric"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter routing number"
                    keyboardType="numeric"
                    value={routingNumber}
                    onChangeText={setRoutingNumber}
                />
            </View>

            {/* Account Type Input */}
            <View style={styles.sectionContainer}>
                <Text style={styles.label}>Account Type (Checking/Savings)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter account type"
                    value={accountType}
                    onChangeText={setAccountType}
                />
            </View>

            {/* Link Bank Account Button */}
            <View style={styles.buttonContainer}>
                <Button
                    title={isLinking ? 'Linking...' : 'Link Bank Account'}
                    onPress={linkBankAccount}
                    disabled={isLinking}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: "100"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    accountsList: {
        marginBottom: 30,
    },
    card: {
        marginBottom: 15,
    },
    sectionContainer: {
        marginBottom: 25, // Adds space between each section (inputs, picker, button)
    },
    buttonContainer: {
        marginTop: 20, // Adds space between the input and the button
    },
});

export default BankAccountsPage;
