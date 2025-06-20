// ClinicsScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, View, TextInput,
  ScrollView, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ClinicsScreenStyle';
import { fetchClinicsData } from './ClinicsScreenBND';

const ClinicsScreen = ({ navigation }) => {
  const [clinic, setClinic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setRefreshLoading(true);
    fetchData();
    setTimeout(() => setRefreshLoading(false), 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await fetchClinicsData();
    if (error) setError(error);
    else setClinic(data);
    setLoading(false);
  };

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);

  const filteredData = clinic.filter((item) =>
    (item.clinic_name && item.clinic_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              placeholder="Search Clinics..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>Clinic</Text>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.safeAreaContent}>
        <ScrollView
          contentContainerStyle={styles.feed}
          refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}
        >
          {filteredData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No Clinic available</Text>
            </View>
          ) : (
            filteredData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.post}
                onPress={() => {}}
              >
                <View style={styles.header}>
                  <Text style={styles.clinicName}>{formatName(item.clinic_name)}</Text>
                </View>
                <View style={styles.detailsDateContainer}>
                  <View style={styles.details}>
                    <Text style={styles.detailText}><Text style={styles.bold}>Admin Name:</Text> {formatName(item.admin_name)}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Email:</Text> {item.email}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Phone Number:</Text> {item.phone_number}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const formatName = (text) => text?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') || 'N/A';

export default ClinicsScreen;