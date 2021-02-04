import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AUTH_USER, COURSES_LIST } from './types';

const baseUrl = require('../../config/development.json').baseUrl;
const axios = require('axios');


const headers = {
    'Content-Type': 'application/json'
}

export const getCourses = () => dispatch => {
    console.log('inside action');
    return axios.get(baseUrl + '/courses')
            .then(res => {
                console.log('inside then block');
                console.log(res);
                dispatch({ type: COURSES_LIST, payload: res });
            })
            .catch(err => {
                console.log('inside catch block');
                console.log(err);
                return err;
            });
}

export const signup = data => {
    console.log('inside action');
    return axios.post(baseUrl + '/register', data, headers)
            .then(res => {
                console.log('inside promise res');
                console.log(res);
                return res;
            })
            .catch(err => {
                const error = {};
                error.status = 500;
                error.message = err.message
                console.log('inside catch block');
                console.log(err.message);
                return error;
            });
}

export const login = data => {
    return axios.post(baseUrl + '/login', data, headers)
            .then(res => {
                console.log('inside promise res');
                console.log(res);
                return res;
            })
            .catch(err => {
                const error = {};
                error.status = 500;
                error.message = err.message
                console.log('inside catch block');
                console.log(err.message);
                return error;
            });
}

export const getUser = () => async dispatch => {

    const tokenType = await AsyncStorage.getItem('token_type');
    const accessToken = await AsyncStorage.getItem('access_token');

    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': _.startCase(tokenType) + ' ' + accessToken 
    };

    console.log(headers);

    return axios.get(baseUrl + '/user', { headers })
            .then(res => {
                console.log('inside promise res');
                console.log(res);
                dispatch({ type: AUTH_USER, payload: res.data });
            })
            .catch(err => {
                const error = {};
                error.status = 500;
                error.message = err.message
                console.log('inside catch block');
                console.log(err);
                return error;
            });
}

export const forgotPassword = data => {
    return axios.post(baseUrl + '/forgot', data, headers)
            .then(res => {
                console.log('inside promise res');
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
                const error = {};
                error.status = 500;
                error.message = err.message
                console.log('inside catch block');
                console.log(err);
                return error;
            });
}

export const resetPassword = data => {
    return axios.post(baseUrl + '/reset', data, headers)
            .then(res => {
                console.log('inside promise res');
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
                const error = {};
                error.status = 500;
                error.message = err.message
                console.log('inside catch block');
                console.log(err);
                return error;
            });
}

export const updateUser = data => async dispatch => {

    const tokenType = await AsyncStorage.getItem('token_type');
    const accessToken = await AsyncStorage.getItem('access_token');

    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': _.startCase(tokenType) + ' ' + accessToken 
    };

    console.log('headers', headers);

    return axios.put(baseUrl + '/user', data, { headers })
            .then(res => {
                console.log('inside promise res');
                console.log(res);
                dispatch({ type: AUTH_USER, payload: res.data });
                return res;
            })
            .catch(err => {
                const error = {};
                error.status = 500;
                error.message = err.message
                console.log('inside catch block');
                console.log(err);
                return error;
            });
}