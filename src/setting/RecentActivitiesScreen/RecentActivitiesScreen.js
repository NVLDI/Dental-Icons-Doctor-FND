import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './RecentActivitiesScreenStyle'; // Import the external style

const activities = [
  { id: '1', title: 'Profile updated', description: 'You updated your profile.', time: '2 hours ago' },
  { id: '2', title: 'New message', description: 'You received a new message from John.', time: '5 hours ago' },
  { id: '3', title: 'Appointment booked', description: 'Your dental appointment is scheduled for tomorrow.', time: '1 day ago' },
  { id: '4', title: 'Password changed', description: 'You changed your password successfully.', time: '2 days ago' },
];

const RecentActivitiesScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchPress = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {isSearchVisible ? (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search Activities..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>Recent Activities</Text>
          )}

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={activities.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={({ item }) => (
            <View style={styles.activityCard}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDescription}>{item.description}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
};

export default RecentActivitiesScreen;
