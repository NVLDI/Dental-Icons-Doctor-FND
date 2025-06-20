// DeclineScreenStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  feed: { padding: 10 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyText: { fontSize: 18, color: '#888', textAlign: 'center' },
  header: { paddingVertical: 15, paddingHorizontal: 20 },
  post: { marginBottom: 15, backgroundColor: '#dcdcdc', borderRadius: 8, padding: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  detailsDateContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  clinicName: { fontWeight: 'bold', fontSize: 16 },
  details: { flex: 1 },
  footer: { flex: 1, marginRight: 10 },
  detailText: { fontSize: 14, marginBottom: 5 },
  bold: { fontWeight: 'bold' },
  modalBackdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalCard: { backgroundColor: '#ffffff', borderRadius: 10, padding: 20, width: '90%', maxHeight: '80%', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  closeButton: { padding: 10 },
  dateTimeBox: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, width: 60, alignItems: 'center', justifyContent: 'center' },
  dateTimeText: { fontSize: 16, fontWeight: 'bold' },
  dateTimeTextSmall: { fontSize: 10, fontWeight: 'normal' },
});

export default styles;