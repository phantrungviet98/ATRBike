import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, TouchableOpacity, FlatList, AsyncStorage, Easing } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Components/Header'
import RentingBikeRedux from '../Redux/RentingBikeRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'
import Loading from 'react-native-loading-spinner-overlay'
import { lockSubcription } from '../Config/Global'
import moment from 'moment'
import NetInfo from '@react-native-community/netinfo'
import LockRentingFlatListItem from '../Components/LockRentingFlatListItem'
import Drawer from 'react-native-drawer-menu'
import drawerContent from '../Components/Drawer'

class RentingBikeSuccessfullyScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      rentedTime: 0,
      isConnected: false,
      duration: {hours: -1, minutes: -1},
      payment: 0
    }
    this.durationInterval
  }

  static navigationOptions = {
    header: null
  }

  _retrieveData = async () => {
    try {
      const rentingSuccessStringtify = await AsyncStorage.getItem('rentingSuccessStringtify');
      if (rentingSuccessStringtify !== null) {
        // We have data!!
        this.setState({
          rentingSuccessList: JSON.parse(rentingSuccessStringtify)
        })


      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  returnBike = (id, stationID) => {

  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.locksRentingRequest(this.props.token)
  }

  componentWillReceiveProps(nextProps) {
  }


  setRentedDurationInterval = (createdAt) => {
    clearInterval(this.durationInterval)
    this.setRentedDuration(createdAt)
    this.durationInterval = setInterval(this.setRentedDuration, 60*1000, createdAt)
  }

  

  setRentedDuration = (createdAt) => {
    const now = moment()
    const createdAtMoment = moment(createdAt)
    const temp = now.diff(createdAtMoment)
    const minutes = now.diff(createdAtMoment, 'minutes')
    const duration = moment.duration(temp)
    this.setState({payment: Math.floor(minutes/30)*3 + 3})
    this.setState({duration: {hours: duration.hours(), minutes: duration.minutes()}})
  }
 
  

  render() {

    const rentingDuration = `Amount of rented duration: ${this.state.duration.hours} hours ${this.state.duration.minutes} minutes`
    const rentingPayment =  `Payment: ${this.state.payment} EUR`

    // var drawerContent = (<View style={{flex: 1, backgroundColor: 'white'}}>
    //   <View/>
    //   <View>
    //     <View><Text>Drawer Content</Text></View>
    //   </View>
    // </View>);
     var customStyles = {
      drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10
      },
      mask: {}, // style of mask if it is enabled
      main: {} // style of main board
    };


    return (
      <Drawer  drawerWidth={300}
      drawerContent={drawerContent}
      type={Drawer.types.Overlay}
      onDrawerOpen={() => {console.log('Drawer is opened');}}
      onDrawerClose={() => {console.log('Drawer is closed')}}
      easingFunc={Easing.ease}>
        <View style={{ flex: 1 }}>
        <Header title='Renting Bike Successfully List' goBack={() => this.props.navigation.goBack()} />
        <Loading visible={this.state.isLoading} textContent={'Loading...'} />
        <View style={styles.TimeContainer}>
          <Text style={styles.TimeText}> {(this.state.duration.hour !== -1 && this.state.duration.hours !== -1) ? rentingDuration : 'Wellcome!!. Choose any lock to see information'} </Text>
          <Text style={styles.TimeText}> {(this.state.duration.hour !== -1 && this.state.duration.hours !== -1) ? rentingPayment : ''}</Text>
        </View>
        <FlatList
          data={this.props.locksRentingList}
          renderItem={({ item }) => <LockRentingFlatListItem item={item} setRentedDuration={this.setRentedDurationInterval}/>
          }
          keyExtractor={(item, index) => index.toString()} />
      </View>

      </Drawer>

      
    )
  }
}

const styles = StyleSheet.create({
  RentingName: {
    backgroundColor: 'blue',
    alignItems: 'center',

  },
  RentingContainer: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TimeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'lightpink',
  },
  TimeText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => {
  return {
    token: state.signIn.token,
    locksRentingList: state.locksRenting.locksRentingList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    locksRentingRequest: (token) => dispatch(LocksRentingRedux.locksRentingRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingBikeSuccessfullyScreen)