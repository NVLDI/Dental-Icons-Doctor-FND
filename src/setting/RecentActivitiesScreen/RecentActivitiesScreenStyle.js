// RecentActivitiesScreenStyle.js
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
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  activityText: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  activityDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginVertical: 5,
  },
  activityTime: {
    fontSize: 12,
    color: '#868e96',
  },
});

export default styles;
