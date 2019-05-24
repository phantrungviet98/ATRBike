import React, { Component } from 'react';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import PickerModal from 'react-native-picker-modal-view';

const countryCodeList = [
    { Id: 1, Name: '+84', Value: '84' },
    { Id: 1, Name: '+33', Value: '33' },
    { Id: 1, Name: '+35', Value: '35' }
]

export default class SignInScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCountryCode: {},
            phoneNumber: null,
            password: null,
            registeredUsername: ''
        }
    }

    componentDidMount() {
        const registeredUsername = this.props.navigation.getParam('username', '')
        this.setState({registeredUsername: registeredUsername})
        
    }

    selected = (selected) => {
        this.setState({
            selectedCountryCode: selected
        })
    }

    requestSignIn = () => {
        fetch('http://api.appebike.com:4000/v1/shared/auth/sign-in', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
                'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
            },
            body: JSON.stringify({
                "phoneNumber": parseInt(this.state.phoneNumber),
                "countryCode":  parseInt(this.state.selectedCountryCode.Value),
                "password": this.state.password
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if('token' in responseJson){
                    this.props.navigation.navigate('Home')
                } else {
                    alert('Lỗi')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ImageBackground 
                source={{uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png'}} 
                style={{width: '100%', height: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('SignUp')}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, backgroundColor: 'lightblue' }}>
                            <Text>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
                    <PickerModal
                        onSelected={(selected) => this.selected(selected)}
                        items={countryCodeList}
                        selected={this.state.selectedCountryCode}
                        selectPlaceholderText='Choose your Country code'
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({phoneNumber: text})}
                        style={styles.textInput}
                        placeholder='Enter your phone number'
                        textContentType='telephoneNumber'
                        keyboardType='numeric'
                        maxLength={9} />
                    <TextInput
                        onChangeText={(text) => this.setState({password: text})}
                        style={styles.textInput}
                        placeholder='Enter your password'
                        textContentType='password'
                        secureTextEntry={true} />
                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={this.requestSignIn}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 30, backgroundColor: 'orange' }}>
                            <Text>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'orange',
        marginTop: 1,
        width: 200,
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})