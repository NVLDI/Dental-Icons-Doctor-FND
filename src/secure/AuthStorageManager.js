import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

class AuthStorageManagerClass {
  // Save user session data
  async saveUserSession(userData) {
    try {
      // Store individual pieces of user data
      await Promise.all([
        SecureStore.setItemAsync('userType', String(userData.userType)),
        SecureStore.setItemAsync('userId', String(userData.userId) || ''),
        SecureStore.setItemAsync('userName', String(userData.userName)),
        SecureStore.setItemAsync('email', String(userData.email)),
        SecureStore.setItemAsync('idenNum', /^[A-Za-z]-\d+$/.test(userData.idenNum) ? String(userData.idenNum) : ''),
        SecureStore.setItemAsync('isLoggedIn', 'true')
      ]);

      // Set up axios defaults for authenticated requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.userId}`;
    } catch (error) {
      console.error('Error saving user session:', error);
      throw error;
    }
  }

  // Retrieve user session data
  async getUserSession() {
    try {
      const userType = await SecureStore.getItemAsync('userType');
      const userId = await SecureStore.getItemAsync('userId');
      const userName = await SecureStore.getItemAsync('userName');
      const idenNum = await SecureStore.getItemAsync('idenNum');
      const email = await SecureStore.getItemAsync('email');
      const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');

      return {
        userType,
        userId: userId ? Number(userId) : null, // Convert back to number if needed
        userName,
        idenNum: idenNum || '', // Return idenNum as a string (e.g., "A-12345")
        email,
        isLoggedIn
      };
    } catch (error) {
      console.error('Error retrieving user session:', error);
      return null;
    }
  }

  // Check if user is logged in
  async isLoggedIn() {
    try {
      const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
      return isLoggedIn === 'true';
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  // Logout and clear session
  async logout() {
    try {
      // Remove all stored user data
      await Promise.all([
        SecureStore.deleteItemAsync('userType'),
        SecureStore.deleteItemAsync('userId'),
        SecureStore.deleteItemAsync('userName'),
        SecureStore.deleteItemAsync('idenNum'),
        SecureStore.deleteItemAsync('email'),
        SecureStore.deleteItemAsync('isLoggedIn'),
        SecureStore.deleteItemAsync('userSession')
      ]);

      // Clear axios authorization header
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  // Secure token management
  async setAuthToken(token) {
    try {
      await SecureStore.setItemAsync('authToken', token);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  }

  async getAuthToken() {
    try {
      return await SecureStore.getItemAsync('authToken');
    } catch (error) {
      console.error('Error retrieving auth token:', error);
      return null;
    }
  }
}

// Create a singleton instance
const AuthStorageManager = new AuthStorageManagerClass();
export default AuthStorageManager;