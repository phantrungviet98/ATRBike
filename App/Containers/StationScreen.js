import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert, Easing } from 'react-native';
import { connect } from 'react-redux'
import ItemStationFlatList from '../Components/ItemStationFlatList'
import Header from '../Components/Header'
import GettingStationRedux from '../Redux/GettingStationRedux'
import Loading from 'react-native-loading-spinner-overlay'
import SignInRedux from '../Redux/SignInRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'
import StationScreenStyles from './Styles/StationScreenStyles'
import MapView, { Marker } from 'react-native-maps'
import Permissions from 'react-native-permissions'
import Modalize from 'react-native-modalize'
import LockScreen from './LockScreen'
import RentingBikeRedux from '../Redux/RentingBikeRedux'
import LottieView from 'lottie-react-native'
import Drawer from 'react-native-drawer-menu'
import { resetScreen } from '../untils/navigation'
import drawerContent from '../Components/Drawer'

class StationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 10.8212173,
        longitude: 106.7101421,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      currentLocation: {
        latitude: 10.8212173,
        longitude: 10.8212173
      },
      chosenStation: {
        locks: []
      },
      listLock: [],
      isRented: false
    }
    this.modalRef = React.createRef()
    this.checkRenting = false
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const token = this.props.navigation.getParam('token')
    this.props.gettingStation(token ? token : this.props.token)
    this.getCurrentLocation()
  }

  componentWillMount() {

  }

  componentWillUpdate() {

  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = nextProps
    console.log('checkrenting', nextProps, 'this.checkRenting', this.checkRenting)
    if (this.checkRenting) {
      if (nextProps.rentingBikeStatus === 'finished') {
        this.checkRenting = false
        console.log('checkthong')
        if (nextProps.rentingBikeError !== null) {
          alert(nextProps.rentingBikeError.message + '. Please try again')
        }
        else {
          //lockSubcription.next(nextProps.rentingSuccessResponse.response.lock._id)

          //this._storeData(nextProps)
          console.log('nextProps.rentingSuccessResponse', nextProps.rentingSuccessResponse)

          Alert.alert(
            'Notification',
            'Renting Successfully. Do you want to rent another bike ?',
            [
              { text: 'Yes, sure', onPress: () => { this.stopRenting() } },
              {
                text: 'No', onPress: () => {
                  navigation.dispatch(resetScreen('RentingBikeSuccessfullyScreen'))
                }
              },
            ],
          );
        }
      }
    }
  }

  stopRenting = () => {
    this.setState({ isRented: true })
    let newListLock = this.state.listLock.filter(lock => {
      if (lock._id !== this.props.rentingSuccessResponse.response.lock._id) {
        return true
      }
    })

    this.setState({ listLock: newListLock })

  }

  availableLocksLength(locks) {

    return locks.filter((lock) => {
      if (lock.status == 'ACTIVATED') {
        return true
      }
    }).length

  }

  // onPressLock = (lock) => {
  //   if(lock.status == 'ACTIVATED') {
  //     this.props.navigation.navigate('RentingBikeScreen', { chosenLock: lock})
  //   } else {
  //     alert('This lock is not available. Please choose another one!!')
  //   }
  // }

  getCurrentLocation = () => {
    console.log('getCurrentLocation')
    // try {
    //   console.log('getCurrentLocation')
    //   navigator.geolocation.getCurrentPosition( (position) => {
    //       console.log('position: ')
    //       console.log('position: ', position.coords)
    //       const region = {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA 
    //       }
    //       console.log('region: ', region)
    //     }, 
    //     (error) => {
    //       console.log()
    //       alert(error)
    //     }, 
    //     {maximumAge:60000, timeout:5000, enableHighAccuracy:true}
    //   )
    // } catch (e) {
    //   alert(e.message || "")
    // }

    // Permissions.check('location')
    //   .then(res => {
    navigator.geolocation.getCurrentPosition((pos) => {

      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude
      const latitudeDelta = 0.0922
      const longitudeDelta = 0.0421

      this.setState({
        currentLocation: { latitude, longitude },
        region: { latitude, longitude, latitudeDelta, longitudeDelta }
      })
    })

    navigator.geolocation.watchPosition((pos) => {
      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude
      const latitudeDelta = 0.0922
      const longitudeDelta = 0.0421

      this.setState({
        currentLocation: { latitude, longitude },
        region: { latitude, longitude, latitudeDelta, longitudeDelta }
      })
    },
      (error => {
        alert(error.message)
      }),
    )
    // })
    // .catch(err => {

    // })
  }

  distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  rentingBike = (lockID) => {
    this.checkRenting = true
    const token = this.props.navigation.getParam('token')
    this.props.rentingBikeRequest(token ? token : this.props.token, lockID)
  }

  onOpenModalize = () => {
    const modal = this.modalRef.current
    if (modal) {
      modal.open()
    }
  }

  rent = () => {
    let flag = false
    this.props.listStation.map(station => {
      if (this.distance(station.location.coordinates[1], station.location.coordinates[0], this.state.currentLocation.latitude, this.state.currentLocation.longitude, 'K') < 0.08) {
        flag = true
        this.setState({ chosenStation: station })
        this.setState({ listLock: station.locks })
      }
    })
    if (flag) {
      this.state.isRented ? this.props.navigation.dispatch(resetScreen('RentingBikeSuccessfullyScreen')) : this.onOpenModalize()
    } else {
      alert('Standing near the station more !!')
    }
  }

  render() {
    return (
      // <View style={{ flex: 1 }}>
      //   <Requesting visible={this.props.isRequesting} textContent={'StatLoading...'} />
      //   <Header title='Station' />
      //   <View>
      //     <FlatList data={this.props.listStation}
      //       renderItem={({ item }) => <ItemStationFlatList item={item} goToLockScreen={this.onPressStation} />}
      //       keyExtractor={(item, index) => index.toString()}
      //     />
      //   </View>
      // </View>
      <Drawer drawerWidth={300}
        drawerContent={drawerContent('[lkjjkl')}
        type={Drawer.types.Overlay}
        onDrawerOpen={() => { console.log('Drawer is opened'); }}
        onDrawerClose={() => { console.log('Drawer is closed') }}
        easingFunc={Easing.ease}>
        <View style={StationScreenStyles.container}>
          <Loading visible={(this.props.gettingStationStatus === 'activated' || this.props.rentingBikeStatus === 'activated') ? true : false} textContent={'Loading...'} />
          <MapView style={StationScreenStyles.map}
            region={this.state.region}
            showsUserLocation={true}
            showsCompass={true}
          >
            {this.props.listStation.map((station, index) =>
              <Marker key={index} coordinate={{ latitude: station.location.coordinates[1], longitude: station.location.coordinates[0] }}
                title={station.name}
                description='This is description'
                image={this.availableLocksLength(station.locks) == 0 ? require('../Images/Icons/pin-red-custom.png') : require('../Images/Icons/pin-green-custom.png')}
              >
                <View style={StationScreenStyles.marker}>
                  <Text style={StationScreenStyles.textMarker}>{this.availableLocksLength(station.locks)}</Text>
                </View>
              </Marker>
            )
            }
          </MapView>

          <Modalize ref={this.modalRef} style={{ maxHeight: 130 }}>
            <LockScreen lock={this.state.listLock[0]} stationName={this.state.chosenStation.name} rentingBike={this.rentingBike} isRentingSuccessfully={this.isRentingSuccessfully} />
          </Modalize>


          <TouchableOpacity style={StationScreenStyles.rentButton} onPress={() => this.rent()} >
            <View style={StationScreenStyles.rentButtonView}>
              <Text>  {this.state.isRented ? 'Return Rental' : 'Unlock'} </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Drawer>
    )
  }
}
mapStateToProps = (state) => {
  return {
    token: state.signIn.token,
    listStation: state.gettingStation.listStation,
    gettingStationStatus: state.gettingStation.status,
    gettingStationError: state.gettingStation.error,
    rentingSuccessResponse: state.rentingBike.rentingSuccessResponse,
    rentingBikeStatus: state.rentingBike.status,
    rentingBikeError: state.rentingBike.error
  }
}
mapDispatchToProps = (dispatch) => {
  return {
    gettingStation: (token) => dispatch(GettingStationRedux.gettingStationRequest(token)),
    rentingBikeRequest: (token, lockId) => dispatch(RentingBikeRedux.rentingBikeRequest(token, lockId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationScreen)