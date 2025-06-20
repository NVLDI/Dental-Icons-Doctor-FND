// DrawerContentFND.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Avatar, ActivityIndicator } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import useDrawerLogic from './DrawerContentBND';
import styles from './DrawerContentStyle';

const { height } = Dimensions.get('window');

export default function DrawerContent(props) {
  const {
    userName,
    userEmail,
    newsUpdates,
    loading,
    handleLogout
  } = useDrawerLogic(props);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer} scrollEnabled={false}>
      <View style={styles.profileCard}>
        <Avatar.Image size={90} source={{ uri: 'https://via.placeholder.com/90' }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Dashboard')}>
            <Ionicons name="home-outline" size={22} color="#495057" />
            <Text style={styles.actionText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Profile')}>
            <MaterialIcons name="person-outline" size={22} color="#495057" />
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Settings')}>
            <MaterialIcons name="settings" size={22} color="#495057" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={22} color="#dc3545" />
            <Text style={[styles.actionText, { color: '#dc3545' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.newsSection}>
        <Text style={styles.newsHeader}>Latest Dental News</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color="#495057" size="large" />
            <Text style={styles.loadingText}>Fetching Updates...</Text>
          </View>
        ) : (
          <ScrollView nestedScrollEnabled style={{ maxHeight: height }}>
            {newsUpdates.map((news, index) => (
              <TouchableOpacity key={index} style={styles.newsCard}>
                <Image
                  source={{ uri: news.urlToImage || 'https://via.placeholder.com/300x200' }}
                  style={styles.newsImage}
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{news.title}</Text>
                  <Text style={styles.newsDescription} numberOfLines={2}>{news.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </DrawerContentScrollView>
  );
}
