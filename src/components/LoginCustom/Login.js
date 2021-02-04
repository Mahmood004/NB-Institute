import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Logo from '../Logo/Logo';
import LoginForm from './LoginForm';
import { Actions } from 'react-native-router-flux';
// import  LoadingIndicator  from '../Loading/LoadingIndicator';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation';

class LoginCustom extends React.Component {
  
  _signup(){
    Actions.signup();
  }
  _GoToForgotPasswordPage(){
    Actions.dashboard();
  }

  render() {
    let activity;
    // if(this.props.auth.is_loading)
    //   activity = <LoadingIndicator />

    return (
      <View style={styles.container}>    
        
        <Logo/>
        <LoginForm/>
        <TouchableOpacity onPress={this._GoToForgotPasswordPage} style={styles.buttonForgotPassword}>
            <Text style={styles.buttonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don't have a account yet?</Text>
            <TouchableOpacity onPress={this._signup}>
              <Text style={styles.signupButton}>Signup</Text>
            </TouchableOpacity>
        </View>             
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#173f5f',
  },
  signupTextContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', 
    paddingVertical: 16,   
    flexDirection: 'row'
  },
  signupText:{
    color: 'rgba(255,255,255,0.6)',    
  },
  signupButton:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 5,
  },
  buttonForgotPassword:{
    marginVertical:10,    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',    
    textAlign: "center",    
  },
});


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

/*function mapDispatchToProps (dispatch) {
  return {
    dispatchLogin: (user) => dispatch(login(user)),
  }
}*/

export default connect(mapStateToProps,{ })(LoginCustom);