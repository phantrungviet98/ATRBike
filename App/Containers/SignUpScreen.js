import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignUpRedux from '../Redux/SignUpRedux'
import Spiner from 'react-native-loading-spinner-overlay'


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
      spiner: false
    }
  }

  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps(nextProps) {
    const {navigation} = this.props
    if(nextProps.isRequesting === true) {
      this.setState({spiner: true})
    }
    else{
      this.setState({spiner: false})
      if(nextProps.error !== null) {
        alert(nextProps.error.message)
      }
      else {
        //setRegisteredUser is call back function to pass phoneNumber and 
        //country code to SignUpScreen and auto fill 
        setRegisteredUser = navigation.getParam('setRegisteredUser')
        setRegisteredUser({
          phoneNumber: nextProps.user.phoneNumber,
          countryCode: nextProps.user.countryCode
        })
        navigation.goBack()
        alert('Register Successfuly. Please Sign Up.')
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png' }}
        style={{ width: '100%', height: '100%' }}>
        <Header title='Sign Up' goBack={this.props.navigation.goBack} />
        <Spiner visible={this.state.spiner} textContent={'Loading...'}/>
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
          <Picker style={styles.textInput} selectedValue={this.state.countryCode} onValueChange={(itemValue, itemIndex) => this.setState({ countryCode: parseInt(itemValue) })}>
            <Picker.Item label='+84' value='84' />
            <Picker.Item label='+33' value='33' />
            <Picker.Item label='+55' value='55' />
          </Picker>
          <TextInput
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            style={styles.textInput}
            placeholder='Phone number'
            textContentType='telephoneNumber'
            keyboardType='numeric'
            maxLength={9} />
          <TextInput
            onChangeText={(text) => this.setState({ firstName: text })}
            style={styles.textInput}
            placeholder='First name' />
          <TextInput
            onChangeText={(text) => this.setState({ lastName: text })}
            style={styles.textInput}
            placeholder='Last name' />
          <TextInput
            onChangeText={(text) => this.setState({ password: text })}
            style={styles.textInput}
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
            }}>
            <View style={styles.signUpButton}>
              <Text>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',
    marginTop: 1,
    width: 200,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  signUpButton: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 150, 
    height: 30, 
    backgroundColor: 'orange',
    borderRadius:  5
  }
})