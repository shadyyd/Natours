import axios from 'axios';
import { showAlert } from './alerts';

// updateMyPassword , updateMe
// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = `/api/v1/users/${type === 'data' ? 'updateMe' : 'updateMyPassword'}`;
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully !`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
