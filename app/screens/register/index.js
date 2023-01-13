import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScreenBackground from '../../components/ScreenBackground';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/TextInput';
import {REGISTER_STRINGS, BUTTON_STRINGS} from '../../constants/Strings';
import styles from './style';
import COMMON_STYLES from '../../themes/Styles';
import Dropdown from '../../components/Dropdown';
import {SVG} from '../../constants/Svg';
import {Button} from '../../components/Button';
import {resetRoute} from '../../Utils/NavigationUtils';
import {SCREENS} from '../../constants/Screens';
import {REQUEST_SIGNUP} from '../../redux/actions/authActions';

class Register extends React.PureComponent {
  state = {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    emailId: '',
  };

  isDisabled = () => {
    const {phoneNumber, firstName, lastName, emailId} = this.state;
    return (
      phoneNumber.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      emailId.trim().length === 0
    );
  };

  onSignup = () => {
    const {navigation, signup} = this.props;
    const {emailId, phoneNumber, firstName, lastName} = this.state;
    const params = {
      email: emailId,
      phone: phoneNumber,
      countryCode: '+91',
      name: `${firstName} ${lastName}`,
      latitude: 0,
      longitude: 0,
    };
    signup(params, res => {
      if (res) {
        resetRoute(navigation, SCREENS.LOGIN);
      }
    });
  };

  render() {
    const {phoneNumber, firstName, lastName, emailId} = this.state;
    const isDisabled = this.isDisabled();
    return (
      <ScreenBackground>
        <LogoHeader />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled
          contentContainerStyle={COMMON_STYLES.flexGrow}
          style={COMMON_STYLES.flexGrow}
          keyboardShouldPersistTaps={'handled'}>
          <Input
            title={REGISTER_STRINGS.PHONE_NO}
            keyboardType={'phone-pad'}
            wrapperStyle={styles.marginTop}
            value={phoneNumber}
            onChangeText={t => this.setState({phoneNumber: t})}
            fromRegister
            renderRightComponent={() => (
              <TouchableOpacity>
                <Text style={styles.changeText}>{REGISTER_STRINGS.CHANGE}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={COMMON_STYLES.rowAlignCenter}>
            <Input
              title={REGISTER_STRINGS.FIRST_NAME}
              wrapperStyle={styles.textInput}
              value={firstName}
              onChangeText={t => this.setState({firstName: t})}
              fromRegister
            />
            <Input
              title={REGISTER_STRINGS.LAST_NAME}
              wrapperStyle={[styles.textInput, styles.margin]}
              value={lastName}
              onChangeText={t => this.setState({lastName: t})}
              fromRegister
            />
          </View>
          <Input
            title={REGISTER_STRINGS.EMAIL_ID}
            keyboardType={'email-address'}
            wrapperStyle={styles.emailTextInput}
            value={emailId}
            onChangeText={t => this.setState({emailId: t})}
            fromRegister
          />
          <Dropdown
            value={'name'}
            headerTitle={'name'}
            data={[]}
            // pickerStyle={{
            //   left: responsiveWidth(5) + responsiveHeight(2) + 4,
            //   width: responsiveWidth(90) - responsiveHeight(4),
            // }}
            onChangeText={(value, index) => {}}
            renderBase={() => (
              <View style={styles.dropdownBase}>
                <View>
                  <Text style={styles.dropdownTitle}>
                    {REGISTER_STRINGS.REQUIREMENT}
                  </Text>
                  <Text style={styles.dropdownText}>
                    I will be using Pickkup
                  </Text>
                </View>
                <SvgXml width={14} height={10} xml={SVG.ARROW_DOWN} />
              </View>
            )}
          />
          <Text style={styles.promoText}>{REGISTER_STRINGS.PROMO_CODE}</Text>
          <Button
            title={BUTTON_STRINGS.SIGN_UP}
            isBold
            disabled={isDisabled}
            onPress={this.onSignup}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.otpText}>{REGISTER_STRINGS.OTP_MESSAGE}</Text>
          </View>
        </KeyboardAwareScrollView>
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
    signup: (params, callBack) =>
      dispatch({type: REQUEST_SIGNUP, params, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
