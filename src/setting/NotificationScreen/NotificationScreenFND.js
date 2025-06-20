// NotificationScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StatusBar, TextInput, FlatList } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from './NotificationScreenStyle';

const notifications = [
  { id: '1', title: 'New message from admin', description: 'Click to read your messages.', isRead: false, timestamp: '5 mins ago' },
  { id: '2', title: 'Appointment Reminder', description: 'Your appointment is scheduled for tomorrow.', isRead: true, timestamp: '1 hour ago' },
  { id: '3', title: 'Appointment Reminder', description: 'Your appointment is scheduled for tomorrow.', isRead: true, timestamp: '1 hour ago' },
  { id: '4', title: 'Appointment Reminder', description: 'Your appointment is scheduled for tomorrow.', isRead: true, timestamp: '1 hour ago' },
];

const NotificationScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [notificationsList, setNotificationsList] = useState(notifications);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);
  const handleNotificationPress = (id) => {
    const updatedNotifications = notificationsList.map((n) =>
      n.id === id ? { ...n, isRead: !n.isRead } : n
    );
    setNotificationsList(updatedNotifications);
  };

  const filteredNotifications = notificationsList.filter((n) =>
    n.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unread]}
      onPress={() => handleNotificationPress(item.id)}
      accessibilityLabel={`Notification: ${item.title}`}
    >
      <Feather name="bell" size={24} color="black" style={styles.icon} />
      <View style={styles.notificationContent}>
        <Text style={[styles.title, !item.isRead && styles.unreadTitle]}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop}>
        <StatusBar backgroundColor="#6c757d" barStyle="light-content" />
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityLabel="Go Back">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {isSearchVisible ? (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search Notifications..."
              autoFocus
              accessibilityLabel="Search Notifications"
            />
          ) : (
            <Text style={styles.topBarTitle}>Notifications</Text>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress} accessibilityLabel="Search Notifications">
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text>No notifications found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredNotifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;