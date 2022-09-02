import {StyleSheet} from 'react-native';
import {
  isIphoneXorAbove,
  responsiveHeight,
  responsiveWidth,
  isPad,
} from '../../Utils/ScalingUtils';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailsView: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: responsiveHeight(3),
    borderTopLeftRadius: isPad ? 15 : 10,
    borderTopRightRadius: isPad ? 15 : 10,
    paddingBottom: isIphoneXorAbove() ? 0 : responsiveHeight(3),
  },
  iconStyle: {
    alignSelf: 'center',
    marginBottom: responsiveHeight(3),
  },
  userImage: {
    left: responsiveWidth(4),
    top: responsiveHeight(6),
    position: 'absolute',
    height: responsiveWidth(isPad ? 12 : 17),
    width: responsiveWidth(isPad ? 12 : 17),
    resizeMode: 'contain',
  },
});

export default styles;
