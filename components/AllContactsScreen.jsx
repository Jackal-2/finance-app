import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur'; 

const AllContactsScreen = ({ route, navigation }) => {
  const { imagesData } = route.params; 


  const handleAddContact = () => {
    console.log("Add new contact");
  };

  // Handle the contact press (this is where you could navigate to a contact details screen, for example)
  const handleContactPress = (contact) => {
    console.log(`Contact pressed: ${contact.name}`);
    // Navigate to the SendMoneyScreen with selected contact info
    navigation.navigate('Send', {
      contactName: contact.name,
      contactPhoto: contact.source,
      contactCard: contact.cardNumber,
    });
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#266A61', '#0F0F0F']} 
        style={styles.background}
      >
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>All Contacts</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {imagesData.map((contact) => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactContainer} 
            onPress={() => handleContactPress(contact)} 
          >
            <Image source={contact.source} style={styles.contactImage} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactCardNumber}>{contact.cardNumber}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  addButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingLeft:"10"
  },
  contactImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  contactInfo: {
    justifyContent: 'center',
  },
  contactName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  contactCardNumber: {
    color: '#979ea8',
    fontSize: 14,
  },
});

export default AllContactsScreen;
