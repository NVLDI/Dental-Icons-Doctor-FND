// DrawerContentStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    borderRadius: 10,
    margin: 10,
    elevation: 2,
  },
  avatar: {
    marginBottom: 10,
  },
  userDetails: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
  },
  userEmail: {
    fontSize: 14,
    color: '#868e96',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#495057',
    marginTop: 5,
  },
  newsSection: {
    marginTop: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  newsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  newsImage: {
    width: 100,
    height: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  newsContent: {
    flex: 1,
    padding: 10,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
  },
  newsDescription: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 10,
  },
});

export default styles;
