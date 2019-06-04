import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, Picker } from 'react-native';
import { connect } from 'react-redux'
import Header from '../Components/Header'
import SignInRedux from '../Redux/SignInRedux'


const countryCodeList = [
  { Id: 1, Name: '+84', Value: '84' },
  { Id: 2, Name: '+33', Value: '33' },
  { Id: 3, Name: '+35', Value: '35' }
]

class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countryCode: 84,
      phoneNumber: null,
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  selected = (selected) => {
    this.setState({
      countryCode: selected.Value
    })
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
    // const {user} = nextProps.data
    // this.setState({
    //     countryCode: user.countryCode,
    //     phoneNumber: user.phoneNumber,
    // })
  }


  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://ant-tech.eu/wp-content/uploads/2017/06/logo-text.png' }}
        style={{ width: '100%', height: '100%' }}>
        <Header title='Sign In' />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
          <TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, backgroundColor: 'lightblue' }}>
              <Text>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
          <Picker style={{ width: 200 }} onValueChange={(selected) => this.setState({ countryCode: selected })}>
            <Picker.Item label='+84' value='84' />
            <Picker.Item label='+33' value='33' />
            <Picker.Item label='+55' value='55' />
          </Picker>
          <TextInput
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            style={styles.textInput}
            placeholder='Enter your phone number'
            textContentType='telephoneNumber'
            keyboardType='numeric'
            // defaultValue = {user.phoneNumber ? user.phoneNumber.toString(10) : ''}
            maxLength={9} />
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
                console.log(this.props.a)
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
  console.log(state)
  return {
    a: state
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