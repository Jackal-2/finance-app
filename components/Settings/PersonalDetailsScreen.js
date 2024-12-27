import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


const PersonalDetailsScreen = ({ navigation }) => {
    // Initial details
    const [name, setName] = useState("Phil Foden");
    const [email, setEmail] = useState("Philfoden@gmail.com");
    const [dob, setDob] = useState("20-11-1990");
    const [phone, setPhone] = useState("123-456-7890");  // New state for phone number

    // Edit modes
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingDob, setIsEditingDob] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);  // New state for phone editing

    // Handle save changes
    const handleSave = () => {
        setIsEditingName(false);
        setIsEditingEmail(false);
        setIsEditingDob(false);
        setIsEditingPhone(false);  // Save phone number change
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#266A61', '#0F0F0F']}
                style={styles.background}
            >
                <BlurView intensity={50} style={styles.blurContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Personal Details</Text>
                    </View>
                </BlurView>
            </LinearGradient>


            {/* Name */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>

                <Text style={styles.value}>{name}</Text>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                {isEditingEmail ? (
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Enter your email"
                        placeholderTextColor="#B0B0B0"
                        autoFocus={true}
                    />
                ) : (
                    <Text style={styles.value}>{email}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEditingEmail(!isEditingEmail)}>
                    <Text style={styles.editButton}>{isEditingEmail ? 'Cancel' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                {isEditingPhone ? (
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        placeholder="Enter your phone number"
                        placeholderTextColor="#B0B0B0"
                        autoFocus={true}
                    />
                ) : (
                    <Text style={styles.value}>{phone}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEditingPhone(!isEditingPhone)}>
                    <Text style={styles.editButton}>{isEditingPhone ? 'Cancel' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.value}>{dob}</Text>
            </View>

            {/* Save Button */}
            {(isEditingName || isEditingEmail || isEditingDob || isEditingPhone) && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white",
        marginBottom: 200
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    blurContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: "15",
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: "10",
        paddingTop: "20"
    },
    inputGroup: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3, // for Android
        marginBottom: 40
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    editButton: {
        color: '#007BFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PersonalDetailsScreen;
