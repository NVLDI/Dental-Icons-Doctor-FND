// SettingsScreenStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  segment1: {
    marginBottom: 20,
    marginTop: 8,
  },
  segment2: {
    marginBottom: 20,
  },
  segmentHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 19,
    marginBottom: 10,
    color: '#495057',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  icons: {
    marginLeft: 20,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#495057',
  },
  footer: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 12,
    color: '#adb5bd',
  },
});

export default styles;