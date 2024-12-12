// actions/someActions.js
import axios from "../api";
import { decryptData } from "../../utils/encryptDecrypt";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE } from "../action_types";
// Action Creators
export const fetchDistrictSuccess = (data) => ({
  type: DISTRICT_SUCCESS,
  payload: data,
});

export const fetchDistrictFailure = (error) => ({
  type: DISTRICT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onDistrict = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getDistricts`, {});
      let originalText = decryptData(response?.data?.data);
      console.log('originalText', originalText)
      dispatch(fetchDistrictSuccess(originalText));
    } catch (error) {
      dispatch(fetchDistrictFailure(error));
    }
  };
};
