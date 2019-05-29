import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker } from 'react-native';
import {setCurrentUser} from '../actions/index';
import {connect} from 'react-redux'
import Header from '../components/Header'


class SignUpScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            phoneNumber: "",
            countryCode: 84,
            password: "",
        }
    }
    
    static navigationOptions = {
        header: null
    }

    requestSignUp = () => {
        fetch('http://api.appebike.com:4000/v1/shared/auth/sign-up', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
                'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
            },
            body: JSON.stringify({
                "username": this.state.username,
                "email": this.state.email,
                "phoneNumber": parseInt(this.state.phoneNumber),
                "countryCode": parseInt(this.state.countryCode),
                "password": this.state.password
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if('token' in responseJson){
                    this.props.setCurrentUser(responseJson)
                    alert('Chúc mừng bạn đã đăng kí thành công.')
                    this.props.navigation.navigate('SignIn')
                } else {
                    console.log(responseJson.message)
                    alert(responseJson.message.constraints)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ImageBackground
                source={{ uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png' }}
                style={{ width: '100%', height: '100%' }}>
                <Header title='Sign Up' goBack={this.props.navigation.goBack}/>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
                    <TextInput
                        onChangeText={(text) => this.setState({ username: text })}
                        style={styles.textInput}
                        placeholder='Username'
                        textContentType='telephoneNumber' />
                    <TextInput
                        onChangeText={(text) => this.setState({ email: text })}
                        style={styles.textInput}
                        placeholder='Email'
                        keyboardType='email-address' />
                    <Picker style = {{width: 200}}>
                        <Picker.Item label='+84' value='84'/>
                        <Picker.Item label='+33' value='33'/>
                        <Picker.Item label='+55' value='55'/>
                    </Picker>
                    <TextInput
                        onChangeText={(text) => this.setState({ phoneNumber: text })}
                        style={styles.textInput}
                        placeholder='Phone number'
                        textContentType='telephoneNumber'
                        keyboardType='numeric'
                        maxLength={9} />
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        style={styles.textInput}
                        placeholder='Password'
                        textContentType='password'
                        secureTextEntry={true} />
                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={this.requestSignUp}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 30, backgroundColor: 'orange' }}>
                            <Text>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

export default connect(null, {setCurrentUser})(SignUpScreen)



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