import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux'
import ItemStationFlatList from '../Components/ItemStationFlatList'
import Header from '../Components/Header'
import GettingStationRedux from '../Redux/GettingStationRedux'

class StationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listStation: [],
      spiner: false
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const token =  this.props.navigation.getParam('token')
    this.props.gettingStation(token)
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props
    
      if (nextProps.isRequesting === true) {
        this.setState({ spiner: true })
      }
      else {
        this.setState({ spiner: false })
        if (nextProps.error !== null) {
          alert(nextProps.error.message ? nextProps.error.message : 'error')
        }
        else {
          this.setState({
            listStation: nextProps.listStation
          })
        }
      }
    
  }

  onPressStation = (stationId, locks) => {
      this.props.navigation.navigate('LockScreen', {stationId: stationId, stationLocks: locks})
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
    listStation: state.gettingStation.listStation,
    isRequesting: state.gettingStation.isRequesting,
    error: state.gettingStation.error
  }
}
mapDispatchToProps = (dispatch) => {
  return {
    gettingStation: (token) => dispatch(GettingStationRedux.gettingStationRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationScreen)