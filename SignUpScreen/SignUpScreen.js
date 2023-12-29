
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert,Image, TouchableOpacity} from 'react-native';
import MyButton from '../../components/MyButton';
import MyTextInput from '../../components/MyTextInput';
import SocialMedia from '../../components/SocialMedia';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  const getErrors = (email, password, confirmPassword) => {
    const errors = {};
    if (!email) {
      errors.email = 'Please Enter Email';
    } else if (!email.includes('@') || !email.includes('.com')) {
      errors.email = 'Please Enter Valid Email';
    }

    if (!password) {
      errors.password = 'Enter Password';
    } else if (password.length < 8) {
      errors.password = 'Enter Strong Password';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Enter Password';
    } else if (confirmPassword.length < 8) {
      errors.confirmPassword = 'Enter Strong Password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Password does not match';
    }

    return errors;
  };

  const signUpTestFn = async () => {
      const errors = getErrors(email, password, confirmPassword);

      if (Object.keys(errors).length > 0) {
        setShowErrors(true);
        setErrors(errors);
        console.log(errors);
      } else {
        try {
          // Attempt to create user
          const userCredential = await auth().createUserWithEmailAndPassword(email, password);

          // Add user data to Firestore collection
          await firestore()
            .collection('Profile')
            .doc(userCredential.user.uid) // Use user's UID as the document ID
            .set({
              email: email,
              // Add other user data as needed
            });

          Alert.alert('User Created');
          navigation.navigate('login');
        } catch (error) {
          console.error(error);
        }
      }
    };

  return (
    <View style={styles.screenContainer}>
    <View style={styles.inputsContainer}>

         <View style={styles.signupHeader}>
                <Text style={styles.signupText}>Sign Up</Text>
                <Image source={require('../../assets/SocialMediaIcons/logo-todo.png')} style={styles.logo} />
              </View>


      <Text style={styles.heading}>Email</Text>
      <MyTextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter E-mail or User Name"
         placeholderTextColor="white"
        style={styles.inputText}
      />
      {showErrors && errors.email && <Text style={{ color: 'red',width:390,marginBottom: 10 }}>{errors.email}</Text>}


      <Text style={styles.heading}>Password</Text>
      <MyTextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="white"
                style={styles.inputText}
      />
      {showErrors && errors.password && <Text style={{ color: 'red',width:390,marginBottom: 10 }}>{errors.password}</Text>}
      <Text style={styles.heading}>Confirm Password</Text>
      <MyTextInput
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="white"
                style={styles.inputText}

      />
      {showErrors && errors.confirmPassword && (
        <Text style={{ color: 'red' ,width:390 ,marginBottom: 10}}>{errors.confirmPassword}</Text>
      )}
      <MyButton onPress={signUpTestFn} title="Sign up" />



       <Text style={styles.alreadyHaveAccountText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('login')}>
                 Login
              </Text>
            </Text>


      <View>
        <Text style={styles.or}>Or Sign in with</Text>
         <TouchableOpacity style={styles.googleButton}  >
                      <Image source={require('../../assets/SocialMediaIcons/google.png')} style={styles.googleIcon} />
                      <Text style={styles.buttonText}>Login with Google</Text>
                    </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({

  inputsContainer: {
    height: 550,
     backgroundColor: '#6499ED',
    width: '100%',

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  inputText: {
      color: 'white', // Set the text color to white
      // Add any other styles you need for the input tex
      borderColor: 'white', // Set the border color to white

    },

  or: {
    fontSize: 20,
    marginTop: 20,
     marginBottom: 20,
    color: 'black',
    textAlign: 'center',

  },

  alreadyHaveAccountText: {
      marginTop: 10,
      fontSize: 16,
      color: 'black',
    },

    loginLink: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
      heading: {
        fontWeight: '800',
         marginRight: 10,
          width: 380,
        marginBottom: -15,
        color: '#000000',
      },


      signupHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        },
        signupText: {
          fontSize: 30,
          fontWeight: '500',
          marginRight: 10,
          color: 'black',
        },
        logo: {
          width: 50,
          height: 50,
        },

         googleButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#4285F4', // Google Blue color
            padding: 10,
            borderRadius: 5,
            width: '80%', // Adjust the width as needed
            justifyContent: 'center',
            marginVertical: 10,
          },
          buttonText: {
            color: '#FFFFFF',
            marginLeft: 10,
            fontSize: 18,
          },
          googleIcon: {
            width: 40,
            height: 30,
            marginRight: 60,
          },

});