import 'react-native-gesture-handler'; // Import at the very top
import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigator/Navigator/Navigation'; // Import your navigation setup
import * as SplashScreen from 'expo-splash-screen'; // Import Splash Screen API
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency'; // Import ATT
import * as Location from 'expo-location'; // Import Location API

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible initially

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Request App Tracking Transparency (ATT) permission
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          console.log('Tracking permission granted.');
        } else {
          console.log('Tracking permission denied.');
          // You can display an alert or message based on denial
        }

        // Request location permission
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        if (locationStatus === 'granted') {
          const userLocation = await Location.getCurrentPositionAsync({});
          setLocation(userLocation);
          console.log('Location permission granted:', userLocation);
        } else {
          console.log('Location permission denied.');
          // Handle location permission denial
        }

        // Preload assets, fonts, or data here if needed
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate resource loading
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen after preparation is done
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
