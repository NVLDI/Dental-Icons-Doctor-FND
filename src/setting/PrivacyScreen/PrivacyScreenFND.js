import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StatusBar, TextInput, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './PrivacyScreenStyle';

const PrivacyScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDataCollectionEnabled, setDataCollectionEnabled] = useState(false);
  const [isAccountVisibilityPublic, setAccountVisibilityPublic] = useState(true);
  const [isLocationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isTwoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSearchPress = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleSaveChanges = () => {
    alert('Privacy settings saved successfully!');
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop}>
        <StatusBar backgroundColor="#6c757d" />
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {isSearchVisible ? (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search Privacy Settings..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>Privacy</Text>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Each setting section */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Data Collection</Text>
            <Text style={styles.settingDescription}>Enable or disable data collection for improving your experience.</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Data Collection</Text>
              <Switch value={isDataCollectionEnabled} onValueChange={setDataCollectionEnabled} />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Account Visibility</Text>
            <Text style={styles.settingDescription}>Choose whether your account is visible to others.</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Make Account Public</Text>
              <Switch value={isAccountVisibilityPublic} onValueChange={setAccountVisibilityPublic} />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Location Sharing</Text>
            <Text style={styles.settingDescription}>Enable or disable sharing your location with the app.</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Location Sharing</Text>
              <Switch value={isLocationSharingEnabled} onValueChange={setLocationSharingEnabled} />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Notification Preferences</Text>
            <Text style={styles.settingDescription}>Choose whether you want to receive notifications.</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Receive Notifications</Text>
              <Switch value={isNotificationsEnabled} onValueChange={setNotificationsEnabled} />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
            <Text style={styles.settingDescription}>Enable or disable two-factor authentication for added security.</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Two-Factor Authentication</Text>
              <Switch value={isTwoFactorAuthEnabled} onValueChange={setTwoFactorAuthEnabled} />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingTitle}>Password Visibility</Text>
            <Text style={styles.settingDescription}>Choose whether to show or hide your password when entering it.</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Show Password</Text>
              <Switch value={isPasswordVisible} onValueChange={setPasswordVisible} />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PrivacyScreen;
