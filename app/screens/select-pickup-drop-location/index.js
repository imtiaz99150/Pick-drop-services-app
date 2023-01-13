import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Header from '../../components/Header';
import {LOCATION_STRINGS} from '../../constants/Strings';
import COMMON_STYLES from '../../themes/Styles';
import styles from './style';
import {SVG} from '../../constants/Svg';
import LocationItem from '../../components/LocationItem';
import Input from '../../components/TextInput/index';
import {isPad} from '../../Utils/ScalingUtils';

const DATA = [
  {
    title: 'Best Tech Power',
    address: '2972 Westheimer Rd, Illinois 85486 ',
  },
  {
    title: 'Best Tech Power',
    address: '2972 Westheimer Rd, Illinois 85486 ',
  },
  {
    title: 'Best Tech Power',
    address: '2972 Westheimer Rd, Illinois 85486 ',
  },
];

class SelectPickupDropLocation extends React.PureComponent {
  renderCurrentLocation = () => {
    return (
      <TouchableOpacity style={styles.rowStyle}>
        <SvgXml
          width={isPad ? 30 : 22}
          height={isPad ? 30 : 22}
          xml={SVG.CURRENT_LOCATION}
        />
        <Text style={styles.titleText}>{LOCATION_STRINGS.USE_CURRENT}</Text>
      </TouchableOpacity>
    );
  };

  renderItem = ({item}) => {
    return <LocationItem item={item} />;
  };

  renderMyLocations = () => {
    return (
      <View style={COMMON_STYLES.flex}>
        <Text style={styles.locationText}>{LOCATION_STRINGS.MY_LOCATIONS}</Text>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  render() {
    const {navigation, route} = this.props;
    const isDrop = route?.params?.isDrop;
    return (
      <SafeAreaView style={COMMON_STYLES.container}>
        <Header
          title={
            isDrop
              ? LOCATION_STRINGS.CHOOSE_DROP
              : LOCATION_STRINGS.CHOOSE_PICKUP
          }
          navigation={navigation}
        />
        <Input
          leftIcon={SVG.GOLD_LOCATION}
          iconHeight={isPad ? 30 : 22}
          iconWidth={isPad ? 25 : 17}
          wrapperStyle={styles.inputWrapperStyle}
          inputStyle={styles.inputStyle}
          placeholder={LOCATION_STRINGS.SEARCH}
          // value={value}
          // onChangeText={t => setValue(t)}
          fromRegister
        />
        {this.renderCurrentLocation()}
        {this.renderMyLocations()}
      </SafeAreaView>
    );
  }
}

export default SelectPickupDropLocation;
