import {VERIFY_OTP_SUCCESSFUL} from '../actions/authActions';
import {CLEAR_STATE} from '../actions/commonActions';

const initialState = {
  expireTime: '',
  authData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_SUCCESSFUL:
      const {expireTime} = action;
      return {
        ...state,
        authData: action.data,
        expireTime,
      };

    case CLEAR_STATE: {
      return initialState;
    }

    default:
      return state;
  }
};

export default authReducer;
