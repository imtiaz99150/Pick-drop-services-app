import React from 'react';
import {Image, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import {IMAGES} from '../../assets/images/index';
import {resetRoute} from '../../Utils/NavigationUtils';
import {SCREENS} from '../../constants/Screens';
import COLORS from '../../themes/Colors';
import moment from 'moment';

class Splash extends React.PureComponent {
  componentDidMount = () => {
    const {navigation, expireTime} = this.props;
    const current = moment().format('YYYY/MM/DD HH:mm');
    if (expireTime === '' || moment(current).isAfter(expireTime)) {
      resetRoute(navigation, SCREENS.ONBOARDING);
    } else {
      resetRoute(navigation, SCREENS.CHOOSE_CURRENT_DROP_LOCATION);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={false}
          backgroundColor={COLORS.PURE_BLACK}
          barStyle={'dark-content'}
        />
        <Image source={IMAGES.SPLASH_ICON} style={styles.imageLogo} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authReducer} = state;
  const {authData, expireTime} = authReducer;
  return {
    authData,
    expireTime,
  };
};

export default connect(mapStateToProps)(Splash);
