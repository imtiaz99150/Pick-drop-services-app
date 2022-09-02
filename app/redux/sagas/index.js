import {takeLatest} from 'redux-saga/effects';
import {
  REQUEST_LOGIN,
  REQUEST_SIGNUP,
  REQUEST_VERIFY_OTP,
} from '../actions/authActions';
import {loginSaga, signupSaga, verifyOtpSaga} from './authSaga';

export function* watcherSaga() {
  yield takeLatest(REQUEST_SIGNUP, signupSaga);
  yield takeLatest(REQUEST_LOGIN, loginSaga);
  yield takeLatest(REQUEST_VERIFY_OTP, verifyOtpSaga);
}
