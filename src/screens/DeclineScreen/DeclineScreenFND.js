import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './DeclineScreenStyle';
import { fetchDeclineData } from './DeclineScreenBND';

const DeclineScreen = () => {
  const [decline, setDecline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
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
    const { data, error } = await fetchDeclineData();
    if (error) setError(error);
    else setDecline(data);
    setLoading(false);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      year: date.getFullYear(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.feed}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}>
        {decline.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No Decline Service available</Text>
          </View>
        ) : (
          decline.map((item) => {
            const { month, day, time } = formatDateTime(item.declined_date_time);
            return (
              <TouchableOpacity key={item.id} style={styles.post} onPress={() => openModal(item)}>
                <View style={styles.header}>
                  <Text style={styles.clinicName}>{formatText(item.clinic_name)}</Text>
                </View>
                <View style={styles.detailsDateContainer}>
                  <View style={styles.details}>
                    <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {formatText(item.patient_name)}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text>{item.procedure_plan.replace(/[{}"]/g, '')}</Text>
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
              <Text style={styles.clinicName}>{formatText(selectedItem?.clinic_name)}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.footer}>
                <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {formatText(selectedItem?.patient_name)}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {selectedItem?.procedure_plan.replace(/[{}"]/g, '')}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedItem?.additional_procedure}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Equipment:</Text> {selectedItem?.equipment}</Text>
                <Text style={styles.detailText}><Text style={styles.bold}>Medical History:</Text> {selectedItem?.medical_history}</Text>
              </View>
              {selectedItem?.declined_date_time && (() => {
                const { month, day, time } = formatDateTime(selectedItem.declined_date_time);
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

const formatText = (text) => text?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') || 'N/A';

export default DeclineScreen;