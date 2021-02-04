import React from 'react';
import { View } from 'native-base';
import { SafeAreaView, ScrollView, Dimensions, Image, Button, AsyncStorage } from 'react-native';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import HomeScreen from '../../screens/HomeScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const logout = async () => {
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('token_type');
  Actions.login();
}

const CustomDrawerComponent = props => { 

    console.log('custom', props);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 150, backgroundColor: '#173f5f', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../images/icon.png')} />
        </View>
        <ScrollView>
          <DrawerItems 
            {...props}
            onItemPress={({route, focused}) => {
              if (focused) {
                props.navigation.closeDrawer();
              } else {
                props.navigation.navigate(route.routeName);
              }
            }}
            />
          <Button title="Logout" onPress={logout} />
        </ScrollView>
      </SafeAreaView>
  )
}

const AppDrawerNavigator = createDrawerNavigator({
  Profile: ProfileScreen
}, {
  contentComponent: CustomDrawerComponent
});

export default AppDrawerNavigator;