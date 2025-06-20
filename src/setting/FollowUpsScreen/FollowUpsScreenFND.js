// FollowUpsScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, View, TextInput,
  ScrollView, RefreshControl, Modal
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styles from './FollowUpsScreenStyle';
import { fetchFollowUpsData } from './FollowUpsScreenBND';

const FollowUpsScreen = ({ navigation }) => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRefresh = () => {
    setRefreshLoading(true);
    fetchData();
    setTimeout(() => setRefreshLoading(false), 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await fetchFollowUpsData();
    if (error) setError(error);
    else setFollowUps(data);
    setLoading(false);
  };

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);

  const filteredData = followUps.filter((item) =>
    (item.clinic_name && item.clinic_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.patient_name && item.patient_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.procedure_plan && item.procedure_plan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return { month, day, time };
  };

  const formatName = (text) => text?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') || 'N/A';

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
              placeholder="Search Follow-Ups..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>Follow-Ups</Text>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.feed} refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}>
          {filteredData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No Follow-Ups available</Text>
            </View>
          ) : (
            filteredData.map((item) => {
              const { month, day, time } = formatDateTime(item.followup_appointment_date_time);
              return (
                <TouchableOpacity key={item.id} style={styles.post} onPress={() => openModal(item)}>
                  <View style={styles.header}>
                    <Text style={styles.clinicName}>{formatName(item.clinic_name)}</Text>
                  </View>
                  <View style={styles.detailsDateContainer}>
                    <View style={styles.details}>
                      <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {formatName(item.patient_name)}</Text>
                      <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {item.procedure_plan.replace(/[{}"]/g, '')}</Text>
                      <Text style={styles.detailText}><Text style={styles.bold}>Review:</Text> {item.review}</Text>
                      <Text style={styles.timestamp}>{item.review_date_time}</Text>
                    </View>
                    <View style={styles.dateTimeBox}>
                      <Text style={styles.dateTimeTextSmall}>{month}</Text>
                      <Text style={styles.dateTimeText}>{day}</Text>
                      <Text style={styles.dateTimeTextSmall}>{time}</Text>
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <View style={styles.leftButtons}>
                      <TouchableOpacity style={styles.acceptButton}>
                        <FontAwesome name="check" size={16} color="white" style={{ marginRight: 2 }} />
                        <Text style={styles.viewDetailsText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rescheduleButton}>
                        <FontAwesome name="calendar" size={16} color="white" />
                        <Text style={styles.viewDetailsText}>Re-Schedule</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.rightIcons}>
                      <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="phone" size={24} color="#28a745" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="chat" size={24} color="#007bff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={closeModal}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.clinicName}>{formatName(selectedItem?.clinic_name)}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalContent}>
                <View style={styles.detailsBox}>
                  <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {formatName(selectedItem?.patient_name)}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {selectedItem?.procedure_plan.replace(/[{}"]/g, '')}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedItem?.additional_procedure}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Equipment:</Text> {selectedItem?.equipment}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Medical History:</Text> {selectedItem?.medical_history}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Review:</Text> {selectedItem?.review}</Text>
                </View>
                {selectedItem?.followup_appointment_date_time && (() => {
                  const { month, day, time } = formatDateTime(selectedItem.followup_appointment_date_time);
                  return (
                    <View style={styles.dateTimeBox}>
                      <Text style={styles.dateTimeTextSmall}>{month}</Text>
                      <Text style={styles.dateTimeText}>{day}</Text>
                      <Text style={styles.dateTimeTextSmall}>{time}</Text>
                    </View>
                  );
                })()}
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.leftButtons}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <FontAwesome name="check" size={16} color="white" style={{ marginRight: 2 }} />
                    <Text style={styles.viewDetailsText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default FollowUpsScreen;
