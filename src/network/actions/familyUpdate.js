// actions/someActions.js
import axios from "../api";

import { UPDATE_FAMILY_SUCCESS, UPDATE_FAMILY_FALIURE } from "../action_types";
// Action Creators
export const fetchUpdateFamilySuccess = (data) => ({
  type: UPDATE_FAMILY_SUCCESS,
  payload: data,
});

export const fetchUpdateFamilyFailure = (error) => ({
  type: UPDATE_FAMILY_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onFamilyUpdate = (familyObject) => {
  return async (dispatch) => {
    try {
      console.log("familyObject==Sending to Service", familyObject);
      const response = await axios.post(
        "/familyUpdate",
        JSON.stringify(familyObject)
      );
      console.log("response.data", response.data);
      dispatch(fetchUpdateFamilySuccess(response.data));
    } catch (error) {
      dispatch(fetchUpdateFamilyFailure(error));
    }
  };
};
