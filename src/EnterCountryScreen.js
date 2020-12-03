import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';

class EnterCountryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: '',
      loading: false,
    };
  }

  _onSubmitButtonPressed = () => {
    if (this.state.countryName == '') {
      alert('Please enter some input');
    } else {
      this._callCountryApi();
    }
  };

  _callCountryApi = async () => {
    this.setState({
      loading: true,
    });
    try {
      let response = await fetch(
        'https://restcountries.eu/rest/v2/name/' + this.state.countryName,
      );
      this.setState({
        loading: false,
      });

      let jsonResponse = await response.json();
      console.warn('Hii ' + JSON.stringify(jsonResponse));
      if (jsonResponse.status && jsonResponse.message) {
        alert(jsonResponse.message);
      } else {
        this.props.navigation.navigate('CountryDetailsScreen', {
          data: jsonResponse[0],
        });
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
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
          {'Rajat Sharma Demo'}
        </Text>
        <Text style={{fontSize: 10, color: 'black'}}>
          {'rajatsharma1695@gmail.com'}
        </Text>

        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            width: '90%',
            padding: 10,
            fontSize: 16,
            borderRadius: 10,
            marginTop: 10,
          }}
          placeholder={'Enter country'}
          onChangeText={(text) => this.setState({countryName: text})}
          value={this.state.countryName}
        />

        <TouchableOpacity
          onPress={() => {
            this._onSubmitButtonPressed();
          }}
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            marginTop: 15,
            borderRadius: 10,
            backgroundColor: this.state.countryName == '' ? 'gray' : 'black',
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            {this.state.loading ? 'Loading.. Please wait !' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EnterCountryScreen;
