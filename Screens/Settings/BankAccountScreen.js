import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Import Paper components for UI

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

// Sample bank account data (this would usually come from an API)
let existingBankAccounts = [
    { id: 1, accountNumber: '1234-5678-9876', routingNumber: '111000025', type: 'Checking' },
];

const BankAccountsPage = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountType, setAccountType] = useState(''); // User will manually type "Checking" or "Savings"
    const [isLinking, setIsLinking] = useState(false);
    const [accountLinked, setAccountLinked] = useState(false); // Track if account is already linked

    // Simulated API call for linking the bank account
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
                setAccountLinked(true); // Mark as linked once successful
            }, 2000); // Simulating a network request delay
        } catch (error) {
            setIsLinking(false);
            Alert.alert('Error', 'Failed to link bank account. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
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
                    disabled={isLinking || accountLinked} // Disable if linking or account already linked
                    color="black"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: 'white',
        paddingTop: height * 0.05,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.03,
        color: '#fff',
    },
    subtitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginVertical: height * 0.02,
        color: '#266A61',
    },
    label: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginVertical: height * 0.015,
        color: '#266A61',
    },
    input: {
        borderWidth: 1,
        padding: width * 0.04,
        marginBottom: height * 0.025,
        borderRadius: 5,
        color: '#000',
    },
    accountsList: {
        marginBottom: height * 0.05,
    },
    card: {
        marginBottom: height * 0.025,
        backgroundColor: '#333',
    },
    cardTitle: {
        color: '#266A61',
        fontSize: width * 0.05,
    },
    cardText: {
        color: '#fff',
        fontSize: width * 0.04,
    },
    noAccountsText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontStyle: 'italic',
    },
    sectionContainer: {
        marginBottom: height * 0.03,
    },
    buttonContainer: {
        marginTop: height * 0.05,
    },
    linkedTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginVertical: height * 0.02,
        color: '#266A61',
    },
});

export default BankAccountsPage;
