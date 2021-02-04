import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, View, Text, Toast } from 'native-base';
import { AsyncStorage, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import Logo from '../Logo/Logo';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { login } from '../../actions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activityIndicator: false,
            email: {
                value: '',
                error: null
            },
            password: {
                value: '',
                error: null
            }
        }
    }

    checkRequiredFields() {
        let flag = false;
        if (!this.state.email.value) {
            this.setState({
                email: {
                    error: 'Email is Mandatory'
                }
            });
            flag = true;
        }
        if (this.state.email.value && !this.state.email.value.includes('@')) {
            this.setState({
                email: {
                    error: 'Email Must Contains @ Sign'
                }
            });
            flag = true;
        }
        if (!this.state.password.value) {
            this.setState({
                password: {
                    error: 'Password is Mandatory'
                }
            });
            flag = true;
        }
        return flag;
    }

    validateField = field => {
        
        
        if (this.state[_.snakeCase(field)].value == "") {
            
            this.setState({
                [_.snakeCase(field)]: {
                    error: `${field} is Mandatory`
                }
            });
        }
    }

    submitHandler = async () => {
        
        console.log('in submit handler');
        
        const error = await this.checkRequiredFields();
        console.log(this.state);

        if (!error) {
            this.setState({
                activityIndicator: true
            })
            let obj = {
                email: this.state.email.value,
                password: this.state.password.value
            };
            console.log('inside if no errors');
            console.log(obj);
            const result = await login(obj);
            console.log(result);
            if (result.status === 200) {
                this.setState({
                    activityIndicator: false
                })
                Toast.show({
                    text: "Successfully Logged In",
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'success'
                });
                await AsyncStorage.setItem('access_token', result.data.access_token);
                await AsyncStorage.setItem('token_type', result.data.token_type);
                Actions.dashboard();
            }
            
            if (result.status === 500) {
                this.setState({
                    activityIndicator: false
                })
                Toast.show({
                    text: result.message,
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'danger'
                });
            }
        } else {
            console.log('inside else errors there');
        }
    }

    render() {

        const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;

        return (
            
            <View style={{flex: 1, backgroundColor: '#173f5f'}}>
                
                <ScrollView contentContainerStyle={{width: screenWidth, height: screenHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Image source={require('../../images/icon.png')} />
                    </View>
                    
                    <View>
                        <Text style={customStyles.HeadingText}>Login</Text>
                    </View>

                    <View> 
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Email" onBlur={() => this.validateField('Email')} onChangeText={value => this.setState({email: { value, error: null }})} />
                        </Item>
                        {this.state.email.error && <Text style={customStyles.ErrorMessage}>{this.state.email.error}</Text>}
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" secureTextEntry={true} style={customStyles.Input} placeholder="Password" onBlur={() => this.validateField('Password')} secureTextEntry={true} onChangeText={value => this.setState({password: { value, error: null }})} />
                        </Item>
                        {this.state.password.error && <Text style={customStyles.ErrorMessage}>{this.state.password.error}</Text>}
                        {/* <Button rounded block info style={customStyles.Button} onPress={this.submitHandler} >
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'white'}}>Login</Text>
                        </Button> */}
                        <TouchableOpacity onPress={this.submitHandler} style={customStyles.TouchableOpacity}>
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'whitesmoke', textAlign: 'center'}}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>

                    { this.state.activityIndicator && (
                        <View>
                            <ActivityIndicator size="small" color="white" />
                        </View>
                    )}

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Button transparent onPress={() => Actions.forgotPassword()}>
                            <Text style={{fontSize: 16, textTransform: 'capitalize', fontWeight: 'bold', color: 'white'}}>Forgot Password?</Text>
                        </Button>
                    </View>

                    

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <View>
                            <Text style={customStyles.Text}>Don't have an account?</Text>
                        </View>
                        <View>
                            <Button style={{marginLeft: -10, marginTop: -13}} transparent onPress={() => Actions.signup()}>
                                <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 16, color: 'white'}}>Signup</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const customStyles = {
    Item: {
        marginLeft: 40, 
        marginRight: 40, 
        marginTop: 10,
        backgroundColor: '#FFF',
        borderColor: '#FFF'
    },
    Input: {
        height: 50,
        // color: 'white'
    },
    Button: {
        height: 50,
        marginLeft: 40, 
        marginRight: 40,
        marginTop: 10
    },
    HeadingText: {
        width: '100%',
        height: 40,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        color: 'white'
    },
    Text: {
        width: '100%',
        height: 40,
        fontSize: 16,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        color: '#B5C8D7'
    },
    ErrorMessage: {
        color: '#FFFF00',
        marginLeft: 60
    },
    TouchableOpacity: {
        marginTop: 10, 
        marginLeft: 40, 
        marginRight: 40, 
        height: 50, 
        paddingVertical: 12, 
        backgroundColor: '#115891', 
        borderRadius: 25
    }
}

export default Login