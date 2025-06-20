// HomeScreenFND.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import useHomeScreenLogic from './HomeScreenBND';
import styles from './HomeScreenStyle';

export default function HomeScreen({ navigation }) {
  const {
    count,
    todayTask,
    upcomingTask,
    followUpsTask,
    refreshLoading,
    handleRefresh,
    modalVisible,
    modalTaskVisible,
    modalUpcomingVisible,
    selectedItem,
    openModal,
    closeModal,
    openTaskModel,
    closeTaskModal,
    openUpcomingTaskModel,
    closeUpcomingTaskModal,
    renderFollowUpCard,
    renderTaskCard,
    renderUpcomingTaskCard,
    formatDateTime,
    handleAccepted,
    handleDirection,
    handleReschedule,
    callUser,
    chatWithUser,
  } = useHomeScreenLogic({ navigation });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.grid}>
          {count.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                { backgroundColor: item.name === 'Accepted' ? '#fcec5d' : '#6fe374' },
              ]}
              onPress={() => {
                if (item.name === 'Finished') {
                  navigation.navigate('FinishedService');
                } else if (item.name === 'Accepted') {
                  navigation.navigate('Accepted');
                }
              }}
            >
              <Icon name={item.icon} size={30} color="#333" />
              <Text style={styles.cardCount}>{item.count}</Text>
              <Text style={styles.cardName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Follow-Ups */}
        <SectionList
          title="Follow-Ups"
          subtitle="Showing follow-ups for the next 7 days"
          items={followUpsTask}
          renderItem={renderFollowUpCard}
          emptyText="No follow-ups available"
        />

        {/* Today's Task */}
        <SectionList
          title="Today's Task"
          items={todayTask}
          renderItem={renderTaskCard}
          emptyText="No Task Today"
        />

        {/* Upcoming Task */}
        <SectionList
          title="Upcoming Task"
          subtitle="Showing Upcoming Task for the next 7 days"
          items={upcomingTask}
          renderItem={renderUpcomingTaskCard}
          emptyText="No Upcoming Task"
        />
      </ScrollView>

      {/* Modals */}
      <FollowUpModal
        visible={modalVisible}
        item={selectedItem}
        onClose={closeModal}
        formatDateTime={formatDateTime}
        handleAccepted={handleAccepted}
        handleReschedule={handleReschedule}
        callUser={callUser}
        chatWithUser={chatWithUser}
      />

      <TodayTaskModal
        visible={modalTaskVisible}
        item={selectedItem}
        onClose={closeTaskModal}
        formatDateTime={formatDateTime}
        handleDirection={handleDirection}
        callUser={callUser}
        chatWithUser={chatWithUser}
      />

      <UpcomingTaskModal
        visible={modalUpcomingVisible}
        item={selectedItem}
        onClose={closeUpcomingTaskModal}
        formatDateTime={formatDateTime}
        handleReschedule={handleReschedule}
        callUser={callUser}
        chatWithUser={chatWithUser}
      />
    </SafeAreaView>
  );
}

// Placeholder component structure for reusables like SectionList, FollowUpModal, etc.
// These should be created in separate components folder as reusable UI components.
