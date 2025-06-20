// ClinicsScreenStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaTop: { backgroundColor: '#6c757d' },
  safeAreaContent: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    height: 45,
    backgroundColor: '#6c757d',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
  },
  backButton: { padding: 10 },
  topBarTitle: { fontSize: 20, color: '#fff', fontWeight: '600' },
  searchButton: { padding: 10 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  feed: { padding: 10 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: { fontSize: 18, color: '#888', textAlign: 'center' },
  header: { paddingVertical: 15, paddingHorizontal: 20 },
  post: {
    marginBottom: 15,
    backgroundColor: '#dcdcdc',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clinicName: { fontWeight: 'bold', fontSize: 16 },
  details: { flex: 1 },
  detailText: { fontSize: 14, marginBottom: 5 },
  bold: { fontWeight: 'bold' },
});

export default styles;