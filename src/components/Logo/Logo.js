import React from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>   

        <Image         
          source={require('../../images/logo.png')} 
        />
        <Text style={styles.logoText}>School App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container :{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color:  '#fff'
  }
})