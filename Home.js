import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import 'moment/locale/ar';
const {width} = Dimensions.get('window');
export default class Home extends React.Component {
  state = {dataSource: {}, images: [], data: []};
  componentDidMount() {
    fetch('https://run.mocky.io/v3/3a1ec9ff-6a95-43cf-8be7-f5daa2122a34')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
          images: responseJson.img,
          data: responseJson.reservTypes,
        });
      })
      .catch((error) => {});
  }
  constructor(props) {
    super(props);
    this.date = props.time;
  }
  render() {
    const time = this.state.dataSource.date;
    const day = moment(time).format('LLLL');
    moment.locale('ar');
    const {info, trainer, about, textColor} = styles;
    // console.log('data', this.state.dataSource);
    return (
      <View style={{flex: 1, width: '100%'}}>
        <ScrollView>
          <View>
            <Swiper
              height={200}
              width={width}
              autoplay={true}
              autoplayTimeout={2}
              loop={true}
              showsPagination={false}>
              {this.state.images.map((item, i) => {
                // console.log('item', item);
                return (
                  <Image
                    key={i}
                    resizeMode={'cover'}
                    source={{uri: item}}
                    style={{width: '100%', height: 200}}
                  />
                );
              })}
            </Swiper>
          </View>
          <View style={{padding: 10}}>
            <View
              style={info}>
              <Text style={textColor}>
              
                # {this.state.dataSource.interest}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#c2c6d2',
                  paddingBottom: 5,
                }}>
                
                {this.state.dataSource.address}
              </Text>
              <Text style={textColor}> {day} </Text>
              <Text style={textColor}>
              
                {this.state.dataSource.trainerInfo}
              </Text>
            </View>
            <View
              style={trainer}>
              <View style={{flexDirection: 'row-reverse'}}>
                <Image
                  source={{uri: this.state.dataSource.trainerImg}}
                  style={{width: 50, height: 20}}
                  resizeMode={'contain'}
                />
                <Text style={textColor}>{this.state.dataSource.trainerName}</Text>
              </View>
              <Text style={textColor}>{this.state.dataSource.trainerInfo}</Text>
            </View>
            <View
              style={about}>
              <Text style={textColor}>عن الدوره</Text>
              <Text style={textColor}>{this.state.dataSource.occasionDetail}</Text>
            </View>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <Text style={textColor}>تكلفه الدوره</Text>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={textColor}>الحجز العادي</Text>
              <Text style={textColor}>SAR {this.state.dataSource.price} </Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 70,
            backgroundColor: '#7a348d',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff'}}>قم بالحجز الان</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  info: {
    marginTop: 5,
    paddingBottom: 10,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: '#f1f1f1',
  },
  trainer: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
  },
  about: {
    alignItems: 'flex-end',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    width: '100%',
  },
  textColor: {
    color: '#a7a7a7', 
    paddingBottom: 5
  }
});
