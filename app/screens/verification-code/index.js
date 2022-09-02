import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import ScreenBackground from '../../components/ScreenBackground';
import LogoHeader from '../../components/LogoHeader';
import {
  HEADER_STRINGS,
  BUTTON_STRINGS,
  VERIFICATION_STRINGS,
} from '../../constants/Strings';
import styles from './style';
import {Button} from '../../components/Button';
import OTPTextInput from '../../components/OTPTextInput';
import {SCREENS} from '../../constants/Screens';
import {resetRoute} from '../../Utils/NavigationUtils';
import {REQUEST_VERIFY_OTP} from '../../redux/actions/authActions';

class VerificationCode extends React.PureComponent {
  state = {
    otp: '',
  };

  getMaskedNumber = () => {
    const {route} = this.props;
    const phone = route?.params?.phoneNumber;
    const lastDigit = phone.slice(-2);
    return `${Array(phone.length - 2)
      .fill('*')
      .join('')}${lastDigit}`;
  };

  onVerifyOtp = () => {
    const {otp} = this.state;
    const {route, verifyOtp, navigation} = this.props;
    const phone = route?.params?.phoneNumber;
    const params = {
      otp: otp,
      phone: phone,
    };
    verifyOtp(params, res => {
      if (res) {
        resetRoute(navigation, SCREENS.CHOOSE_CURRENT_DROP_LOCATION);
      }
    });
  };

  render() {
    const {otp} = this.state;
    const phone = this.getMaskedNumber();
    const isDisabled = otp.length !== 6;
    return (
      <ScreenBackground>
        <LogoHeader rightButtonText={HEADER_STRINGS.RESEND} />
        <Text style={styles.titleText}>
          {VERIFICATION_STRINGS.VERIFICATION_CODE}
        </Text>
        <Text style={styles.messageText}>
          {VERIFICATION_STRINGS.VERIFICATION_CODE_MESSAGE} {phone}
        </Text>
        <OTPTextInput
          handleTextChange={t => this.setState({otp: t})}
          inputCount={6}
          keyboardType="number-pad"
          defaultValue={otp}
          cellTextLength={1}
        />
        <Button
          title={BUTTON_STRINGS.SUBMIT}
          isBold
          disabled={isDisabled}
          onPress={this.onVerifyOtp}
        />
      </ScreenBackground>
    );
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    verifyOtp: (params, callBack) =>
      dispatch({type: REQUEST_VERIFY_OTP, params, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode);
