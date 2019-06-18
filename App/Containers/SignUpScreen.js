import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignUpRedux from '../Redux/SignUpRedux'
import SignUpScreenStyles from './Styles/SignUpScreenStyles'
import Requesting from 'react-native-loading-spinner-overlay'


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
    const { navigation } = this.props
    if (this.state.buttonPressed == true) {
      if (nextProps.error !== null) {
        alert(nextProps.error.message)
      }
      else {
        navigation.navigate('StationScreen')
      }
    }
  }


  render() {
    return (
      <View style={SignUpScreenStyles.container}>
      <Header title='Sign Up' goBack={this.props.navigation.goBack} />
      <Requesting visible={this.props.isRequesting} textContent={'Loading...'} />
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
              "username": "lydfsasedddfdferersdfjhgd",
              "email": "lynkxysdhdsdeffgzdfassehrg@gmail.com",
              "phoneNumber": 912352822,
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
            <Text style={SignUpScreenStyles.signUpText}>Sign Up</Text>
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
    isRequesting: state.signUp.isRequesting,
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