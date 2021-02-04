import React from 'react';
import { StyleSheet, View, Image, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import { Root } from 'native-base';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {

  async componentDidMount() {
    setTimeout(() => {
        SplashScreen.hide();
    }, 1000);
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token) {
      Actions.dashboard();
    }
  }

  render() {
    
    return (
        <Provider store={store}>
          <Root>
            <View style={styles.container}> 
              <StatusBar style={styles.statusBarBackground} barStyle="light-content" />
              <Routes />
            </View>
          </Root>      
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#173f5f',
    flex: 1
  },
  statusBarBackground:{
    backgroundColor: '#173f5f'
  }
});