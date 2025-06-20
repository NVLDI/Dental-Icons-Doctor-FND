import React from 'react';
import { SafeAreaView, ScrollView, RefreshControl, View, Text, TouchableOpacity, Modal, Platform, Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import useAcceptedScreenLogic from './AcceptedScreenBND';
import styles from './AcceptedScreenStyle';

const AcceptedScreen = () => {
  const {
    accept,
    refreshLoading,
    handleRefresh,
    formatDateTime,
    openModal,
    closeModal,
    handleFinish,
    handleFollowUps,
    modalVisible,
    calendarModalVisible,
    ratingModalVisible,
    selectedItem,
    selectedItemForRating,
    rating,
    setRating,
    submitFeedback,
    selectedTime,
    setCalendarModalVisible,
    onDateChange,
    onTimeChange,
    handleButtonPress,
  } = useAcceptedScreenLogic();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.feed} refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={handleRefresh} />}>
        {accept.length === 0 ? (
          <View style={styles.emptyState}><Text style={styles.emptyText}>No Accepted Service available</Text></View>
        ) : (
          accept.map((item) => {
            const { year, month, day, time } = formatDateTime(item.appointment_date_time);
            return (
              <TouchableOpacity key={item.id} style={styles.post} onPress={() => openModal(item)}>
                <View style={styles.header}><Text style={styles.clinicName}>{item.clinic_name}</Text></View>
                <View style={styles.detailsDateContainer}>
                  <View style={styles.details}>
                    <Text style={styles.detailText}><Text style={styles.bold}>Patient Name:</Text> {item.patient_name}</Text>
                    <Text style={styles.detailText}><Text style={styles.bold}>Procedure Done:</Text>{item.procedure_plan}</Text>
                  </View>
                  <View style={styles.dateTimeBox}>
                    <Text style={styles.dateTimeTextSmall}>{month}</Text>
                    <Text style={styles.dateTimeText}>{day}</Text>
                    <Text style={styles.dateTimeTextSmall}>{time}</Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.leftButtons}>
                    <TouchableOpacity style={styles.finishButton} onPress={() => handleFinish(item)}>
                      <FontAwesome name="check-circle" size={16} color="white" style={{ marginRight: 2 }} />
                      <Text style={styles.viewDetailsText}>Finished</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.followUpButton} onPress={() => handleFollowUps(item)}>
                      <Text style={styles.viewDetailsText}>Follow-Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Modals */}
      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
        {/* ...existing modal UI for details */}
      </Modal>

      <Modal animationType="fade" transparent={true} visible={calendarModalVisible} onRequestClose={() => setCalendarModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.headerTitle}>Select Date & Time</Text>
              <TouchableOpacity onPress={() => setCalendarModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <CalendarPicker
              width={Platform.OS === 'ios' ? 300 : Dimensions.get('window').width * 0.8}
              height={Platform.OS === 'ios' ? 300 : 400}
              onDateChange={onDateChange}
            />
            <View style={styles.timeButtonRow}>
              <View style={styles.timePickerContainer}>
                <DateTimePicker value={selectedTime} mode="time" is24Hour={true} display="default" onChange={onTimeChange} />
              </View>
              <TouchableOpacity style={styles.confirmButton} onPress={handleButtonPress}>
                <Text style={styles.confirmDetailsText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={ratingModalVisible} transparent={true} animationType="fade" onRequestClose={() => setRatingModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent_1}>
            <Text style={styles.title}>Rate the Doctor</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starButton}>
                  <Text style={[styles.star, rating >= star && styles.selectedStar]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AcceptedScreen;
