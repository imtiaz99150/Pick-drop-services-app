import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import ScreenBackground from '../../components/ScreenBackground';
import LogoHeader from '../../components/LogoHeader';
import {
  HEADER_STRINGS,
  LOGIN_STRINGS,
  BUTTON_STRINGS,
} from '../../constants/Strings';
import styles from './style';
import Input from '../../components/TextInput';
import {Button} from '../../components/Button';
import {SCREENS} from '../../constants/Screens';
import {REQUEST_LOGIN} from '../../redux/actions/authActions';

class Login extends React.PureComponent {
  state = {
    phoneNumber: '',
  };

  isDisabled = () => {
    const {phoneNumber} = this.state;
    return phoneNumber.trim().length === 0;
  };

  onLogin = () => {
    const {navigation, login} = this.props;
    const {phoneNumber} = this.state;
    // const params = {
    //   phone: phoneNumber,
    // };
    // login(params, res => {
      // if (res) {
        navigation.navigate(SCREENS.VERIFICATION_CODE, {phoneNumber});
    //   }
    // });
  };

  render() {
    const {navigation} = this.props;
    const {phoneNumber} = this.state;
    const isDisabled = this.isDisabled();
    return (
      <ScreenBackground>
        <LogoHeader
          rightButtonText={HEADER_STRINGS.SIGN_UP}
          onPress={() => navigation.navigate(SCREENS.REGISTER)}
        />
        <Text style={styles.titleText}>{LOGIN_STRINGS.SIGN_IN}</Text>
        <Text style={styles.messageText}>{LOGIN_STRINGS.SIGN_IN_MESSAGE}</Text>
        <Input
          title={LOGIN_STRINGS.PHONE_NO}
          keyboardType={'phone-pad'}
          wrapperStyle={styles.textInput}
          value={phoneNumber}
          onChangeText={t => this.setState({phoneNumber: t})}
        />
        <Button
          title={BUTTON_STRINGS.SIGN_IN}
          isBold
          disabled={isDisabled}
          onPress={this.onLogin}
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
    login: (params, callBack) =>
      dispatch({type: REQUEST_LOGIN, params, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
