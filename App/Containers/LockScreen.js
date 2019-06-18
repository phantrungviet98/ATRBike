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

class LockScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listLock: [],
    }
    lockSubcription.subscribe({
      next: (lockID) => this.setState({listLock: this.removeLock(lockID)}) 
    })
    
  }

  removeLock = (lockID) => {
    return this.state.listLock.filter(lock => {
      if(lock._id !== lockID) {
        return true
      }
    }) 
  }

  static navigationOptions = {
    header: null
  }

  getStationLock = () => {

  }

  componentDidMount = () => {
    this.setState({
      listLock: this.props.navigation.getParam('stationLocks', [])
    })
  };

  componentWillReceiveProps = (nextProps) => {
    const chosenStation = nextProps.listStation.filter((station) => {
      if(station.id === this.props.navigation.getParam('stationId', '-1')) {
        return true
      }
    })
    this.setState({listLock: chosenStation.locks})
  }

  onPressLock = (lock) => {
    this.props.navigation.navigate('RentingBikeScreen', { chosenLock: lock})
  }

  render() {
    const stationId = this.props.navigation.getParam('stationId', '-1')
    return (
      <View style={{ flex: 1 }}>
        <Header title='Lock' goBack={() => this.props.navigation.goBack()} />

        <View>
          <Text> {stationId} </Text>
        </View>

        <View>
          {this.state.listLock.length !== 0 ?
            <FlatList data={this.state.listLock}
              renderItem={({ item }) => <ItemLockFlatList item={item} goToRentingScreen={this.onPressLock} />}
              keyExtractor={(item, index) => index.toString()}
            /> :
            <Text>No any lock</Text>
          }
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
