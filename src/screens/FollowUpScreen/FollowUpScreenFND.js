// FollowUpScreenFND.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, ScrollView, RefreshControl, Platform, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './FollowUpScreenStyle';
import { fetchFollowUpsData, callUser, chatWithUser } from './FollowUpScreenBND';

const FollowUpScreen = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Cloading, setCLoading] = useState(null);
  const [Mloading, setMLoading] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [combinedDateTime, setCombinedDateTime] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await fetchFollowUpsData();
    if (error) setError(error);
    else setFollowUps(data);
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshLoading(true);
    fetchData();
    setTimeout(() => setRefreshLoading(false), 2000);
  };

  const handleButtonPress = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const formattedTime = selectedTime.toLocaleTimeString('en-GB', { hour12: false });
      setCombinedDateTime(`${formattedDate} ${formattedTime}`);
    }
    setCalendarModalVisible(false);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return { month, day, time };
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleReschedule = (item) => {
    setSelectedItem(item);
    setCalendarModalVisible(true);
  };

  const actionFollowUps = (item) => console.log("Action for:", item);

  const rescheduleactionFollowUps = (item) => {
    const updated = { ...item, followup_appointment_date_time: combinedDateTime };
    console.log("Rescheduled:", updated);
    setSelectedItem(null);
  };

  const handleViewDetails = (item) => console.log("Viewing details for:", item);

  useEffect(() => {
    if (!calendarModalVisible && selectedItem) rescheduleactionFollowUps(selectedItem);
  }, [calendarModalVisible]);

  const formatText = (text) => text?.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') || 'N/A';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.feed} refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}>
        {followUps.length === 0 ? (
          <View style={styles.emptyState}><Text style={styles.emptyText}>No Follow-Ups available</Text></View>
        ) : (
          followUps.map((item) => {
            const { month, day, time } = formatDateTime(item.followup_appointment_date_time);
            return (
              <TouchableOpacity key={item.id} style={styles.post} onPress={() => openModal(item)}>
                <View style={styles.header}><Text style={styles.clinicName}>{formatText(item.clinic_name)}</Text></View>
                <View style={styles.detailsDateContainer}>
                  <View style={styles.details}>
                    <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {formatText(item.patient_name)}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {item.procedure_plan.replace(/[{}"]+/g, '')}</Text>
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
                    <TouchableOpacity style={styles.acceptButton} onPress={() => actionFollowUps(item)}>
                      <FontAwesome name="check" size={16} color="white" /><Text style={styles.viewDetailsText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rescheduleButton} onPress={() => handleReschedule(item)}>
                      <FontAwesome name="calendar" size={16} color="white" /><Text style={styles.viewDetailsText}>Re-Schedule</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => callUser(item, setCLoading)} disabled={Cloading === item.id}>
                      {Cloading === item.id ? <ActivityIndicator size="small" color="#28a745" /> : <FontAwesome name="phone" size={24} color="#28a745" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => chatWithUser(item, setMLoading)} disabled={Mloading === item.id}>
                      {Mloading === item.id ? <ActivityIndicator size="small" color="#007bff" /> : <MaterialIcons name="chat" size={24} color="#007bff" />}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      {/* Modal and Calendar modal implementations continue... */}
       <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}>
      <View style={styles.modalBackdrop}>
      <View style={styles.modalCard}>
      <View style={styles.modalHeader}>
      <Text style={styles.clinicName}>{selectedItem?.clinic_name? selectedItem?.clinic_name
                  .split(' ') // Split the string into an array of words
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
                  .join(' ') // Join the words back into a single string
                  : 'N/A'}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal} accessible={true} accessibilityLabel="Close">
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Split modal content into details and datetime */}
      <View style={styles.modalContent}>
        <View style={styles.detailsBox}>
        <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {selectedItem?.patient_name ? selectedItem?.patient_name
                .split(' ') // Split the string into an array of words
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
                .join(' ') // Join the words back into a single string
                : 'N/A'}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text> {selectedItem?.procedure_plan.replace(/[{}"]/g, '')}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Additional Procedure:</Text> {selectedItem?.additional_procedure}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Equipment:</Text> {selectedItem?.equipment}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Medical History:</Text> {selectedItem?.medical_history}</Text>
              <Text style={styles.detailText}><Text style={styles.bold}>Review:</Text> {selectedItem?.review}</Text>
        </View>
        
        {/* Date and Time Box inside Modal */}
        {selectedItem?.followup_appointment_date_time && (
            <View style={styles.dateTimeBox}>
                {
                  // Format the date and time for the modal
                  (() => {
                    const { month, day, time } = formatDateTime(selectedItem.followup_appointment_date_time);
                    return (
                      <>
                      <Text style={styles.dateTimeTextSmall}>{month}</Text>
                      <Text style={styles.dateTimeText}>{day}</Text>
                      <Text style={styles.dateTimeTextSmall}>{time}</Text>
                    </>
                    );
                  })()
                }
              </View>
            )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftButtons}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => handleViewDetails(selectedItem)} accessible={true} accessibilityLabel="Accept details">
            <MaterialIcons name="check" size={16} color="white" style={{ marginRight: 2 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rescheduleButton} onPress={() => handleViewDetails(selectedItem)}>
            <FontAwesome name="calendar" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => callUser(selectedItem)}>
            <FontAwesome name="phone" size={24} color="#28a745" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => chatWithUser(selectedItem)}>
            <MaterialIcons name="chat" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  </Modal>
  {/*Calendar Model*/}
<Modal
  animationType="fade"
  transparent={true}
  visible={calendarModalVisible}
  onRequestClose={() => setCalendarModalVisible(false)}>
  <View style={styles.modalOverlay}>
    <View style={styles.calendarContainer}>
      {/* Header with close icon */}
      <View style={styles.modalHeader}>
        <Text style={styles.headerTitle}>Select Date & Time</Text>
        <TouchableOpacity onPress={() => setCalendarModalVisible(false)}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Calendar Picker */}
      <CalendarPicker
        width={Platform.OS === 'ios' ? 300 : Dimensions.get('window').width * 0.8}
        height={Platform.OS === 'ios' ? 300 : 400}
        previousTitle="←"
        nextTitle="→"
        onDateChange={onDateChange}
        customStyles={{
          controlButtonText: {
            fontSize: 30,
            color: '#007AFF',
            fontWeight: 'bold',
          },
          dayTextColor: '#333',
          selectedDayStyle: {
            backgroundColor: '#007AFF',
            borderRadius: 5,
          },
          selectedDayTextColor: 'white',
        }}
      />

      {/* Time Picker and Button in Same Row */}
      <View style={styles.timeButtonRow}>
        <View style={styles.timePickerContainer}>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={() => {setShowTimePicker(true); handleButtonPress();}}>
            <Text style={styles.confirmDetailsText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

export default FollowUpScreen;