import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import GreetingScreenStyles from './Styles/GreetingScreenStyles'
import {connect} from 'react-redux'
import PingRedux from '../Redux/PingRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'
import {resetScreen} from '../untils/navigation'
class GreetingScreen extends Component {

  constructor(props) {
    super(props)
    this.token = ''
    this.checkAutoSignIn = true
    this.checkLocksRenting = true
  }

  componentDidMount() { 
    this.getTokenFromStore().then(token => {
      if (token) {
        this.props.ping(token)
        console.log('token mef', token)
        this.checkAutoSignIn = false
        this.token = token
      } else {
        this.props.navigation.dispatch(resetScreen('SignInScreen'));
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.checkAutoSignIn && nextProps.pingStatus == 'finished') {
      this.checkAutoSignIn = true
      // auto sign in success
      if (nextProps.pingValue === 'pong') {
        this.props.locksRenting(this.token)
        this.checkLocksRenting = false
      } else { // auto sign in fail
        this.props.navigation.dispatch(resetScreen('SignInScreen'));
      }
    }

    // Handle get locks
    if (!this.checkLocksRenting && nextProps.locksRentingStatus == 'finished') {
      if (nextProps.locksRentingList.length > 0) {
        this.props.navigation.dispatch(resetScreen('RentingBikeSuccessfullyScreen', {token: this.token}));
        //this.props.navigation.navigate('RentingBikeSuccessfullyScreen', {token: this.token})
      } else {
        this.props.navigation.dispatch(resetScreen('StationScreen', {token: this.token}));
        //this.props.navigation.navigate('StationScreen', {token: this.token})
      }
    }
  }

  getTokenFromStore = async () => {
    return await AsyncStorage.getItem('token')
  }


  render() {
    return (
      <View style={GreetingScreenStyles.container}>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pingStatus: state.ping.status,
    locksRentingStatus: state.locksRenting.status,
    pingValue: state.ping.value,
    locksRentingList: state.locksRenting.locksRentingList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ping: (token) => dispatch(PingRedux.pingRequest(token)),
    locksRenting: (token) => dispatch(LocksRentingRedux.locksRentingRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GreetingScreen)

