import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignInRedux from '../Redux/SignInRedux'
import Spiner from 'react-native-loading-spinner-overlay'


class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countryCode: 84,
      phoneNumber: -1,
      password: '',
      spiner: false,
      buttonPressed: false
    }
  }

  static navigationOptions = {
    header: null
  }


  // requestSignIn = () => {
  //     fetch('http://api.appebike.com:4000/v1/shared/auth/sign-in', {
  //         method: 'POST',
  //         headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //             'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
  //             'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
  //         },
  //         body: JSON.stringify({
  //             "phoneNumber": parseInt(this.state.phoneNumber),
  //             "countryCode":  parseInt(this.state.countryCode),
  //             "password": this.state.password
  //         }),
  //     })
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //             if('token' in responseJson){
  //                 alert(JSON.stringify(responseJson))
  //                 this.props.setCurrentUser(responseJson)
  //                 this.props.navigation.navigate('Home')
  //             } else {
  //                 alert(JSON.stringify(responseJson))
  //                 alert(JSON.stringify(this.state.countryCode))
  //             }
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // }


  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    const { navigation } = this.props
    if (this.state.buttonPressed == true) {
      if (nextProps.isRequesting === true) {
        this.setState({ spiner: true })
      }
      else {
        this.setState({ spiner: false })
        if (nextProps.error !== null) {
          alert(nextProps.error.message)
        }
        else {
          navigation.navigate('StationScreen', { token: nextProps.token, user: nextProps.user })
        }
      }
    }
  }

  //get User from SignUpScreen
  getRegisteredUser = (registeredUser) => {
    this.setState({
      phoneNumber: registeredUser.phoneNumber,
      countryCode: registeredUser.countryCode
    })
  }

  render() {
    console.log(this.state)
    return (
      <ImageBackground
        source={{ uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png' }}
        style={{ width: '100%', height: '100%' }}>
        <Header title='Sign In' />
        <Spiner visible={this.state.spiner} textContent={'Loading...'}/>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen', { setRegisteredUser: this.getRegisteredUser })}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, backgroundColor: 'lightblue' }}>
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
                console.log('after',this.state)
              }}
            style={{ marginTop: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 30, backgroundColor: 'orange' }}>
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
  }
})