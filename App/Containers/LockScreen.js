import AppConfig from '../Config/AppConfig'
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux'
import ItemLockFlatList from '../Components/ItemLockFlatList'
import Header from '../Components/Header'
import GettingStationRedux from '../Redux/GettingStationRedux'
import SocketIOClient from 'socket.io-client'
import {lockSubcription} from '../Config/Global'
import {resetScreen} from '../untils/navigation'
import LockScreenStyles from './Styles/LockScreenStyles';

class LockScreen extends Component {

  constructor(props) {
    super(props)
    // lockSubcription.subscribe({
    //   next: (lockID) => this.setState({listLock: this.removeLock(lockID)}) 
    // })
    
  }

  // removeLock = (lockID) => {
  //   return this.state.listLock.filter(lock => {
  //     if(lock._id !== lockID) {
  //       return true
  //     }
  //   }) 
  // }

  static navigationOptions = {
    header: null
  }

  getStationLock = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    // const chosenStation = nextProps.listStation.filter((station) => {
    //   if(station.id === this.props.navigation.getParam('stationId', '-1')) {
    //     return true
    //   }
    // })
    // this.setState({listLock: chosenStation.locks})
  }

  rentingBike = () => {
   this.props.rentingBike(this.props.lock._id)
  }
 
  render() {
    //const stationId = this.props.navigation.getParam('stationId', '-1')
    const {lock} = this.props
    return (
      <View>
        <View style={LockScreenStyles.header}>
          <Text style={LockScreenStyles.headerText}> {this.props.stationName} </Text>
        </View>
        {/* <View>
          {this.props.chosenStation.locks.length !== 0 ?
            <FlatList data={this.props.chosenStation.locks}
              renderItem={({ item }) => <ItemLockFlatList item={item} onPressLock={this.props.onPressLock} />}
              keyExtractor={(item, index) => index.toString()}
            /> :
            <Text>No any lock</Text>
          }
        </View> */}

          <View style={LockScreenStyles.item}>
            <View>
              <Text>Name: {lock.name}</Text>
              <Text>Serial: {lock.serial}</Text>
            </View>
            <TouchableOpacity style={LockScreenStyles.unlockButton} onPress={this.rentingBike}>
              <Text>Unlock</Text>
            </TouchableOpacity>
          </View>
       
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listStation: state.gettingStation.listStation
  }
}

// const mapDispatchToProps = (dispatch) => {
//     gettingStation: () => dispatch(GettingStationRedux.GettingStationRequest)
// }

export default connect(mapStateToProps)(LockScreen)
