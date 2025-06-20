// NotificationScreenStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaTop: {
    backgroundColor: '#6c757d',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    height: 45,
    backgroundColor: '#6c757d',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
    position: 'relative',
  },
  backButton: {
    padding: 10,
  },
  topBarTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  searchButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    alignItems: 'center',
  },
  unread: {
    backgroundColor: '#e7f3ff',
  },
  icon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  unreadTitle: {
    color: '#007aff',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default styles;
