import React from 'react';
import {Router,Stack,Scene,Drawer} from 'react-native-router-flux';
import { YellowBox,StyleSheet} from 'react-native';

///import your components here.

// import Login from './components/Login/Login';
import LoginCustom from './components/LoginCustom/Login';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
// import Signup from './components/Signup/Signup';
// import ForgotPassword from './components/ForgotPassword/ForgotPassword';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);



export default class Routes extends React.Component{
    
    constructor(props){
        super(props);        
    }

    render(){
        return(
            <Router navigationBarStyle={styles.navBarColor}>
                <Stack key="root">
                    {/* <Scene key="login2" hideNavBar={true} component={LoginCustom} title="Login" /> */}
                    <Scene key="signup" hideNavBar={true} component={Signup} title="Signup"/>
                    <Scene key="login" hideNavBar={true} component={Login} title="Login" />
                    <Scene key="forgotPassword" hideNavBar={true} component={ForgotPassword} title="ForgotPassword"/>
                    <Scene key="resetPassword" hideNavBar={true} component={ResetPassword} title="ResetPassword"/>
                    <Scene key="dashboard" hideNavBar={true} component={Dashboard} title="Dashboard"/>     
                    {/* <Scene key="forgotpassword" hideNavBar={true} component={ForgotPassword} title="Forgot Password"  />                                */}
                </Stack>
            </Router>
        );
    }
}

const styles =StyleSheet.create({
    navBarColor:{
        backgroundColor: '#173f5f',
        borderColor: '#173f5f'        
    }    
});