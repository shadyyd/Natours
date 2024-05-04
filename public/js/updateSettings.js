import axios from 'axios';
import { showAlert } from './alerts';

// updateMyPassword , updateMe
// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/users/${type === 'data' ? 'updateMe' : 'updateMyPassword'}`;
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully !`);
      //   window.setTimeout(() => {
      // location.assign('/me');
      //   }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
