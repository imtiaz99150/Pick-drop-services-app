import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import BackHeader from '../../components/BackHeader';
import COMMON_STYLES from '../../themes/Styles';
import {SETTINGS_STRINGS} from '../../constants/Strings';
import GradientLineTitle from '../../components/GradientLineTitle';
import styles from './style';
import {SvgXml} from 'react-native-svg';
import {SVG} from '../../constants/Svg';
import {SETTING_OPTIONS, LOGOUT_OPTION} from '../../constants/SettingsOptions';
import SettingItem from '../../components/SettingItem';
import {SCREENS} from '../../constants/Screens';
import {isPad} from '../../Utils/ScalingUtils';
import {resetRoute} from '../../Utils/NavigationUtils';
import {CLEAR_STATE} from '../../redux/actions/commonActions';

class Settings extends React.PureComponent {
  renderAccountInformation = () => {
    const {navigation} = this.props;
    return (
      <View style={styles.accountParent}>
        <GradientLineTitle title={SETTINGS_STRINGS.MY_ACCOUNT} />
        <TouchableOpacity
          style={styles.accountContainer}
          onPress={() => navigation.navigate(SCREENS.ACCOUNT)}>
          <SvgXml
            width={isPad ? 80 : 54}
            height={isPad ? 80 : 54}
            xml={SVG.USER_IMAGE}
          />
          <View style={COMMON_STYLES.flex}>
            <Text numberOfLines={1} style={styles.userNameText}>
              Ram Niwas Kumar
            </Text>
            <Text numberOfLines={1} style={styles.subscriptionText}>
              Tata Ace Gold ( PB 00 A 0000 )
            </Text>
          </View>
          <SvgXml
            width={isPad ? 20 : 12}
            height={isPad ? 20 : 12}
            xml={SVG.ANGLE_RIGHT}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onPressSettingItem = item => {
    const {navigation} = this.props;
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  onPressLogout = () => {
    const {navigation, clearReducerState} = this.props;
    clearReducerState();
    resetRoute(navigation, SCREENS.ONBOARDING);
  };

  renderSettings = () => {
    return (
      <View>
        <GradientLineTitle title={SETTINGS_STRINGS.SETTINGS} />
        <View style={styles.optionParent}>
          {SETTING_OPTIONS.map((option, index) => {
            return (
              <SettingItem
                key={index.toString()}
                item={option}
                onPress={() => this.onPressSettingItem(option)}
              />
            );
          })}
        </View>
        <GradientLineTitle />
        <SettingItem
          item={LOGOUT_OPTION}
          wrapperStyle={styles.logoutWrapper}
          onPress={this.onPressLogout}
        />
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={COMMON_STYLES.container}>
        <BackHeader navigation={navigation} title={SETTINGS_STRINGS.SETTINGS} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderAccountInformation()}
          {this.renderSettings()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    clearReducerState: () => dispatch({type: CLEAR_STATE}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
