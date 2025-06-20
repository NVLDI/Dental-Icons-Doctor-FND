// AboutScreenFND.js
import React, { useState } from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, View, TextInput, ScrollView, Linking
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from './AboutScreenStyle';

const AboutScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);
  const openURL = (url) => Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {isSearchVisible ? (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search About App..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>About</Text>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.header}>About the App</Text>
            <Text style={styles.subHeader}>Your gateway to better health management</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Description</Text>
            <Text style={styles.text}>
              This app helps you manage your health records, appointments, and communications with your healthcare provider.
              It simplifies the way you manage and track your medical history, treatments, and appointments, ensuring a
              seamless and connected experience.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Version</Text>
            <Text style={styles.text}>Version 1.0.0</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.text}>Developed by: Suman Bohra Santhosh, and the White Square Team</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal Information</Text>
            <TouchableOpacity onPress={() => openURL('https://www.dentalicons.in/privacy-policy')}>
              <Text style={styles.link}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openURL('https://www.dentalicons.in/terms-conditions')}>
              <Text style={styles.link}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity onPress={() => openURL('https://facebook.com/yourapp')}>
                <FontAwesome name="facebook" size={30} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openURL('https://twitter.com/yourapp')}>
                <FontAwesome name="twitter" size={30} color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openURL('https://instagram.com/yourapp')}>
                <FontAwesome name="instagram" size={30} color="#C13584" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <TouchableOpacity onPress={() => openURL('mailto:info@dentalicons.in')}>
              <Text style={styles.link}>info@dentalicons.in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AboutScreen;