// ServiceScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity,
  Modal, Animated
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styles from './ServiceScreenStyle';
import AuthStorageManager from '../../secure/AuthStorageManager';
import {
  getCurrentUserLocation,
  fetchNearbyServices,
  acceptRequest,
  declineRequest
} from './ServiceScreenBND';

export default function ServiceScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [distance, setDistance] = useState(0);
  const [distanceAnim] = useState(new Animated.Value(1));
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await AuthStorageManager.getUserSession();
        const coords = await getCurrentUserLocation();
        setLocation(coords);
        setRegion({ ...region, latitude: coords.latitude, longitude: coords.longitude });
        const nearby = await fetchNearbyServices(session.idenNum, coords);
        setServices(nearby);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkerPress = (service) => {
    setSelectedService(service);
    setShowDetails(true);
    if (location) setDistance(service.distance);
  };

  const closeModal = () => setShowDetails(false);

  const handleAccept = async () => {
    try {
      const session = await AuthStorageManager.getUserSession();
      const success = await acceptRequest(selectedService, session.idenNum);
      if (success) {
        setServices(prev => prev.filter(s => s.request_no !== selectedService.request_no));
        closeModal();
      }
    } catch (err) {
      console.error('Accept error:', err);
    }
  };

  const handleDecline = async () => {
    try {
      const session = await AuthStorageManager.getUserSession();
      const success = await declineRequest(selectedService, session.idenNum);
      if (success) {
        setServices(prev => prev.filter(s => s.request_no !== selectedService.request_no));
        closeModal();
      }
    } catch (err) {
      console.error('Decline error:', err);
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(distanceAnim, { toValue: 1.1, friction: 1, tension: 300, useNativeDriver: true }),
        Animated.spring(distanceAnim, { toValue: 1, friction: 1, tension: 300, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return { month, day, time };
  };

  return !location ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6c757d" />
      <Text style={styles.loadingText}>Fetching location...</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.searchBoxContainer}>
        <View style={styles.searchInputWrapper}>
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                setRegion({ ...region, latitude: lat, longitude: lng });
                setMarkerPosition({ latitude: lat, longitude: lng });
                setSelectedPlace(data.description);
              }
            }}
            query={{ key: 'AIzaSyAzAhLh395oqG9ki8uB701k8DuqHB3J_Fw', language: 'en' }}
            styles={{ container: { width: '100%' }, textInput: styles.searchInput, listView: styles.searchListView }}
          />
        </View>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => {
          if (location) setRegion({ ...region, latitude: location.latitude, longitude: location.longitude });
        }}>
          <Ionicons name="locate" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {markerPosition && <Marker coordinate={markerPosition} pinColor="red" />}
        {services.map((service, idx) => (
          <Marker key={idx} coordinate={{ latitude: service.latitude, longitude: service.longitude }} pinColor="blue" onPress={() => handleMarkerPress(service)}>
            <Callout>
              <Text style={styles.clinicName}>{service.clinicName}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Modal visible={showDetails} animationType="fade" transparent onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.clinicName}>{selectedService?.clinicName}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.detailsBox}>
                <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {selectedService?.patientName}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Procedure:</Text> {selectedService?.procedure}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedService?.additionalInfo}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Equipment Needed:</Text> {selectedService?.equipment}</Text>
              </View>
              {selectedService?.appointmentTime && (() => {
                const { month, day, time } = formatDateTime(selectedService.appointmentTime);
                return (
                  <View style={styles.dateTimeBox}>
                    <Text style={styles.dateTimeTextSmall}>{month}</Text>
                    <Text style={styles.dateTimeText}>{day}</Text>
                    <Text style={styles.dateTimeTextSmall}>{time}</Text>
                  </View>
                );
              })()}
            </View>
            <Text style={styles.detailText}>
              <TouchableOpacity onPress={() => navigation.navigate('MedicalDetails')}>
                <Text style={styles.boldLink}>Medical History: {selectedService?.medicalHistory}</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.leftButtons}>
                <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                  <FontAwesome name="check" size={16} color="white" />
                  <Text style={styles.viewDetailsText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declinedButton} onPress={handleDecline}>
                  <FontAwesome name="times" size={16} color="white" />
                  <Text style={styles.viewDetailsText}>Decline</Text>
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.distanceContainer, { transform: [{ scale: distanceAnim }] }]}>
                <Text style={styles.distanceText}>{distance ? `${(distance / 1000).toFixed(2)} km` : 'Calculating...'}</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
