import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, Modal, StatusBar, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from './TodaysTaskScreenStyle';

const feedData = [];

const TodaysTaskScreen = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchPress = () => setSearchVisible(!isSearchVisible);
  const handleSearchChange = (text) => setSearchQuery(text);
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  const filteredData = feedData.filter((item) =>
    item.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.procedureDone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return { month, day, time: `${hours}:${minutes < 10 ? '0' : ''}${minutes}` };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6c757d" />
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
          <Text style={styles.topBarTitle}>Today's Task</Text>
        )}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.feed}>
        {filteredData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No Task Today</Text>
          </View>
        ) : (
          filteredData.map((item) => {
            const { month, day, time } = formatDateTime(item.dateTime);
            return (
              <TouchableOpacity key={item.id} style={styles.post} onPress={() => openModal(item)}>
                <View style={styles.header}>
                  <Text style={styles.clinicName}>{item.clinicName}</Text>
                </View>
                <View style={styles.detailsDateContainer}>
                  <View style={styles.details}>
                    <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {item.patientName}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {item.procedureDone}</Text>
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

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.clinicName}>{selectedItem?.clinicName}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.footer}>
                <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {selectedItem?.patientName}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {selectedItem?.procedureDone}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedItem?.review}</Text>
              </View>
              {selectedItem?.dateTime && (() => {
                const { month, day, time } = formatDateTime(selectedItem.dateTime);
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
  );
};

export default TodaysTaskScreen;
