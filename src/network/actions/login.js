// actions/someActions.js
import axios from "../api";
import CryptoJS from 'crypto-js';
import { encryptDataPost, decryptData } from '../../utils/encryptDecrypt'

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../action_types";
// Action Creators
export const fetchLoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const fetchLoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});



// Async Action to Fetch Data
export const onLogin = (username, password) => {

  const encrypted = CryptoJS.AES.encrypt(password, 'a1b2c3d4e5f67890a1b2c3d4e5f67890');
  const encryptedString = encrypted.toString();


  return async (dispatch) => {


    try {

      const response = await axios.post(
        "/signIn",
                encryptDataPost(JSON.stringify({
                  username: username,
                  password: password,
                }))

      );
      let originalText = decryptData(response?.data?.data);

      dispatch(fetchLoginSuccess(originalText));
    } catch (error) {
      dispatch(fetchLoginFailure(error));
    }
  };
};
