import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [favQuotation, setFavQuotation] = useState('');
  const [userUID, setUserUID] = useState('');

  useEffect(() => {
    // Simulating fetching user UID - Replace with actual code
    const fetchedUserUID = 'ReplaceWithCurrentUserUID';
    setUserUID(fetchedUserUID);

    const fetchUserProfile = async () => {
      try {
        const userProfileSnapshot = await firestore().collection('userProfiles').doc(fetchedUserUID).get();
        const userProfileData = userProfileSnapshot.data();

        if (userProfileData) {
          setFirstName(userProfileData.firstName || '');
          setLastName(userProfileData.lastName || '');
          setAboutYou(userProfileData.aboutYou || '');
          setFavQuotation(userProfileData.favQuotation || '');
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const saveUserProfile = async () => {
    try {
      await firestore().collection('todoProfiles').doc(userUID).set({
        firstName,
        lastName,
        aboutYou,
        favQuotation,
      });

      Alert.alert('Success', 'User profile saved successfully!');
      console.log('User profile saved successfully!');
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const updateUserProfile = async () => {
    try {
      await firestore().collection('todoProfiles').doc(userUID).update({
        firstName,
        lastName,
        aboutYou,
        favQuotation,
      });

      Alert.alert('Success', 'User profile updated successfully!');
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.textArea}
        placeholder="About You"
        value={aboutYou}
        onChangeText={(text) => setAboutYou(text)}
        multiline
      />
      <TextInput
        style={styles.textArea}
        placeholder="Favorite Quotation"
        value={favQuotation}
        onChangeText={(text) => setFavQuotation(text)}
        multiline
      />

      <View style={styles.buttonsContainer}>
        <Button title="Save" onPress={saveUserProfile} />
        <Button title="Update" onPress={updateUserProfile} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6499ED', // Updated background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Updated text color
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Updated background color
  },
  textArea: {
    height: 80,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Updated background color
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default UserProfileScreen;
