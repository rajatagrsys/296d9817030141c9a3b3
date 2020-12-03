import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

const KEY = 'a2d972afd6a9b03680b497b7c81fc8d7';

class CountryDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: null,
      capitalWeather: null,
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.route.hasOwnProperty('params')) {
      let data = this.props.route.params.data;
      this.setState({countryData: data});
    }
  }

  _onButtonPressed = () => {
    this._callWeatherApi();
  };

  _callWeatherApi = async () => {
    this.setState({
      loading: true,
    });
    try {
      let response = await fetch(
        'http://api.weatherstack.com/current?access_key=' +
          KEY +
          '&query=' +
          this.state.countryData.capital,
      );
      this.setState({
        loading: false,
      });

      let jsonResponse = await response.json();
      console.warn('Hii ' + JSON.stringify(jsonResponse));
      if (jsonResponse.status && jsonResponse.status == false) {
        alert('Try with another country');
      } else {
        this.setState({capitalWeather: jsonResponse});
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.error(error);
      alert('Error occured ' + error);
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
            {this.state.countryData != null ? (
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  style={{
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    marginTop: 15,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    //alignSelf: '',
                  }}>
                  <Text
                    style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                    {'Back'}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  {this.state.countryData.name}
                </Text>
                <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
                  {'Capital : ' + this.state.countryData.capital}
                </Text>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {'Population : ' + this.state.countryData.population}
                </Text>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {'Lat : ' + this.state.countryData.latlng[0]}
                </Text>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {'Long : ' + this.state.countryData.latlng[1]}
                </Text>
                <Text style={{fontSize: 18, color: 'black'}}>{'Image - '}</Text>
                <View
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    padding: 5,
                    borderColor: 'black',
                  }}>
                  <Image
                    style={{
                      width: 150,
                      height: 100,
                    }}
                    //resizeMode={'contain'}
                    source={{
                      uri: this.state.countryData.flag,
                    }}></Image>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this._onButtonPressed();
                  }}
                  style={{
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    marginTop: 15,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                    {'Capital Weather'}
                  </Text>
                </TouchableOpacity>

                {this.state.capitalWeather != null ? (
                  <View>
                    <Text style={{fontSize: 18, color: 'black'}}>
                      {'Wind Speed : ' +
                        this.state.capitalWeather.current.wind_speed}
                    </Text>
                    <Text style={{fontSize: 18, color: 'black'}}>
                      {'Temperature : ' +
                        this.state.capitalWeather.current.temperature}
                    </Text>

                    <FlatList
                      data={this.state.capitalWeather.current.weather_icons}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                        <View style={{margin: 5}}>
                          <Image
                            style={{height: 100, width: 100}}
                            source={{uri: item}}></Image>
                        </View>
                      )}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CountryDetailsScreen;
