// PrivacyScreenStyle.js
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
  contentContainer: {
    padding: 15,
  },
  settingsSection: {
    marginVertical: 15,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;
