// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return <View style={{flex: 1, backgroundColor: 'yellow'}}></View>;
//   }
// }

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EnterCountryScreen from './src/EnterCountryScreen';
import CountryDetailsScreen from './src/CountryDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="EnterCountryScreen"
          component={EnterCountryScreen}
          headerShown={false}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CountryDetailsScreen"
          component={CountryDetailsScreen}
          headerShown={false}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
