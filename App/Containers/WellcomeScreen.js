import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignInRedux from '../Redux/SignInRedux'
import Loading from 'react-native-loading-spinner-overlay'
import NetInfo from '@react-native-community/netinfo'


class SignInScreen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png' }}
        style={{ width: '100%', height: '100%' }}>
        <Header title='Sign In' />
        <Loading visible={this.state.isLoading} textContent={'Loading...'} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen', { setRegisteredUser: this.getRegisteredUser })}>
            <View style={styles.signUpButton}>
              <Text>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
          <Picker style={styles.textInput} selectedValue={this.state.countryCode} onValueChange={(itemValue, itemIndex) => {
            this.setState({ countryCode: parseInt(itemValue) })
          }}>
            <Picker.Item label='+84' value='84' />
            <Picker.Item label='+33' value='33' />
            <Picker.Item label='+55' value='55' />
          </Picker>
          <TextInput
            onChangeText={(text) => this.setState({ phoneNumber: parseInt(text) })}
            style={styles.textInput}
            placeholder='Enter your phone number'
            textContentType='telephoneNumber'
            keyboardType='numeric'
            // defaultValue = {user.phoneNumber ? user.phoneNumber.toString(10) : ''}
            maxLength={9}
            defaultValue={this.state.phoneNumber == -1 ? '' : this.state.phoneNumber.toString()} />
          <TextInput
            onChangeText={(text) => this.setState({ password: text })}
            style={styles.textInput}
            placeholder='Enter your password'
            textContentType='password'
            secureTextEntry={true} />
          <TouchableOpacity
            onPress={
              () => {
                this.props.signIn({
                  countryCode: 84,
                  phoneNumber: 918718610,
                  password: '123456'
                })
                //buttonPressed to determine if navigating to StationScreen
                this.setState({ buttonPressed: true })
              }}
            style={{ marginTop: 10 }}>
            <View style={styles.loginButton}>
              <Text>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

// const mapStateToProps = (state) => {
//     return {
//         data: state.setCurrentUser
//     }
// }

// export default connect(mapStateToProps, {setCurrentUser})(SignInScreen)

const mapStateToProps = (state) => {
  return {
    token: state.signIn.token,
    user: state.signIn.user,
    isRequesting: state.signIn.isRequesting,
    error: state.signIn.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (contentSignInRequest) => dispatch(SignInRedux.signInRequest(contentSignInRequest))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)


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
    width: 100, 
    height: 30, 
    backgroundColor: 'lightblue',
    borderRadius: 5 
  },
  loginButton: { 
    justifyContent: 'center',
    alignItems: 'center', 
    width: 150, 
    height: 30, 
    backgroundColor: 'orange',
    borderRadius: 5}
})