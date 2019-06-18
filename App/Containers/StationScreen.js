import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux'
import ItemStationFlatList from '../Components/ItemStationFlatList'
import Header from '../Components/Header'
import GettingStationRedux from '../Redux/GettingStationRedux'
import Requesting from 'react-native-loading-spinner-overlay'
import SignInRedux from '../Redux/SignInRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'

class StationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const token = this.props.navigation.getParam('token')
    this.props.gettingStation(!!!token ? token : this.props.token )
  }

  componentWillMount() {
    
  }

  componentWillUpdate() {

  }

  componentWillReceiveProps(nextProps) {
  }



  onPressStation = (stationId, locks) => {
    this.props.navigation.navigate('LockScreen', { stationId: stationId, stationLocks: locks })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Requesting visible={this.props.isRequesting} textContent={'StatLoading...'} />
        <Header title='Station' />
        <View>
          <FlatList data={this.props.listStation}
            renderItem={({ item }) => <ItemStationFlatList item={item} goToLockScreen={this.onPressStation} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  }
}
mapStateToProps = (state) => {
  return {
    token: state.signIn.token,
    listStation: state.gettingStation.listStation,
    isGettingStationRequesting: state.locksRenting.isRequesting,
    error: state.gettingStation.error,
  }
}
mapDispatchToProps = (dispatch) => {
  return {
    gettingStation: (token) => dispatch(GettingStationRedux.gettingStationRequest(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationScreen)