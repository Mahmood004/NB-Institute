import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SignupLogo extends React.Component {
  render() {
    return (
      <View style={styles.container}>           
        <Text style={styles.logoText}>Please fill in the form below to register with <Text style={styles.logoSiteText}>Bus.Watch</Text>.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container :{    
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', 
    width:'80%'
  },
  logoText: {
    fontSize: 15,    
    color:  '#fff',        
  },
  logoSiteText:{
      fontWeight:'500'
  }
})