import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignUpRedux from '../Redux/SignUpRedux'
import SignUpScreenStyles from './Styles/SignUpScreenStyles'
import Loading from 'react-native-loading-spinner-overlay'


class SignUpScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      phoneNumber: -1,
      countryCode: 84,
      firstName: '',
      lastName: '',
      password: "",
      buttonPressed: false
    }
  }

  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.buttonPressed == true) {
      if (nextProps.error !== null) {
        alert(JSON.stringify(nextProps.error.message))
      }
      else {
        this.storeToken(nextProps.token)
        nextProps.navigation.navigate('AddCardScreen')
      }
    }
  }

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (error) {
      console.log('storeToken Error: ', error)
    }
  }


  render() {
    return (
      <View style={SignUpScreenStyles.container}>
      <Header title='Sign Up' goBack={this.props.navigation.goBack} />
      <Loading visible={this.props.signUpStatus === 'activated' ? true : false} textContent={'Loading...'} />
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
        <Text style={SignUpScreenStyles.wellcomeText}>Join Us</Text>
        <TextInput
          onChangeText={(text) => this.setState({ username: text })}
          style={SignUpScreenStyles.textInput}
          placeholder='Username'
          textContentType='telephoneNumber' />
        <TextInput
          onChangeText={(text) => this.setState({ email: text })}
          style={SignUpScreenStyles.textInput}
          placeholder='Email'
          keyboardType='email-address' />
        <Picker style={SignUpScreenStyles.textInput} selectedValue={this.state.countryCode} onValueChange={(itemValue, itemIndex) => this.setState({ countryCode: parseInt(itemValue) })}>
          <Picker.Item label='+84' value='84' />
          <Picker.Item label='+33' value='33' />
          <Picker.Item label='+55' value='55' />
        </Picker>
        <TextInput
          onChangeText={(text) => this.setState({ phoneNumber: text })}
          style={SignUpScreenStyles.textInput}
          placeholder='Phone number'
          textContentType='telephoneNumber'
          keyboardType='numeric'
          maxLength={9} />
        <TextInput
          onChangeText={(text) => this.setState({ firstName: text })}
          style={SignUpScreenStyles.textInput}
          placeholder='First name' />
        <TextInput
          onChangeText={(text) => this.setState({ lastName: text })}
          style={SignUpScreenStyles.textInput}
          placeholder='Last name' />
        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          style={SignUpScreenStyles.textInput}
          placeholder='Password'
          textContentType='password'
          secureTextEntry={true} />
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            this.props.signUp({
              "username": "hasddsfgssdydsfsdfsdfdfjhgd",
              "email": "lsdfjdfuyjsdfsdfhrg@gmail.com",
              "phoneNumber": 911892243,
              "countryCode": 84,
              "profile": {
                "firstName": "Viet",
                "lastName": "Phan"

              },
              "password": "123456"
            })
            this.setState({ buttonPressed: true })
          }}>
          <View style={SignUpScreenStyles.signUpButton}>
            <Text style={SignUpScreenStyles.signUpText}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.signUp.token,
    user: state.signUp.user,
    signUpStatus: state.signUp.status,
    error: state.signUp.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (contentSignUpRequest) => dispatch(SignUpRedux.signUpRequest(contentSignUpRequest))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)

const styles = StyleSheet.create({
 
})