// ProfileScreenStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    marginBottom: 12,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    top: 7,
    right: 0,
    backgroundColor: '#28a745',
    color: '#ffffff',
    fontSize: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  ProfileVerifiedBadge: {
    position: 'absolute',
    bottom: 0,
    top: 5,
    right: 0,
    backgroundColor: '#28a745',
    color: '#ffffff',
    fontSize: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333333',
  },
  role: {
    fontSize: 16,
    color: '#6c757d',
  },
  medicalId: {
    fontSize: 14,
    color: '#495057',
    marginTop: 8,
  },
  editButton: {
    marginTop: 12,
    borderColor: '#6c757d',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    marginVertical: 6,
  },
  label: {
    fontWeight: '600',
    color: '#343a40',
  },
  uploadButton: {
    backgroundColor: '#6c757d',
    marginTop: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  deleteButton: {
    borderColor: '#dc3545',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default styles;
