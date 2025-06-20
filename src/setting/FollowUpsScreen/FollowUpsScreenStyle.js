// FollowUpsScreenBND.js
import axios from 'axios';
import AuthStorageManager from '../../secure/AuthStorageManager';

export const fetchFollowUpsData = async () => {
  try {
    const session = await AuthStorageManager.getUserSession();
    if (!session?.idenNum) {
      return { data: [], error: 'Invalid session or missing idenNum.' };
    }

    const response = await axios.get('https://dentalicons.in/api/DoctorFullFollowUp', {
      params: { doctor_no: session.idenNum },
    });

    const followUps = Array.isArray(response.data) ? response.data : [];
    return { data: followUps, error: null };
  } catch (err) {
    console.error('Error fetching follow-ups:', err);
    return { data: [], error: 'Failed to fetch follow-up data.' };
  }
}