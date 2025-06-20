// ProfileScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Avatar, Button, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './ProfileScreenStyle';
import { fetchProfileData, logoutUser } from './ProfileScreenBND';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await fetchProfileData();
      if (error) setError(error);
      else setProfile(data);
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await logoutUser();
          Alert.alert('Logged out successfully!');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }
    ]);
  };

  const handleEdit = () => {
    // Future: Navigate to edit profile screen
  };

  if (loading) {
    return <View style={styles.errorContainer}><ActivityIndicator size="large" color="#6c757d" /></View>;
  }

  if (error) {
    return <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>;
  }

  if (!profile) {
    return <Text>No profile data available.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={120} source={{ uri: 'assad' }} style={styles.avatar} />
            <Badge style={styles.ProfileVerifiedBadge}>{profile.status}</Badge>
          </View>
          <Text style={styles.name}>{capitalize(profile.dr_name)}</Text>
          <Text style={styles.role}>{profile.role}</Text>
          <Text style={styles.medicalId}>{profile.medicalID}</Text>
          <Button mode="outlined" icon="pencil" style={styles.editButton} onPress={handleEdit}>Edit Profile</Button>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.sectionText}><Text style={styles.label}>Specialty:</Text> {profile.specialty}</Text>
          <Text style={styles.sectionText}><Text style={styles.label}>Experience:</Text> {profile.experience}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <Text style={styles.sectionText}><Text style={styles.label}>Gender:</Text> {capitalize(profile.gender)}</Text>
          <View style={styles.row}>
            <Text style={styles.sectionText}><Text style={styles.label}>Since:</Text> {formatJoinDate(profile.created_at)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.sectionText}><Text style={styles.label}>Mobile Number:</Text> {profile.whatsapp_phone}</Text>
            <Badge style={styles.verifiedBadge}>{profile.status}</Badge>
          </View>
          <View style={styles.row}>
            <Text style={styles.sectionText}><Text style={styles.label}>Email ID:</Text> {profile.email}</Text>
            <Badge style={styles.verifiedBadge}>{profile.status}</Badge>
          </View>
          <Button mode="contained" icon="upload" style={styles.uploadButton} onPress={() => alert('Upload Certificate')}>Upload Certificate</Button>
        </View>

        <View style={styles.actionRow}>
          <Button mode="contained" style={[styles.button, styles.logoutButton]} onPress={handleLogout}>Logout</Button>
          <Button mode="outlined" style={[styles.button, styles.deleteButton]} onPress={() => alert('Account Deleted')}>Delete Account</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
const formatJoinDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export default ProfileScreen;