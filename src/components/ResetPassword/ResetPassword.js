import React, { Component } from 'react';
import { View, Text, Item, Input, Button, Toast } from 'native-base';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { resetPassword } from '../../actions';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activityIndicator: false,
            email: {
                value: '',
                error: null
            },
            code: {
                value: '',
                error: null
            },
            new_password: {
                value: '',
                error: null
            },
            confirm_password: {
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
        if (!this.state.email.value.includes('@')) {
            this.setState({
                email: {
                    error: 'Email Must Contains @ Sign'
                }
            });
            flag = true;
        }
        if (!this.state.code.value) {
            this.setState({
                code: {
                    error: 'Code is Mandatory'
                }
            });
            flag = true;
        }
        if (!this.state.new_password.value) {
            this.setState({
                new_password: {
                    error: 'Password is Mandatory'
                }
            });
            flag = true;
        }
        if (this.state.new_password.value && this.state.new_password.value.length < 6) {
            this.setState({
                new_password: {
                    error: 'Password must be six characters long'
                }
            });
            flag = true;
        }
        if (!this.state.confirm_password.value) {
            this.setState({
                confirm_password: {
                    error: 'Confirm Password is Mandatory'
                }
            });
            flag = true;
        }
        if (this.state.confirm_password.value !== this.state.new_password.value) {
            this.setState({
                confirm_password: {
                    error: 'Confirm Password does not match!'
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
                token: this.state.code.value,
                password: this.state.new_password.value,
                password_confirmation: this.state.confirm_password.value
            };
            console.log('inside if no errors');
            console.log(obj);

            const result = await resetPassword(obj);
            if (result.status === 200) {

                this.setState({
                    activityIndicator: false
                });

                Toast.show({
                    text: "Password Updated Successfully",
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'success'
                });
                Actions.login();
            }
            if (result.status === 500) {
                this.setState({
                    activityIndicator: false
                });

                Toast.show({
                    text: result.message,
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'danger'
                });
            }
            
            // Actions.login();
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

                    <View >
                        <Text style={customStyles.HeadingText}>Reset Your Password</Text>
                        <Item rounded style={customStyles.Item}>
                            <Input style={customStyles.Input} placeholderTextColor="#000" placeholder="Email" onBlur={() => this.validateField('Email') } onChangeText={value => this.setState({email: { value, error: null }})} />
                        </Item>
                        {this.state.email.error && <Text style={customStyles.ErrorMessage}>{this.state.email.error}</Text>}
                        <Item rounded style={customStyles.Item}>
                            <Input style={customStyles.Input} placeholderTextColor="#000" placeholder="Code" onBlur={() => this.validateField('Code') } onChangeText={value => this.setState({code: { value, error: null }})} />
                        </Item>
                        {this.state.code.error && <Text style={customStyles.ErrorMessage}>{this.state.code.error}</Text>}
                        <Item rounded style={customStyles.Item}>
                            <Input style={customStyles.Input} secureTextEntry={true} placeholderTextColor="#000" placeholder="New Password" onBlur={() => this.validateField('New Password') } onChangeText={value => this.setState({new_password: { value, error: null }})} />
                        </Item>
                        {this.state.new_password.error && <Text style={customStyles.ErrorMessage}>{this.state.new_password.error}</Text>}
                        <Item rounded style={customStyles.Item}>
                            <Input style={customStyles.Input} secureTextEntry={true} placeholderTextColor="#000" placeholder="Confirm Password" onBlur={() => this.validateField('Confirm Password') } onChangeText={value => this.setState({confirm_password: { value, error: null }})} />
                        </Item>
                        {this.state.confirm_password.error && <Text style={customStyles.ErrorMessage}>{this.state.confirm_password.error}</Text>}
                        {/* <Button rounded block info style={customStyles.Button} onPress={this.submitHandler}>
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'white'}}>Reset</Text>
                        </Button> */}
                        <TouchableOpacity style={customStyles.TouchableOpacity} onPress={this.submitHandler}>
                            <Text style={{textTransform: 'capitalize', color: 'whitesmoke', textAlign: 'center'}}>RESET</Text>
                        </TouchableOpacity>
                    </View>
                    { this.state.activityIndicator && (
                        <View>
                            <ActivityIndicator size="small" color="white" />
                        </View>
                    )}
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
        marginBottom: 20,
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
        height: 50,
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingVertical: 12,
        backgroundColor: '#115891',
        borderRadius: 25
    }
}

export default ResetPassword;