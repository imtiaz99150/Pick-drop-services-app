import React from 'react';
import {
  View,
  PanResponder,
  LayoutAnimation,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import COMMON_STYLES from '../../themes/Styles';
import styles from './style';
import {SVG} from '../../constants/Svg';
import {BUTTON_STRINGS, SELECT_VEHICLE_STRINGS} from '../../constants/Strings';
import {Button} from '../../components/Button';
import {SvgXml} from 'react-native-svg';
import SelectVehicleItem from '../../components/SelectVehicleItem';
import BackIcon from '../../components/BackIcon';
import SearchDriverModal from '../../components/SearchDriverModal/index';
import {SCREENS} from '../../constants/Screens';
import {isPad, responsiveWidth} from '../../Utils/ScalingUtils';

const DATA = [
  {
    image: SVG.TRUCK,
    vehicleName: 'Tata magic Ace ',
    price: '₹500',
  },
  {
    image: SVG.TRUCK,
    vehicleName: 'Tata magic Ace ',
    price: '₹500',
  },
  {
    image: SVG.TRUCK,
    vehicleName: 'Tata magic Ace ',
    price: '₹500',
  },
];

class SelectVehicle extends React.PureComponent {
  state = {
    collapsed: true,
    selectedVehicleIndex: undefined,
    modalVisible: false,
    isCodeApplied: false,
  };

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  onPanResponderRelease = (event, gestureState) => {
    if (gestureState.dy < -30 || gestureState.dy < 30) {
      LayoutAnimation.linear();
      this.setState({collapsed: false});
    } else {
      LayoutAnimation.linear();
      this.setState({collapsed: true});
    }
  };

  renderCurrentMarker = () => {
    return (
      <Marker
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
        coordinate={{latitude: 37.78825, longitude: -122.4324}}>
        <SvgXml
          width={responsiveWidth(isPad ? 13 : 22)}
          height={responsiveWidth(isPad ? 13 : 22)}
          xml={SVG.LOCATION_TRACKER}
        />
      </Marker>
    );
  };

  renderItem = ({item, index}) => {
    const {selectedVehicleIndex} = this.state;
    const isSelected = selectedVehicleIndex === index;
    return (
      <SelectVehicleItem
        item={item}
        isSelected={isSelected}
        onPress={() => this.setState({selectedVehicleIndex: index})}
      />
    );
  };

  renderTrucks = () => {
    const {navigation} = this.props;
    const {isCodeApplied} = this.state;
    return (
      <View style={styles.detailsView} {...this.panResponder.panHandlers}>
        <SvgXml
          width={25}
          height={25}
          xml={SVG.ARROW_UP}
          style={styles.iconStyle}
        />
        <Text style={styles.truckText}>
          {SELECT_VEHICLE_STRINGS.POPULAR_TRUCK}
        </Text>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          horizontal
          style={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.promoContainer(isCodeApplied)}>
          <View style={COMMON_STYLES.rowAlignCenter}>
            <View>
              <Text style={styles.cashText}>{SELECT_VEHICLE_STRINGS.CASH}</Text>
              <Text style={styles.priceText}>₹100</Text>
            </View>
            <SvgXml
              xml={SVG.CASH}
              style={styles.cashIcon}
              height={isPad ? 55 : 36}
              width={isPad ? 55 : 36}
            />
          </View>
          <TouchableOpacity
            style={styles.promoView(isCodeApplied)}
            onPress={() => this.setState({isCodeApplied: !isCodeApplied})}>
            <Text style={styles.promoText(isCodeApplied)}>
              {SELECT_VEHICLE_STRINGS.APPLY_PROMO}
            </Text>
            {isCodeApplied ? (
              <Text style={styles.codeText}>PICCKUP80</Text>
            ) : null}
          </TouchableOpacity>
        </View>

        <Button
          title={BUTTON_STRINGS.BOOK_NOW}
          isBold
          onPress={() => navigation.navigate(SCREENS.DRIVER)}
        />
        <SafeAreaView />
      </View>
    );
  };

  renderBack = () => {
    const {navigation} = this.props;
    return <BackIcon navigation={navigation} />;
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={COMMON_STYLES.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {this.renderCurrentMarker()}
        </MapView>
        {this.renderBack()}
        {this.renderTrucks()}
        {modalVisible ? <SearchDriverModal /> : null}
      </View>
    );
  }
}

export default SelectVehicle;
