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
    console.log('nextProps', nextProps)
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
      console.log('lock ', locks)
      this.props.navigation.navigate('LockScreen', {stationId: stationId, stationLocks: locks})
  }

  // componentDidMount = () => {
  //     console.log(this.props.data)
  //     fetch('http://api.appebike.com:4000/v1/shared/stations?populate=locks', {
  //         method: 'GET',
  //         headers: {
  //             Accept: 'application/json',
  //             'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiYXRyYmlrZSIsInNlc3Npb25JZCI6IjVjZjBmNzIzZDFlYjFjNzNhNTdkNGE2ZSIsImlhdCI6MTU1OTI5NTc3OSwiZXhwIjoxNTU5MzgyMTc5fQ.Vi2ZhyAXmmBlTMUzzLh33ayBwN-CG7w7b2H7WRM6tyM",
  //             // 'Authorization': 'Bearer ' + this.props.data.token,
  //             'Content-Type': 'application/json',
  //             'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
  //             'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
  //         },
  //     })
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //             if ('results' in responseJson) {
  //                 alert('Hi you')
  //                 this.props.setStations(responseJson.results)
  //             } else {
  //                 alert('Response: ' + JSON.stringify(responseJson))
  //             }
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // }


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