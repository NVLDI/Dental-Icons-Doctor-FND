// LoginScreenFND.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './LoginScreenStyle';
import LoginScreenBND from './LoginScreenBND';

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const {
    email, setEmail,
    password, setPassword,
    passwordVisible, setPasswordVisible,
    isLoading,
    showAlert,
    userName,
    handleLogin,
    renderBackgroundIcons
  } = LoginScreenBND({ onLoginSuccess, navigation });

  return (
    <SafeAreaView style={styles.safeContainer}>
      {renderBackgroundIcons()}
      <FontAwesome5
        name="tooth"
        size={styles.dynamicIconSize}
        color="#d1d1d1"
        style={styles.backgroundIcon}
      />
      <View style={styles.container}>
        <Text style={styles.appName}>Dental Icons</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome5
              name={passwordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#aaa"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>
            Don’t have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <ActivityIndicator 
          size="large" 
          color="#6c757d" 
          style={styles.loadingIndicator} 
        />
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Dental Icons</Text>
      </View>
      <Modal
        visible={showAlert}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Login Successful</Text>
            <Text style={styles.modalText}>Welcome back, Dr. {userName}!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
