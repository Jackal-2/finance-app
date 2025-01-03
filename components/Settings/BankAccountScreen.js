// BankAccountScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Import Paper components for UI


// Sample bank account data (this would usually come from an API)
let existingBankAccounts = [
    { id: 1, accountNumber: '1234-5678-9876', routingNumber: '111000025', type: 'Checking' },
];

const BankAccountScreen = () => {
    const { setLinkedBankAccount } = useBankAccount(); // Access the context function to set linked bank account
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [isLinking, setIsLinking] = useState(false);
    const [accountLinked, setAccountLinked] = useState(false);

    const linkBankAccount = async () => {
        if (!accountNumber || !routingNumber || !accountType) {
            Alert.alert('Error', 'Please provide account number, routing number, and account type.');
            return;
        }

        if (accountLinked) {
            Alert.alert('Error', 'Only one bank account can be linked at a time.');
            return;
        }

        setIsLinking(true);
        try {
            // Simulate network request delay
            setTimeout(() => {
                existingBankAccounts.push({
                    id: existingBankAccounts.length + 1,
                    accountNumber,
                    routingNumber,
                    type: accountType,
                });

                // Set the linked account in the context
                setLinkedBankAccount({
                    accountNumber,
                    routingNumber,
                    type: accountType,
                });

                Alert.alert('Success', 'Bank account linked successfully!');
                setAccountNumber('');
                setRoutingNumber('');
                setAccountType('');
                setIsLinking(false);
                setAccountLinked(true);
            }, 2000);
        } catch (error) {
            setIsLinking(false);
            Alert.alert('Error', 'Failed to link bank account. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Display linked bank accounts */}
            <View style={styles.accountsList}>
                <Text style={styles.linkedTitle}>Linked Accounts</Text>
                {existingBankAccounts.length > 0 ? (
                    existingBankAccounts.map((account) => (
                        <Card key={account.id} style={styles.card}>
                            <Card.Content>
                                <Title style={styles.cardTitle}>{account.type} Account</Title>
                                <Paragraph style={styles.cardText}>Account Number: {account.accountNumber}</Paragraph>
                                <Paragraph style={styles.cardText}>Routing Number: {account.routingNumber}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <Text style={styles.noAccountsText}>No linked bank accounts found.</Text>
                )}
            </View>

            {/* Link External Bank Account Section */}
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
                    disabled={isLinking || accountLinked}
                    color="black"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#266A61',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#266A61',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    accountsList: {
        marginBottom: 30,
        paddingTop: '60',
    },
    card: {
        marginBottom: 15,
        backgroundColor: '#333',
    },
    cardTitle: {
        color: '#266A61',
    },
    cardText: {
        color: '#fff',
    },
    noAccountsText: {
        color: '#fff',
        fontSize: 16,
        fontStyle: 'italic',
    },
    sectionContainer: {
        marginBottom: 25,
    },
    buttonContainer: {
        marginTop: 20,
    },
    linkedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#266A61',
    },
});

export default BankAccountScreen; // Make sure to export the component as default
