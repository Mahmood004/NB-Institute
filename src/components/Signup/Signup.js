import React, { Component } from 'react';
import { ListItem, Body, Form, Item, Input, View, Button, Text, Picker, Toast } from 'native-base';
import { ActivityIndicator, CheckBox, ScrollView, Dimensions, TouchableOpacity, Image, Modal, TouchableHighlight, Alert } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import MultiSelect from 'react-native-multiple-select';
import { getCourses, signup } from '../../actions';
import { connect } from 'react-redux';
import LabelSelect from 'react-native-label-select';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            activityIndicator: false,
            name: {
                value: '',
                error: null
            },
            email: {
                value: '',
                error: null
            },
            phone: {
                value: '',
                error: null
            },
            // address: {
            //     value: ''
            // },
            password: {
                value: '',
                error: null
            },
            selectedCourses: {
                value: [],
                error: null
            },
            courses: []
        }
        this.courseIds = [];
    }

    async componentDidMount() {
        console.log('in it');
        this.props.getCourses();
    }

    componentWillReceiveProps(props) {
        console.log('props', props);

        if (props.coursesList.status === 200) {
            console.log('inside props if');
            console.log('courses', props.coursesList.data);
            this.setState({
                courses: props.coursesList.data
            })
        } else {
            Toast.show({
                text: 'Courses Not Fetched',
                buttonText: "Okay",
                duration: 3000,
                position: 'bottom',
                type: 'danger'
            });
        }
    }

    onSelectedItemsChange = courseItem => {
        console.log(courseItem);

        console.log(this.state);
        
        const courses = [...this.state.selectedCourses.value];

        console.log('courses', courses);

        let index = courses.findIndex(course => course.id === courseItem.id);

        console.log('index', index);

        if (index >= 0) {
            courses.splice(index, 1);
        } else {
            courses.push(courseItem);
        }

        console.log('courses', courses);

        this.setState({ selectedCourses: { value: courses, error: null }});
    };

    checkRequiredFields() {
        console.log('check required fields', this.state.selectedCourses);
        let flag = false;
        if (!this.state.name.value) {
            this.setState({
                name: {
                    ...this.state.name,
                    error: 'Name is Mandatory'
                }
            });
            flag = true;
        }
        if (!this.state.email.value) {
            this.setState({
                email: {
                    ...this.state.email,
                    error: 'Email is Mandatory'
                }
            });
            flag = true;
        }
        if (this.state.email.value && !this.state.email.value.includes('@')) {
            this.setState({
                email: {
                    ...this.state.email,
                    error: 'Email Must Contains @ Sign'
                }
            });
            flag = true;
        }
        if (!this.state.phone.value) {
            this.setState({
                phone: {
                    ...this.state.phone,
                    error: 'Phone is Mandatory'
                }
            });
            flag = true;
        }
        if (!this.state.password.value) {
            this.setState({
                password: {
                    ...this.state.password,
                    error: 'Password is Mandatory'
                }
            });
            flag = true;
        }
        if (this.state.password.value && this.state.password.value.length < 6) {
            this.setState({
                password: {
                    ...this.state.password,
                    error: 'Password must be six characters long'
                }
            });
            flag = true;
        }
        if (!this.state.selectedCourses.value.length) {
            this.setState({
                selectedCourses: {
                    ...this.state.selectedCourses,
                    error: 'Course Selection is Mandatory'
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
                    ...this.state[_.snakeCase(field)],
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
            });

            this.state.selectedCourses.value.forEach(item => {
                this.courseIds.push(item.id);
            });

            let obj = {
                name: this.state.name.value,
                email: this.state.email.value,
                phone: this.state.phone.value,
                // address: this.state.address.value,
                password: this.state.password.value,
                courses_list: this.courseIds
            };
            console.log('inside if no errors');
            console.log(obj);
            const result = await signup(obj);
            console.log(result);
            if (result.status === 204) {
                this.setState({
                    activityIndicator: false
                })
                Toast.show({
                    text: "User Registered Successfully",
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

    setModalVisible = visible => {
        this.setState({
            modalVisible: visible
        });
    }

    handleCheckbox = course => {
        console.log(course);
    }

    render() {

        const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;
        console.log(this.state);

        return (
            <View style={{flex: 1, backgroundColor: '#173f5f'}}>
        
                <ScrollView contentContainerStyle={{width: screenWidth, height: screenHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Image source={require('../../images/icon.png')} />
                    </View>
                    
                    <View>
                        <Text style={customStyles.HeadingText}>Register</Text>
                    </View>

                    <View> 
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Name" onBlur={() => this.validateField('Name')} onChangeText={value => this.setState({name: { value, error: null }})} />
                        </Item>
                        {this.state.name.error && <View><Text style={customStyles.ErrorMessage}>{this.state.name.error}</Text></View>}
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Email" onBlur={() => this.validateField('Email')} onChangeText={value => this.setState({email: { value, error: null }})} />
                        </Item>
                        {this.state.email.error && <Text style={customStyles.ErrorMessage}>{this.state.email.error}</Text>}
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Phone" onBlur={() => this.validateField('Phone')} onChangeText={value => this.setState({phone: { value, error: null }})} />
                        </Item>
                        {this.state.phone.error && <View><Text style={customStyles.ErrorMessage}>{this.state.phone.error}</Text></View>}
                        {/* <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Address (Optional)" onBlur={() => this.validateField('Address')} onChangeText={value => this.setState({address: { value }})} />
                        </Item> */}
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Password" onBlur={() => this.validateField('Password')} secureTextEntry={true} onChangeText={value => this.setState({password: { value, error: null }})} />
                        </Item>
                        {this.state.password.error && <Text style={customStyles.ErrorMessage}>{this.state.password.error}</Text>}
            
                                {/* <MultiSelect
                                    hideTags={true}
                                    items={this.state.courses}
                                    uniqueKey="name"
                                    ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={this.onSelectedItemsChange}
                                    selectedItems={this.state.selectedCourses.value}
                                    selectText="Pick Courses"
                                    searchInputPlaceholderText="Search Courses..."
                                    onChangeInput={ (text)=> console.log(text)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#5F7690"
                                    tagBorderColor="#115891"
                                    tagTextColor="#5F7690"
                                    selectedItemTextColor="#5F7690"
                                    selectedItemIconColor="#115891"
                                    itemTextColor="#5F7690"
                                    displayKey="name"
                                    searchInputStyle={{ color: '#5F7690' }}
                                    hideSubmitButton={true}
                                    fixedHeight={true}
                                /> */}
                                {/* <LabelSelect
                                    ref="labelSelect"
                                    title="Make Choices"
                                    enable={true}
                                    readOnly={false}
                                    enableAddBtn={true}
                                    // style={yourStyle}
                                    onConfirm={(list) => this.onSelectedItemsChange(list)}>
                                    
                                    { this.state.selectedCourses.value.length && this.state.selectedCourses.value.map((course, index) => (<LabelSelect.Label
                                            key={index}
                                            data={course}
                                            onCancel={this.onCancel}>{course.name}</LabelSelect.Label>))
                                    }

                                    { this.state.courses.length && this.state.courses.map((course, index) => (
                                        <LabelSelect.ModalItem
                                        key={index}
                                        data={course}>{course.name}</LabelSelect.ModalItem>))
                                    }
                                </LabelSelect> */}
                                
                            
                        <TouchableOpacity style={{marginTop: 10, marginLeft: 40, marginRight: 40, height: 50, backgroundColor: '#FFF', borderRadius: 25, paddingVertical: 12.6}} onPress={() => this.setModalVisible(true)}>
                            
                            { !_.isEmpty(this.state.selectedCourses.value) ? 
                                (<Text style={{fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', color: '#000'}}>Pick Courses ({this.state.selectedCourses.value.length} course(s) selected)</Text>) : 
                                (<Text style={{fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', color: '#000'}}>Pick Courses</Text>) }
                            
                        </TouchableOpacity>
                        {this.state.selectedCourses.error && <Text style={{color: '#FFFF00', marginLeft: 60}}>{this.state.selectedCourses.error}</Text>}
                            
                        
                        {/* <Button rounded block info style={customStyles.Button} onPress={this.submitHandler} >
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'white'}}>Register</Text>
                        </Button> */}

                        <TouchableOpacity onPress={this.submitHandler} style={customStyles.TouchableOpacity}>
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'whitesmoke', textAlign: 'center'}}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>

                    { this.state.activityIndicator && (
                        <View>
                            <ActivityIndicator size="small" color="white" />
                        </View>
                    )}

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <View>
                            <Text style={customStyles.Text}>Alreday Registered?</Text>
                        </View>
                        <View>
                            <Button style={{marginLeft: -10, marginTop: -13}} transparent onPress={() => Actions.login()}>
                                <Text style={{fontSize: 16, textTransform: 'capitalize', fontWeight: 'bold', color: 'white'}}>Login</Text>
                            </Button>
                        </View>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed')
                        }}>

                        <View style={{flex: 1, backgroundColor: '#FFF'}}>
                            <View style={{marginTop: 10, height: 40, backgroundColor: '#FFF', paddingVertical: 8}}>
                                <Text style={{fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', color: 'red'}}>Courses List</Text>
                            </View>
                            <ScrollView contentContainerStyle={{height: 'auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                

                                { this.state.courses && this.state.courses.map((course, index) => (
                                    
                                    <ListItem key={index}>
                                        <CheckBox value={ !_.isEmpty(this.state.selectedCourses.value) ? this.state.selectedCourses.value.find(courseItem => courseItem.name === course.name) ? true : false : false} onChange={() => this.onSelectedItemsChange(course)} />
                                        <Body>
                                            <Text>{course.name}</Text>
                                        </Body>
                                    </ListItem>))
                                }
                                
                            </ScrollView>
                            <TouchableHighlight
                                style={{marginTop: 10, height: 50, backgroundColor: '#FFF', paddingVertical: 8}}
                                onPress={() => this.setModalVisible(false)}>
                                <Text style={{fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', color: 'red'}}>Close</Text>
                            </TouchableHighlight>
                        </View>

                    </Modal>
                
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

function mapStateToProps({ coursesList }) {
    return {
        coursesList
    }
}

export default connect(mapStateToProps, { getCourses })(Signup)