import React, { Component } from 'react';
import { Container, Header, Left, Button, Icon, Body, Title, Right, View, Text } from 'native-base';
import { connect } from 'react-redux';

class SettingsScreen extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon android="md-menu" ios="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#173f5f'}}>
                    <View>
                        <Text style={customStyles.Text}>Welcome to the Settings Screen</Text>
                    </View>
                    <View>
                        <Text style={customStyles.Text}>Hello {this.props.authUser.name}! This is your App</Text>
                    </View>
                </View>
            </Container>
        )
    }
}

const customStyles = {
    Text : {
        fontSize: 16,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        color: '#B5C8D7'
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    }
}

export default connect(mapStateToProps)(SettingsScreen)