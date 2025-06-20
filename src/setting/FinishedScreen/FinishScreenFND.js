// FinishScreenFND.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, Text, TouchableOpacity, View, TextInput,
  ScrollView, RefreshControl, Modal
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from './FinishScreenStyle';
import { fetchFinishData } from './FinishScreenBND';

const FinishScreen = ({ navigation }) => {
  const [finish, setFinish] = useState([]);
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
    const { data, error } = await fetchFinishData();
    if (error) setError(error);
    else setFinish(data);
    setLoading(false);
  };

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);

  const filteredData = finish.filter((item) =>
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
              placeholder="Search Finish..."
              autoFocus
            />
          ) : (
            <Text style={styles.topBarTitle}>Finish</Text>
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
              <Text style={styles.emptyText}>No Finish Service available</Text>
            </View>
          ) : (
            filteredData.map((item) => {
              const { month, day, time } = formatDateTime(item.finished_date_time);
              return (
                <TouchableOpacity key={item.id} style={styles.post} onPress={() => openModal(item)}>
                  <View style={styles.header}>
                    <Text style={styles.clinicName}>{formatName(item.clinic_name)}</Text>
                  </View>
                  <View style={styles.detailsDateContainer}>
                    <View style={styles.details}>
                      <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {formatName(item.patient_name)}</Text>
                      <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {item.procedure_plan.replace(/[{}"]+/g, '')}</Text>
                    </View>
                    <View style={styles.dateTimeBox}>
                      <Text style={styles.dateTimeTextSmall}>{month}</Text>
                      <Text style={styles.dateTimeText}>{day}</Text>
                      <Text style={styles.dateTimeTextSmall}>{time}</Text>
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
                  <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {selectedItem?.procedure_plan.replace(/[{}"]+/g, '')}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedItem?.additional_procedure}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Equipment:</Text> {selectedItem?.equipment}</Text>
                  <Text style={styles.detailText}><Text style={styles.bold}>Medical History:</Text> {selectedItem?.medical_history}</Text>
                </View>
                {selectedItem?.finished_date_time && (() => {
                  const { month, day, time } = formatDateTime(selectedItem.finished_date_time);
                  return (
                    <View style={styles.dateTimeBox}>
                      <Text style={styles.dateTimeTextSmall}>{month}</Text>
                      <Text style={styles.dateTimeText}>{day}</Text>
                      <Text style={styles.dateTimeTextSmall}>{time}</Text>
                    </View>
                  );
                })()}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default FinishScreen;
