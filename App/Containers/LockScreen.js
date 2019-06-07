import AppConfig from '../Config/AppConfig'
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux'
import ItemLockFlatList from '../Components/ItemLockFlatList'
import Header from '../Components/Header'
import GettingStationRedux from '../Redux/GettingStationRedux'
import SocketIOClient from 'socket.io-client'

class LockScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listLock: [],
    }
  }

  static navigationOptions = {
    header: null
  }

  // setPopupVisible = (isVisible) => {
  //     console.log(isVisible)
  //     this.setState({popupVisible: Boolean(isVisible)})
  // }

  getStationLock = () => {

  }

  componentDidMount = () => {
    this.setState({
      listLock: this.props.navigation.getParam('stationLocks', [])
    })

    const didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('didFocus', payload);
      }
    );

    // Remove the listener when you are done
    didFocusSubscription.remove();

    console.log('componendidmount lockscreen')
  };

  componentWillMount = () => {
    console.log('componenwillmount lockscreen')
  }

  componentWillUpdate = () => {
    console.log('componenwillupdate lockscreen')

  }

  onPressLock = (lock) => {
    console.log(lock)
    this.props.navigation.navigate('RentingScreen', { chosenLock: lock, updateLockScreen: this.reRender })
  }

  reRender = () => {
    this.forceUpdate()
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

// const mapStateToProps = (state) => {

// }

// const mapDispatchToProps = (dispatch) => {
//     gettingStation: () => dispatch(GettingStationRedux.GettingStationRequest)
// }

export default LockScreen
