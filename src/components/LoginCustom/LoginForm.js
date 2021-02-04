import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,Keyboard} from 'react-native';
import { connect } from 'react-redux';
import {doUserLogin} from '../../actions';
import { Actions } from 'react-native-router-flux';

class LoginForm extends React.Component {

  constructor(props){
    super(props);    
    this.state = {
      email: '',
      password: ''
    }
    this._authenticateUser = this._authenticateUser.bind(this);
  }

  _authenticateUser(){   
    Keyboard.dismiss();
    this.props.doUserLogin(this.state.email,this.state.password);
  }


  render() {    
    
    let email_error;

    if(this.props.auth.lastError != undefined && this.props.auth.lastError.email != undefined && this.props.auth.lastError.email != ''){
      email_error = <Text style={styles.fieldValidation}>{this.props.auth.lastError.email[0]}</Text>
    }
    
    let password_error;

    if(this.props.auth.lastError != undefined && this.props.auth.lastError.password != undefined && this.props.auth.lastError.password != ''){
      password_error = <Text style={styles.fieldValidation}>{this.props.auth.lastError.password[0]}</Text>;
    }
    let generic_error;
    if(typeof this.props.auth.lastError == 'string' || this.props.auth.lastError instanceof String){
      generic_error = <View><Text style={styles.fieldValidation}>{this.props.auth.lastError}</Text></View>;
    }
    return (
      <View style={styles.container}>        
        {generic_error}
        <View>             
          <TextInput style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"     
              onChangeText={(text) => this.setState({email:text})}                    
              onSubmitEditing={()=> this.password.focus()}   
          />
          {email_error}
        </View>
        <View>
          <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}            
              ref={(input)=>this.password = input}         
              onChangeText={(text) => this.setState({password:text})}
          />
          {password_error}
        </View>
        <View>          
          
          <TouchableOpacity onPress={this._authenticateUser} style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>          
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,    
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    color: "#ffffff",
    marginVertical: 10
  },  
  button: {
    backgroundColor: '#115891',    
    marginVertical:10,
    width: 300,    
    paddingVertical: 12,
    borderRadius: 25
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',    
    textAlign: "center",    
  },
  fieldValidation:{
    color:'red',
    paddingLeft:15
  }
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

export default connect(mapStateToProps,{ doUserLogin })(LoginForm);