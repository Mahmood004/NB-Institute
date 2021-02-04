import React, { Component } from 'react';
import { View, Text, Item, Input, Button } from 'native-base';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { forgotPassword } from '../../actions';
import { ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activityIndicator: false,
            email: {
                value: '',
                error: null
            }
        }
    }

    checkRequiredField() {
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
        
        const error = await this.checkRequiredField();
        console.log(this.state);

        if (!error) {
            this.setState({
                activityIndicator: true
            })
            let obj = {
                email: this.state.email.value,
            };
            console.log('inside if no errors');
            console.log(obj);

            const result = await forgotPassword(obj);

            if (result.status === 204) {
                this.setState({
                    activityIndicator: false
                })
                Actions.resetPassword();
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
                    
                    <View style={{top: -65}}>
                        <Text style={customStyles.HeadingText}>Enter Your Email</Text>
                        <Item rounded style={customStyles.Item}>
                            <Input style={customStyles.Input} placeholderTextColor="#000" placeholder="Email" onBlur={() => this.validateField('Email') } onChangeText={value => this.setState({email: { value, error: null }})} />
                        </Item>
                        {this.state.email.error && <Text style={customStyles.ErrorMessage}>{this.state.email.error}</Text>}
                        {/* <Button rounded block info style={customStyles.Button} onPress={this.submitHandler}>
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'white'}}>Confirm</Text>
                        </Button> */}
                        <TouchableOpacity style={customStyles.TouchableOpacity} onPress={this.submitHandler}>
                            <Text style={{textTransform: 'capitalize', color: 'whitesmoke', textAlign: 'center'}}>CONFIRM</Text>
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

export default ForgotPassword;