// SignUpScreenFND.js
import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import styles from './SignUpScreenStyle';
import useSignUpLogic from './SignUpScreenBND';

export default function SignupScreen({ navigation, onSignUpSuccess }) {
  const {
    email1, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleSignup,
    showAlert, setShowAlert
  } = useSignUpLogic({ onSignUpSuccess });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.appName}>Dental Icons</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
          value={email1}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Do you have an account?
            <Text style={styles.link}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>www.dentalicons.in</Text>
      </View>
      <Modal
        visible={showAlert}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Success</Text>
            <Text style={styles.modalText}>Doctor Registered Successfully!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}