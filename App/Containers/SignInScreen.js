import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignInRedux from '../Redux/SignInRedux'
import PingRedux from '../Redux/PingRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'
import Loading from 'react-native-loading-spinner-overlay'
import NetInfo from '@react-native-community/netinfo'


class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countryCode: 84,
      phoneNumber: -1,
      password: '',
      hasInternetConnection: false
    }
    this.token = ''
    this.checkSignIn = true
    this.checkLocksRenting = true

  }

  static navigationOptions = {
    header: null
  }


  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (error) {
      console.log('storeToken Error: ', error)
    }
  }


  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        alert('Please check connection!!')
      }
    });
    function handleFirstConnectivityChange(isConnected) {
      if (!isConnected) {
        alert('Please check connection!!')
      }
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      );
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props
    console.log('sdfsdfasdf', nextProps)
    console.log(this.checkLocksRenting)
      if (!this.checkSignIn && nextProps.signInStatus == 'finished') {
        this.checkSignIn = true
        console.log('t', nextProps.signInStatus)
        console.log('props porps', nextProps)
        if (nextProps.signInError !== null) {
          alert(nextProps.error.message)
        }
        else {
          this.storeToken(nextProps.token)
          console.log('sgingdf, toke', nextProps.token)
          this.token = nextProps.token
          this.checkLocksRenting = false
          this.props.locksRenting(nextProps.token)
        }
      }

      if(!this.checkLocksRenting && nextProps.locksRentingStatus == 'finished') {
        console.log('props viet', nextProps)
        if(nextProps.locksRentingList.length > 0) {
          navigation.navigate('RentingBikeSuccessfullyScreen', {token: nextProps.token})
        } else {
          navigation.navigate('StationScreen', {token: nextProps.token})
        }
      }

      console.log(nextProps)



    //   }
    // }

    // Handel auto sign in
    // if (!this.checkAutoSignIn && nextProps.isPingRequesting === false) {
    //   this.checkAutoSignIn = true

    //   // auto sign in success
    //   if (nextProps.pingValue === 'pong') {
    //     this.props.locksRenting(this.token)
    //     this.checkLocks = false
    //   } else { // auto sign in fail
    //     // Do something
    //   }
    // }

    // // Handel get locks
    // if (!this.checkLocks && nextProps.isLocksRentingRequesting === false) {
    //   if (nextProps.locksRentingList.length > 0) {
    //     navigation.navigate('RentingBikeSuccessfullyScreen')
    //   }
    //   else {
    //     navigation.navigate('StationScreen', { token: this.token })
    //   }
    // }
  }





  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png' }}
        style={{ width: '100%', height: '100%' }}>
        <Header title='Sign In' />
        <Loading visible={(this.props.isSignInRequesting || this.props.isLocksRentingRequesting) } textContent={'Loading...'} />
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
                //buttonPressed to determine if navigating to which screen
                this.checkSignIn = false

                this.props.signIn({
                  countryCode: 84,
                  phoneNumber: 918718610,
                  password: '123456'
                })
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
    signInStatus: state.signIn.status,
    locksRentingStatus: state.locksRenting.status,
    locksRentingList: state.locksRenting.locksRentingList,
    signInError: state.signIn.error,
    locksRentingError: state.locksRenting.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (contentSignInRequest) => dispatch(SignInRedux.signInRequest(contentSignInRequest)),
    locksRenting: (token) => dispatch(LocksRentingRedux.locksRentingRequest(token))
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
    borderRadius: 5
  }
})