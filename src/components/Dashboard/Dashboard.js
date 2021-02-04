import React, { Component } from 'react';
import { Container, Header, Left, Button, Body, Title, Right, Icon, Content, View, Text } from 'native-base';
import AppDrawerNavigator from '../AppDrawerNavigator/AppDrawerNavigator';
import { getUser } from '../../actions';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authUser: null
        }
    }

    async componentDidMount() {
        const result = await this.props.getUser();

        if (result.status === 200) {
            this.setState({
                authUser: result.data
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar style={{backgroundColor: '#173f5f'}} barStyle="light-content" />
                <AppDrawerNavigator />
            </View>
        )
    }
}

export default connect(null, { getUser })(Dashboard);