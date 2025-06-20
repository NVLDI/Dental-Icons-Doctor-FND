// AboutScreenStyle.js
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
  content: {},
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 24,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    marginBottom: 14,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  link: {
    fontSize: 16,
    color: '#007aff',
    marginBottom: 8,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
});

export default styles;