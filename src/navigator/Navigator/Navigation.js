// Navigation.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import styles from './NavigationStyle';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FollowUpsScreen from '../screens/FollowUpsScreen';
import ServiceScreen from '../screens/ServiceScreen';
import AcceptedScreen from '../screens/AcceptedScreen';
import HomeDeclineScreen from '../screens/DeclineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingScreen';

// Sub Screens
import ClinicsScreen from '../screens/Settings/ClinicsScreen';
import FollowUpScreen from '../screens/Settings/FollowUpsScreen';
import FinishScreen from '../screens/Settings/FinishScreen';
import DeclineScreen from '../screens/Settings/DeclineScreen';
import RecentActivities from '../screens/Settings/RecentActivitiesScreen';
import AcceptedSettingScreen from '../screens/Settings/AcceptedScreen';
import Notification from '../screens/Settings/NotificationScreen';
import PrivacySetting from '../screens/Settings/PrivacyScreen';
import AboutApp from '../screens/Settings/AboutScreen';
import TodaysTaskScreen from '../screens/Settings/TodaysTaskScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor="#6c757d" />
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: { backgroundColor: '#f4f4f4' },
          drawerActiveTintColor: '#6c757d',
          drawerInactiveTintColor: '#333',
          headerStyle: { backgroundColor: '#6c757d' },
          headerTintColor: '#ffffff',
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Ionicons name="notifications-outline" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={BottomTabs}
          options={{
            headerTitle: () => (
              <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Dental Icons Doctor</Text>
            ),
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} /> }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} /> }} />
      </Drawer.Navigator>
    </>
  );
};

const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Service"
    screenOptions={{
      tabBarStyle: { backgroundColor: '#6c757d', borderTopWidth: 0 },
      tabBarActiveTintColor: '#333333',
      tabBarInactiveTintColor: 'white',
      tabBarShowLabel: true,
      tabBarHideOnKeyboard: true,
      headerShown: false,
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />, tabBarLabel: 'Dashboard' }} />
    <Tab.Screen name="Follow-ups" component={FollowUpsScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-check-outline" size={size} color={color} />, tabBarLabel: 'Follow-Ups' }} />
    <Tab.Screen name="Service" component={ServiceScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="clipboard-outline" size={size} color={color} />, tabBarLabel: 'Service' }} />
    <Tab.Screen name="Accepted" component={AcceptedScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-circle-outline" size={size} color={color} />, tabBarLabel: 'Accepted' }} />
    <Tab.Screen name="Declined" component={HomeDeclineScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="close-circle-outline" size={size} color={color} />, tabBarLabel: 'Declined' }} />
  </Tab.Navigator>
);

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);
  const navigation = useNavigation();

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleSignUpSuccess = () => setSignedIn(true);

  useEffect(() => {
    if (isLoggedIn || isSignedIn) {
      navigation.reset({ index: 0, routes: [{ name: 'Drawer' }] });
    }
  }, [isLoggedIn, isSignedIn, navigation]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!(isLoggedIn || isSignedIn) ? (
        <>
          <Stack.Screen name="Login">{(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}</Stack.Screen>
          <Stack.Screen name="Signup">{(props) => <SignupScreen {...props} onSignUpSuccess={handleSignUpSuccess} />}</Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Drawer" component={DrawerNavigation} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingScreen" component={SettingsScreen} />
          <Stack.Screen name="Clinics" component={ClinicsScreen} />
          <Stack.Screen name="FollowUps" component={FollowUpScreen} />
          <Stack.Screen name="FinishedService" component={FinishScreen} />
          <Stack.Screen name="TodaysTaskScreen" component={TodaysTaskScreen} />
          <Stack.Screen name="AcceptedSettingScreen" component={AcceptedSettingScreen} />
          <Stack.Screen name="DeclinedSerivce" component={DeclineScreen} />
          <Stack.Screen name="RecentActivities" component={RecentActivities} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="PrivacySetting" component={PrivacySetting} />
          <Stack.Screen name="AboutApp" component={AboutApp} />
          <Stack.Screen name="MedicalDetails" component={AboutApp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
