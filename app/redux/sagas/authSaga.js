import {call, put} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {login, signup, verifyOtp} from '../../Api';
import {VERIFY_OTP_SUCCESSFUL} from '../actions/authActions';

export function* signupSaga(action) {
  try {
    const res = yield call(signup, action.params);
    const data = res.data;
    if (res.status === 200) {
      action.callBack(data);
    } else {
      Toast.show(data, Toast.LONG);
      action.callBack();
    }
  } catch (error) {
    Toast.show(error.message, Toast.LONG);
    action.callBack();
  }
}

export function* loginSaga(action) {
  try {
    const res = yield call(login, action.params);
    const data = res.data;
    if (res.status === 200) {
      action.callBack(data);
    } else {
      Toast.show(data, Toast.LONG);
      action.callBack();
    }
  } catch (error) {
    Toast.show(error.message, Toast.LONG);
    action.callBack();
  }
}

export function* verifyOtpSaga(action) {
  try {
    const res = yield call(verifyOtp, action.params);
    const status = res.status;
    var data = res.data;
    if (status === 200) {
      yield put({
        type: VERIFY_OTP_SUCCESSFUL,
        data,
        expireTime: data.expiresIn,
      });
      action.callBack(data);
    } else {
      Toast.show(data, Toast.LONG);
      action.callBack();
    }
  } catch (error) {
    Toast.show(error.message, Toast.LONG);
    action.callBack();
  }
}
