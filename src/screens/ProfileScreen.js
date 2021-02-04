import React, { Component } from 'react';
import { ListItem, Body, Header, Left, Button, Icon, Title, Right, View, Text, Item, Input, Toast } from 'native-base';
import { TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, PixelRatio, Image, TouchableHighlight, Modal, Alert, CheckBox } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateUser } from '../actions';
import ImagePicker from 'react-native-image-picker';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            imageSource: null,
            activityIndicator: false,
            authUser: {
                avatar: null,
                email: '',
                name: {
                    value: '',
                    error: null
                },
                phone: {
                    value: '',
                    error: null
                },
                selectedCourses: {
                    value: [],
                    error: null
                },
            },
            courses: []
        }
        this.courseIds = [];
    }

    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.data);
      
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
            //   let source = { uri: response.uri };
      
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
              this.setState({
                imageSource: response
              });
            }
        });
    }

    onSelectedItemsChange = courseItem => {
        console.log(courseItem);
        console.log(this.state);
        const courses = [...this.state.authUser.selectedCourses.value];

        console.log('courses', courses);
        console.log(this.state);

        let index = courses.findIndex(course => course.id === courseItem.id);

        console.log('index', index);

        if (index >= 0) {
            courses.splice(index, 1);
        } else {
            courses.push(courseItem);
        }

        console.log('courses', courses);

        this.setState({ authUser: { ...this.state.authUser, selectedCourses: { value: courses, error: null }}});

    };

    checkRequiredFields() {
        let flag = false;
        if (!this.state.authUser.name.value) {
            this.setState({
                authUser: {
                    ...this.state.authUser,
                    name: {
                        ...this.state.authUser.name,
                        error: 'Name is Mandatory'
                    }
                }
            });
            flag = true;
        }
        if (!this.state.authUser.phone.value) {
            this.setState({
                authUser: {
                    ...this.state.authUser,
                    phone: {
                        ...this.state.authUser.phone,
                        error: 'Phone is Mandatory'
                    }
                }
            });
            flag = true;
        }
        if (!this.state.authUser.selectedCourses.value.length) {
            this.setState({
                authUser: {
                    ...this.state.authUser,
                    selectedCourses: {
                        ...this.state.authUser.selectedCourses,
                        error: 'Course Selection is Mandatory'
                    }
                }
            });
            flag = true;
        }
        return flag;
    }

    validateField = field => {
        console.log(_.snakeCase(field));
        if (this.state.authUser[_.snakeCase(field)].value == "") {
            
            this.setState({
                authUser: {
                        ...this.state.authUser,
                        [_.snakeCase(field)]: {
                            ...this.state.authUser[_.snakeCase(field)],
                            error: `${field} is Mandatory`
                    }
                }
            });
        }
    }

    setModalVisible = visible => {
        this.setState({
            modalVisible: visible
        });
    }

    submitHandler = async () => {
        console.log('in submit handler');
        const error = await this.checkRequiredFields();
        console.log(this.courseIds);
        console.log('error', error);
        console.log(this.state.authUser);
        if (!error) {

            console.log('inside if');

            this.setState({
                activityIndicator: true
            });

            this.courseIds = [];

            this.state.authUser.selectedCourses.value.forEach(item => {
                this.courseIds.push(item.id);
            });

            console.log('inside if below');

            let obj = {
                name: this.state.authUser.name.value,
                phone: this.state.authUser.phone.value,
                courses_list: this.courseIds,
                avatar: this.state.imageSource ? 'data:image/jpeg;base64,' + this.state.imageSource.data : this.state.authUser.avatar ? this.state.authUser.avatar : null
            };
            console.log('inside if no errors');
            console.log(obj);
            this.props.updateUser(obj);
            // console.log(result);
            // if (result.status === 204) {
            //     this.setState({
            //         activityIndicator: false
            //     })
            //     Toast.show({
            //         text: "User Updated Successfully",
            //         buttonText: "Okay",
            //         duration: 3000,
            //         position: 'bottom',
            //         type: 'success'
            //     });
                
            // }
            // if (result.status === 500) {
            //     this.setState({
            //         activityIndicator: false
            //     })
            //     Toast.show({
            //         text: result.message,
            //         buttonText: "Okay",
            //         duration: 3000,
            //         position: 'bottom',
            //         type: 'danger'
            //     });
            // }
            
        } else {
            
            console.log('inside else errors there');
        }
    }

    async componentWillReceiveProps(props) {
        console.log('props', props);

        if (props.coursesList) {
            if (props.coursesList.status === 200) {

                await this.setState({
                    courses: props.coursesList.data,
                });
    
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
        

        if (props.authUser) {

            if (this.state.activityIndicator) {
                this.setState({
                    activityIndicator: false
                });
                Toast.show({
                    text: 'User Updated Successfully',
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'success'
                });

            }

            await this.setState({
                authUser: {
                    avatar: props.authUser.avatar,
                    email: props.authUser.email,
                    name: {
                        value: props.authUser.name,
                        error: null
                    },
                    phone: {
                        value: props.authUser.phone,
                        error: null
                    },
                    selectedCourses: {
                        value: props.authUser.courses_list,
                        error: null
                    },
                }
            });

            this.courseIds = [];

            props.authUser.courses_list.forEach(item => {
                const obj = this.state.courses.find(course => course.name === item.name);
                if (obj) {
                    this.courseIds.push(obj['id']);
                }
            });

        } else {

            if (this.state.activityIndicator) {
                
                Toast.show({
                    text: 'User Updation Failed',
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'danger'
                });

            } else {
                Toast.show({
                    text: 'User Not Populated',
                    buttonText: "Okay",
                    duration: 3000,
                    position: 'bottom',
                    type: 'danger'
                });
            }
            
        }
        
    }

    updateField = (value, field) => {
        console.log(value);
        console.log(field);
        this.setState({
            authUser: {
                ...this.state.authUser,
                [field]: {
                    value,
                    error: null
                }
            }
            
        });
        console.log(this.state);
    }

    takePicture = () => {
        this.camera
          .capture()
          .then((data) => console.log(data))
          .catch(err => console.error(err));
    }

    render() {
        console.log('selected courses', this.state);
        const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;
        console.log('screen height', screenHeight);
        console.log(this.state.authUser.avatar, this.state.imageSource);

        return (
            <View style={{flex: 1, backgroundColor: '#173f5f'}}>
                <Header>
                    <Left>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon android="md-menu" ios="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                <ScrollView contentContainerStyle={{width: screenWidth, height: this.state.imageSource ? screenHeight + 180 : this.state.authUser.avatar ? screenHeight + 200 : screenHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    
                    <View style={{marginTop: -20, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Image source={require('../images/icon.png')} />
                    </View>
                    
                    <View style={{marginTop: -30}}> 
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Name" value={this.state.authUser.name.value} onBlur={() => this.validateField('Name')} onChangeText={value => this.updateField(value, 'name')} />
                        </Item>
                        {this.state.authUser.name.error && <View><Text style={customStyles.ErrorMessage}>{this.state.authUser.name.error}</Text></View>}
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Email" editable={false} value={this.state.authUser.email} onBlur={() => this.validateField('Email')} onChangeText={value => this.updateField(value, 'email')} />
                        </Item>
                        
                        <Item rounded style={customStyles.Item}>
                            <Input placeholderTextColor="#000" style={customStyles.Input} placeholder="Phone" value={this.state.authUser.phone.value} onBlur={() => this.validateField('Phone')} onChangeText={value => this.updateField(value, 'phone')} />
                        </Item>
                        {this.state.authUser.phone.error && <View><Text style={customStyles.ErrorMessage}>{this.state.authUser.phone.error}</Text></View>}
            
                        {/* <View style={{marginLeft: 45, marginRight: 45, marginTop: 20}}>
                            <MultiSelect
                                hideTags
                                items={this.state.courses}
                                uniqueKey="name"
                                ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={this.onSelectedItemsChange}
                                selectedItems={this.state.authUser.selectedCourses.value}
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
                            />
                        </View> */}
                        <TouchableOpacity style={{marginTop: 10, marginLeft: 40, marginRight: 40, height: 50, backgroundColor: '#FFF', borderRadius: 25, paddingVertical: 12.6}} onPress={() => this.setModalVisible(true)}>
                            
                            { !_.isEmpty(this.state.authUser.selectedCourses.value) ? 
                                (<Text style={{fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', color: '#000'}}>Update Courses ({this.state.authUser.selectedCourses.value.length} course(s) selected)</Text>) : 
                                (<Text style={{fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', color: '#000'}}>Pick Courses</Text>) }
                            
                        </TouchableOpacity>
                        {this.state.authUser.selectedCourses.error && <Text style={{color: '#FFFF00', marginLeft: 60}}>{this.state.authUser.selectedCourses.error}</Text>}

                        <View>
                            <TouchableOpacity style={{marginTop: 20, height: this.state.authUser.avatar ? 250 : this.state.imageSource ? 250 : 'auto'}} onPress={this.selectPhotoTapped}>
                                
                                { this.state.authUser.avatar ? this.state.imageSource ? 
                                    (<View style={{flex: 1, justifyContent:'center', alignItems: 'center', marginBottom: 17}}>
                                        <Image style={customStyles.ImageContainer} source={this.state.imageSource} />
                                    </View>) : (<View style={{flex: 1, justifyContent:'center', alignItems: 'center', marginBottom: 17}}>
                                        <Image style={customStyles.ImageContainer} source={{ uri: this.state.authUser.avatar }} />
                                    </View>) : this.state.imageSource ? (<View style={{flex: 1, justifyContent:'center', alignItems: 'center', marginBottom: 17}}>
                                        <Image style={customStyles.ImageContainer} source={this.state.imageSource} />
                                    </View>) : <Text style={customStyles.Text}>Select a photo</Text>
                                    
                                }
    
                            </TouchableOpacity>
                        </View>
                        

                        <TouchableOpacity onPress={this.submitHandler} style={customStyles.TouchableOpacity}>
                            <Text style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17, color: 'whitesmoke', textAlign: 'center'}}>UPDATE</Text>
                        </TouchableOpacity>

                        { this.state.activityIndicator && (
                            <View style={{marginTop: 20}}>
                                <ActivityIndicator size="small" color="white" />
                            </View>
                        )}
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
                                        <CheckBox value={ !_.isEmpty(this.state.authUser.selectedCourses.value) ? this.state.authUser.selectedCourses.value.find(courseItem => courseItem.name === course.name) ? true : false : false } onChange={() => this.onSelectedItemsChange(course)} />
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
    },
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#173f5f'
    },
    ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#173f5f',
        
    },
}

function mapStateToProps({ coursesList, authUser }) {
    return {
        coursesList,
        authUser
    }
}

export default connect(mapStateToProps, { updateUser })(ProfileScreen)